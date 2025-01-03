export async function readGithubFile(
    user: string,
    project: string,
    branches: string,
    path: string
) {
    const data = await fetch(
        `https://raw.githubusercontent.com/${user}/${project}/refs/heads/${branches}/${path}`
    ).then((v) => v.text());
    return data;
}
