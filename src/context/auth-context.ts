import { createContext } from "react";

export type AuthContext = {
  isAuth: boolean,
  auth: (token: string) => void,
  logout: () => void,
}

export const AuthContext = createContext<AuthContext>({
  auth: function (): void {
    throw new Error("Function not implemented.");
  },
  isAuth: false,
  logout: function (): void {
    throw new Error("Function not implemented.");
  }
})
