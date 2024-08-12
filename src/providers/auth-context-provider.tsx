import api from "@/api/api";
import { Loading } from "@/components/ui/loading";
import { AuthContext } from "@/context/auth-context";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode
}

const storageKey = 'artifactsmmo-token'

export function AuthContextProvider({ children }: Props) {
  const [token, setToken] = useState<string|null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const isAuth = !!token

  const auth = (token: string) => {
    setToken(token)
    localStorage.setItem(storageKey, token)
    api.setAuthToken(token)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem(storageKey)
    api.setAuthToken(null)
  }

  const loadAuth = () => {
    const savedToken = localStorage.getItem(storageKey)
    if (savedToken) {
      auth(savedToken)
    }

    setLoading(false)
  }

  useEffect(loadAuth, [])

  return <AuthContext.Provider value={{ isAuth, auth, logout }}>
    {loading ? <Loading /> : children}
  </AuthContext.Provider>
}