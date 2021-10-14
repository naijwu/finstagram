
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../api'

function EditPost() {
    const [post, setPost] = useState(null)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        fetchPost()
        async function fetchPost() {
            if (!id) return
            const { data } = await supabase
              .from('posts')
              .select()
              .filter('id', 'eq', id)
              .single()
            setPost(data)
        }
    })

    if (!post) return null

    function onChange(e) {
        setPost(() => ({ ...post, [e.target.name]: e.target.value }))
    }

    const { title, content } = post
    async function updateCurrentPost() {
        if (!title || !content) return
        await supabase
          .from('posts')
          .update([
              {
                  title,
                  content
              }
          ])
          .match({ id })
        router.push('/my-posts')
    }

    return (
        <div>
            <h1>Edit post</h1>
            
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
              onClick={updateCurrentPost}>
                Update Post
            </button>

        </div>
    )
}

export default EditPost;