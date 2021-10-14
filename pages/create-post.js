import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { supabase } from '../api'

const initialState = { title: '', content: ''}

function CreatePost() {
    const [post, setPost] = useState(initialState);
    const { title, content } = post
    const router = useRouter()

    function onChange(e) {
        setPost(() => ({ ...post, [e.target.name]: e.target.value }))
    }

    async function createNewPost() {
        if (!title || !content) return
        
        const user = supabase.auth.user()
        const id = uuid()
        post.id = id;
        const { data } = await supabase
          .from('posts')
          .insert([
              {
                  title,
                  content,
                  user_id: user.id,
                  user_email: user.email
              }
          ])
          .single();
        router.push(`/posts/${data.id}`)
    }

    return (
        <div>
            <h1>Create new post</h1>
            <input 
              onChange={onChange}
              name="title"
              placeholder="Title"
              value={post.title} />
            <textarea
              name="content"
              placeholder="Content"
              value={post.content}
              onChange={onChange}></textarea>
            <button
              type="button"
              onClick={createNewPost}>
                Create Post
            </button>
        </div>
    )
}

export default CreatePost