// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        // Here you can add logic to authenticate the user with credentials
        // For example, you could fetch user data from your database
        if (credentials?.username === 'test' && credentials?.password === 'test') {
          // If login is successful, return user object
          return { id: 1, name: 'Test User' }
        } else {
          // If login fails, return null
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
