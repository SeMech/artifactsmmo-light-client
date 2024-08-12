import { DataContext } from "@/context/data-context"
import { useContext } from "react"

export const useData = () => {
  const context = useContext(DataContext)
  return context
}
