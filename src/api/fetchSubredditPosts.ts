import axios from 'axios'

type TData = {
  kind: string,
  data: {
    children: object[]
  }
}

export default async function fetchSubredditPosts(subreddit:string) {
  let data:TData = {
    kind: "listing",
    data: {
      children: [{}]
    }
  }

  await axios.get(`https://www.reddit.com/r/${subreddit}/top.json?sort=top&tday`)
    .then(res => data = res.data)

  return data
}