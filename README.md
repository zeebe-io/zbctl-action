# Run zbctl in GitHub Actions

This action executes zbctl commands and makes the JSON output available for later actions.

## Inputs

## `version`

**Required** The version of zbctl to use. Check https://github.com/camunda-cloud/zeebe/releases for the latest version.

## `command`

**Required** The command to run, for example `deploy someProcess.bpmn`. All commands are run in bash so you can globs: `deploy *.bpmn`

## Outputs

## `result`

The stdout of zbctl. This should be in JSON format which you can parse to extract information such as instance ids.

## Example usage

```
uses: zeebe-io/zbctl-action@v0.0.7
with:
  version: '1.2.2'
  command: 'deploy *.bpmn'
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  ZEEBE_ADDRESS: ${{ secrets.ZEEBE_ADDRESS }}
  ZEEBE_CLIENT_ID: ${{ secrets.ZEEBE_CLIENT_ID }}
  ZEEBE_CLIENT_SECRET: ${{ secrets.ZEEBE_CLIENT_SECRET }}
  ZEEBE_AUTHORIZATION_SERVER_URL: ${{ secrets.ZEEBE_AUTHORIZATION_SERVER_URL }}
```
