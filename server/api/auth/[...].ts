import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export default NuxtAuthHandler({
  // Секрет для шифрования cookies и JWT
  secret: config.authSecret,
  
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any) {
        // Здесь можно интегрировать с существующей системой авторизации
        // Это позволит использовать как OAuth, так и обычную авторизацию
        
        try {
          // Для тестирования
          if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
            return {
              id: '1',
              name: 'Admin User',
              email: 'admin@example.com'
            }
          }
          
          // В реальной интеграции здесь должен быть запрос к API
          // const url = `${config.public.apiBase}/api/users/login`
          // const response = await fetch(url, {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(credentials)
          // })
          
          // if (!response.ok) {
          //   throw new Error('Invalid credentials')
          // }
          
          // const user = await response.json()
          // return user
          
          return null
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  
  // Настройка сессии и JWT
  session: {
    strategy: 'jwt'
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as any
      }
      return session
    }
  },
  
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
    newUser: '/register'
  }
}) 