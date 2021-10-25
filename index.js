import { getInput, setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';

try {
  // `who-to-greet` input defined in action metadata file
  const version = getInput('version');
  console.log(`Retrieving zbctl ${version}!`);
  const time = (new Date()).toTimeString();
  setOutput("result", "{}");
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  setFailed(error.message);
}