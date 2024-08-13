import { CharacterSchema, GoldSchema, MapSchema, SimpleItemSchema } from "@/types/schemas";
import { createContext } from "react";

type DataContext = {
  characters: CharacterSchema[],
  maps: MapSchema[],
  bank: {
    items: SimpleItemSchema[],
    gold: GoldSchema | null
  }
}

export const DataContext = createContext<DataContext>({
  characters: [],
  maps: [],
  bank: {
    items: [],
    gold: null
  }
})
