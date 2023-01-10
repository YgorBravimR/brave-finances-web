import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from "react";

import { api } from "../services/axios";

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  fullname?: string,
  avatar?: string,
  email: string,
  password: string,
  created_at?: Date,
  updated_at?: Date
}

interface AuthContextType {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User | null
  isAuthenticated: boolean
  singOut(): void
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@MyBills:token': cookie } = parseCookies()
    if (cookie) {
      const { user, token } = JSON.parse(cookie)

      if (token) {
        setUser(user)
      }
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    const res = await api.post('/sessions', { email, password })
    const { token, user } = res.data.data;
    setCookie(undefined, '@MyBills:token', JSON.stringify({ token, user }), {
      maxAge: 60 * 60 * 12, // 12 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user)

    router.push('/dashboard');
  }

  function singOut() {
    destroyCookie(null, "@MyBills:token")

    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user, singOut }}>
      {children}
    </AuthContext.Provider>
  )
}
