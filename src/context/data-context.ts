import { CharacterSchema, MapSchema } from "@/types/schemas";
import { createContext } from "react";

type DataContext = {
  characters: CharacterSchema[],
  maps: MapSchema[],
}

export const DataContext = createContext<DataContext>({
  characters: [],
  maps: []
})
