import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../api'

export default function MyPosts() {


    const [ posts, setPosts ] = useState([])
    useEffect(() => {
        fetchPosts()
    })

    async function fetchPosts() {
        const user = supabase.auth.user()
        const { data } = await supabase
          .from('posts')
          .select('*')
          .filter('user_id', 'eq', user.id)
        setPosts(data)
    }


    async function deletePost(id) {
        await supabase
        .from('posts')
        .delete()
        .match({ id })
        fetchPosts()
    }

    return (
        <div>
            <h1>My Posts</h1>
            {
                posts.map((post, index) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <p>Author: {post.user_email}</p>
                        <Link href={`/edit-post/${post.id}`}>
                            <a>
                                Edit Post
                            </a>
                        </Link>
                        <Link href={`/posts/${post.id}`}>
                            <a>
                                View Post
                            </a>
                        </Link>
                        <button onClick={() => deletePost(post.id)}>
                            Delete Post
                        </button>
                    </div>
                ))
            }
        </div>
    )
}