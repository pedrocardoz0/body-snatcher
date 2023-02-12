import * as core from '@actions/core'
import github, { getOctokit } from '@actions/github'

async function main() {
    const issue_number = Number(core.getInput('issue-id'))
    const token = core.getInput('github-token')

    const body = await collectIssueBody(token, issue_number)
    core.setOutput('body', { name: 'hi!', body })
}

async function collectIssueBody(token: string, issue_number: number) {
    const octo = getOctokit(token)

    const { data } = await octo.rest.issues.get({
        ...github.context.repo,
        issue_number
    })

    return data.body
}

main()