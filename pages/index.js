import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../api'

export default function Home() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()

    // real-time
    const mySubscription = supabase
      .from('posts')
      .on('*', () => fetchPosts())
      .subscribe()
    
    // 'unmounting'
    return () => supabase.removeSubscription(mySubscription);
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select()
      
    setPosts(data)
    setLoading(false)
  }

  if(loading) return <p>Loading ...</p>

  if (!posts.length) return <p>No posts</p>

  return (
    <div>
      <Head>
        <title>More Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Posts</h1>
        {
          posts && posts.map(post => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div>
                <h2>{post.title}</h2>
                <h2>Author {post.user_email}</h2>
              </div>
            </Link>
          ))
        }

      </div>

    </div>
  )
}
