import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../api'
import wrapStyles from '../styles/wrap.module.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async () => checkUser()
    )
    checkUser() 

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  async function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }

  return (
    <div className={wrapStyles.container}>
      <header className={wrapStyles.header}>
        <nav className={wrapStyles.nav}>
          <Link href="/">
            <a className={wrapStyles.colourInherit}>Home</a>
          </Link>
          {
            user && (
              <Link href="/my-posts">
                <a className={wrapStyles.colourInherit}>My Posts</a>
              </Link>
            )
          }
          {
            user && (
              <Link href="/create-post">
                <a className={wrapStyles.colourInherit}>Create Post</a>
              </Link>
            )
          }
          <Link href="/profile">
            <a className={wrapStyles.colourInherit}>Profile</a>
          </Link>
        </nav>
      </header>
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
