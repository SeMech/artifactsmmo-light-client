import { components } from "./artifactsmmo-openapi-scheme";

type schemas = components['schemas']

export type CharacterSchema = schemas['CharacterSchema']
export type MapSchema = schemas['MapSchema']
export type CraftSchema = schemas['CraftSchema']
export type InventorySlotSchema = schemas['InventorySlot'] 
export type SimpleItemSchema = schemas['SimpleItemSchema']
export type ItemSchema = schemas['ItemSchema']
export type GoldSchema = schemas['GoldSchema']
