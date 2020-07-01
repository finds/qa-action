const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const label = core.getInput('label');
  const myToken = core.getInput('token');
  const octokit = github.getOctokit(myToken)

  const time = (new Date()).toTimeString();
  core.setOutput("message", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload
  console.log(JSON.stringify(github.context.payload, undefined, 2))
  if (payload.action=="closed") {
    let [owner, repo] = payload.repository.full_name.split("/")
    octokit.issues.addLabels({
        owner,
        repo,
        issue_number:payload.issue.number,
        labels: [label]
    })
  }
} catch (error) {
  core.setFailed(error.message);
}