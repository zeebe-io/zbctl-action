import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as gh from '@actions/github';
import * as exec from '@actions/exec';
import * as path from 'path';

try {
    const version = core.getInput('version');
    const command = core.getInput('command');

    const token = process.env['GITHUB_TOKEN']
    const octo = gh.getOctokit(token);

    const release = await octo.rest.repos.getReleaseByTag({
        owner: 'camunda-cloud',
        repo: 'zeebe',
        tag: version,
    });

    console.log(`Using release ${release}`);
    var asset;
    if (process.platform == 'darwin'){
        asset = release.data.assets.find(asset => asset.name == "zbctl.darwin");
    } else if (process.platform == 'win32') {
        asset = release.data.assets.find(asset => asset.name == "zbctl.exe");
    } else {
        asset = release.data.assets.find(asset => asset.name == "zbctl");
    }
    const binPath = await tc.downloadTool(asset.browser_download_url, `${process.env['RUNNER_TEMP']}/zbctl-bin/zbctl`);
    console.log(`Making zbctl (${binPath}) available`);
    core.addPath(path.dirname(binPath));
    const output = await exec.getExecOutput(`zbctl ${command}`);
    if (output.exitCode != 0) {
        core.setFailed(`zbctl failed with exit code ${output.exitCode}: ${output.stderr}`);
    }
    core.setOutput("result", output.stdout);
} catch (error) {
    core.setFailed(error.message);
}