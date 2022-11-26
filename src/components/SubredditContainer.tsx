import { useState, useEffect, Key } from 'react'
import fetchSubredditPosts from "../api/fetchSubredditPosts"


function SubredditContainer({ subreddit }:{ subreddit:string }) {
  const [ posts, setPosts ] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSubredditPosts(subreddit)
      setPosts(data.data.children)
    }

    fetchData()
  }, [])

  const Post = ({ post }:{ post:any }) => {
    return (
      <div className="row mb-2 mt-3 border-bottom">
        {post.data.thumbnail && post.data.thumbnail.includes("http") && (
          <div className="col-sm-auto mb-3">
            {post.data.url && post.data.url.includes("redd.it") && (
              <a href={post.data.url} target="_blank">
                <img src={post.data.thumbnail} />
              </a>
            )}
            {post.data.url && !post.data.url.includes("redd.it") && (
              <img src={post.data.thumbnail} />
            )}
          </div>
        )}

        {post.data.url && !post.data.url.includes("redd.it") && (
          <div className="col">
            <p>
              <a href={post.data.url}>
                <b>{post.data.title}</b>
              </a>
            </p>
          </div>
        )}

        {post.data.url && post.data.url.includes("redd.it") && (
          <div className="col">
            <p>
              <b>{post.data.title}</b>
            </p>
          </div>
        )}

      </div>
    )
  }

  return (
    <div className="subreddit-container mb-4">
      <h3 className="h2">{subreddit}</h3>
      {posts && posts.length > 0 && posts.map((post:any, i:number) => {
        if(i <= 12) {
          return <Post key={post.data.id} post={post} />
        }
      })}
    </div>
  )
}

export default SubredditContainer