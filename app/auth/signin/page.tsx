// app/auth/signin/page.tsx
'use client'

import { signIn } from 'next-auth/react'

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <form onSubmit={(e) => {
      e.preventDefault()
      const username = e.currentTarget.username.value
      const password = e.currentTarget.password.value
      console.log('Signing in with:', { username, password })
      signIn('credentials', { username, password })
    }}>
      <label>
        Username:
        <input name="username" type="text" placeholder="test" />
      </label>
      <br />
      <label>
        Password:
        <input name="password" type="password" placeholder="test" />
      </label>
      <br />
      <button type="submit">Sign In</button>
    </form>
  </div>
)

export default SignInPage
