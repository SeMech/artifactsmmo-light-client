import { CharacterSchema, GESchema, GoldSchema, ItemSchema, MapSchema, SimpleItemSchema } from "@/types/schemas";
import { createContext } from "react";

type DataContext = {
  characters: CharacterSchema[],
  maps: MapSchema[],
  items: ItemSchema[],
  geItems: GESchema[],
  setGeItem: (item: GESchema) => void,
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
  },
  items: [],
  geItems: [],
  setGeItem: function (): void {
    throw new Error("Function not implemented.");
  }
})
