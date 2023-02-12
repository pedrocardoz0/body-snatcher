import core from '@actions/core'
import github, { getOctokit } from '@actions/github'

async function main() {
    const issue_number = core.getInput('issue-id', { required: true })
    const token = core.getInput('github-token', { required: true })

    const body = await collectIssueBody(token, issue_number)
    core.setOutput('body', { name: 'hi!', body })
}

async function collectIssueBody(token: string, issue_id: string) {
    const issue_number = parseInt(issue_id)
    const octo = getOctokit(token)

    const { data } = await octo.rest.issues.get({
        ...github.context.repo,
        issue_number
    })

    return data.body
}

main()