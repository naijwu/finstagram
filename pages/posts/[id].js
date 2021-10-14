import { useRouter } from 'next/router'
import { supabase } from '../../api'

export default function Post({ post }) {
    const router = useRouter()
    if(router.isFallBack) {
        return <div>Loading...</div>
    }
    if(!post) return null;
    return (
        <div>
            <h1>{post.title ? post.title : 'title err'}</h1>
            <p>by {post.user_email ? post.user_email : 'email err'}</p>
            <div>
                <p>
                    {post.content ? post.content : 'content err'}
                </p>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    // getting posts
    const { data, error } = await supabase
      .from('posts')
      .select('id');

    // setting the paths
    const paths = data.map(post => ({
        params: {
            id: JSON.stringify(post.id)
        }
    }))

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    // pull id from path
    const { id } = params

    // gets post of id
    const { data } = await supabase
      .from('posts')
      .select()
      .filter('id', 'eq', id)
      .single()

    // returns data of post
    return {
        props: {
            post: data
        }
    } 
}