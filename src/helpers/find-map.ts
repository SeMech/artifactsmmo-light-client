import { CharacterSchema, MapSchema } from "@/types/schemas";

export const findMap = (maps: MapSchema[], character: CharacterSchema) =>
  maps.find(({ x, y }) => character.x === x && character.y === y)
