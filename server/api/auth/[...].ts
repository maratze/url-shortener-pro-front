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
      // Настройка формы авторизации (не используется в нашем кейсе, т.к. у нас своя форма)
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: { email: string, password: string }) {
        // Логика авторизации по email/паролю
        // В нашем случае мы не используем этот метод, т.к. у нас свои формы авторизации
        return null
      }
    })
  ],

  // Настройка страниц для авторизации
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login', // Ошибки авторизации
  },

  // Настройка коллбэков
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Отправляем данные в наш API для обработки
          const apiBaseUrl = config.public.apiBase || 'https://localhost:7095';

          // Создаем запрос для нашего API
          const response = await fetch(`${apiBaseUrl}/api/users/oauth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              provider: 'google',
              token: account.access_token,
              email: profile?.email,
              name: profile?.name
            }),
          });

          if (!response.ok) {
            console.error('Ошибка при обработке Google OAuth:', await response.text());
            return false;
          }

          const data = await response.json();

          // Добавляем токен к пользователю чтобы использовать его в приложении
          // @ts-ignore - добавляем свойство token к объекту user
          user.token = data.token;

          return true;
        } catch (error) {
          console.error('Ошибка при входе через Google:', error);
          return false;
        }
      }

      return true;
    },

    async session({ session, token }) {
      // Добавляем токен и другие данные в сессию
      if (token.token) {
        // @ts-ignore - добавляем свойство token к объекту session
        session.token = token.token;
      }

      return session;
    },

    async jwt({ token, user, account }) {
      // Сохраняем токен и другие данные в JWT
      if (user) {
        // @ts-ignore - читаем свойство token из объекта user
        token.token = user.token;
      }

      return token;
    }
  }
}) 