import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

async function fetchGithubUniverse(username) {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
  ])

  if (!userRes.ok || !reposRes.ok) {
    throw new Error('Unable to fetch GitHub data right now.')
  }

  const [user, repos] = await Promise.all([userRes.json(), reposRes.json()])
  return { user, repos }
}

export function useGithubUniverse(username) {
  const query = useQuery({
    queryKey: ['github-universe', username],
    queryFn: () => fetchGithubUniverse(username),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60,
    enabled: Boolean(username),
  })

  const repoMap = useMemo(() => {
    const map = new Map()
    ;(query.data?.repos ?? []).forEach((repo) => {
      map.set(normalize(repo.name), repo)
    })
    return map
  }, [query.data?.repos])

  const findRepoByProjectName = (projectName) => {
    if (!projectName || repoMap.size === 0) return null
    const normalized = normalize(projectName)

    if (repoMap.has(normalized)) return repoMap.get(normalized)

    for (const [repoKey, repo] of repoMap.entries()) {
      if (repoKey.includes(normalized) || normalized.includes(repoKey)) {
        return repo
      }
    }

    return null
  }

  return {
    ...query,
    user: query.data?.user,
    repos: query.data?.repos ?? [],
    findRepoByProjectName,
  }
}
