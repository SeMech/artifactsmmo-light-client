import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

export function useAuth() {
  const args = useContext(AuthContext);

  return { ...args }
}
