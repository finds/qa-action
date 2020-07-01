const core = require('@actions/core');
const github = require('@actions/github');

try {
  const label = core.getInput('label');
  const myToken = core.getInput('token');
  const octokit = github.getOctokit(myToken)

  const time = (new Date()).toTimeString();
  core.setOutput("message", time);
  const payload = github.context.payload
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