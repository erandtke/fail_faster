export function forwardToGithub(octokit, payload) {
    octokit.request('POST /repos/{owner}/{repo}/issues', payload);
}
export function debug_forwardToGithub(octokit, payload) {
    console.log('debug');
    console.log('POST /repos/{owner}/{repo}/issues');
    console.log('content: ' + JSON.stringify(payload));
    console.log('content: ' + payload);
}
export function toPayload(owner, repo, title, body) {
    console.log('toPayload');
    console.log('owner: ' + owner);
    console.log('repo: ' + repo);
    var payload = {
        owner: owner,
        repo: repo,
        title: title,
        body: body,
        assignees: [
            'octocat'
        ],
        milestone: 1,
        labels: [
            'bug'
        ],
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    };
    console.log('payload: ' + JSON.stringify(payload));
    return payload;
}
export function isJson(object) {
    try {
        JSON.parse(object);
        console.log('json');
        return true;
    }
    catch (_a) {
        console.log('not json');
        return false;
    }
}
export function printHelp() {
    console.log('usage: [--debug] --git_public_access_token public_access_token --git_owner owner --git_repo repo');
}
