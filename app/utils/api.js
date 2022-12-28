export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }

      return data.items;
    });
}

function getErrorMessage(message, username) {
  if (message === "Not Found") {
    return `${username} does not exist`;
  }

  return message;
}

export function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMessage(profile.message, username));
      }

      return profile;
    });
}

export function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMessage(repos.message, username));
      }

      return repos;
    });
}

function getStartCount(repos) {
    return repos.reduce((count, { stargazers_count }) => {
        return count + stargazers_count
    }, 0)
}
function calculateScore(followers, repos) {
    return followers * 3 + getStartCount(repos)
}

function getUserData(player) {
    return Promise.all([
        getProfile(player), getRepos(player)
    ]).then(([profile, repos]) => {
        return {
            profile,
            score: calculateScore(profile.followers, repos),
        }
    })
}

function sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score)
}

export function battle(players) {
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then(sortPlayers)
}
