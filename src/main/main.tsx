import { components } from "@/types/artifactsmmo-openapi-scheme"
import { useEffect, useRef, useState } from "react"

import myCharacterApi from "@/api/my-character-api";
import { Loading } from "@/components/ui/loading";

import classes from './main.module.css';
import { POLING_TIME } from "@/common/config";
import mapsApi from "@/api/maps-api";
import { DataContext } from "@/context/data-context";
import { CharactersTable } from "@/modules/characters";
import { GESchema, GoldSchema, ItemSchema, MapSchema, SimpleItemSchema } from "@/types/schemas";
import myAccountApi from "@/api/my-account-api";
import { BankData } from "@/modules/bank";
import itemsApi from "@/api/items-api";
import { multiLoad } from "@/utils/multi-load";

const loadAllMaps = async () => {
  return multiLoad<MapSchema, typeof mapsApi.maps>(mapsApi.maps)
}

const loadAllItems = async () => {
  return multiLoad<ItemSchema, typeof itemsApi.items>(itemsApi.items)
}

export function Main() {
  const [loading, setLoading] = useState(false)
  
  const [characters, setCharacters] = useState<components['schemas']['CharacterSchema'][]>([])
  const [maps, setMaps] = useState<MapSchema[]>([])
  const [bankItems, setBankItems] = useState<SimpleItemSchema[]>([])
  const [bankGold, setBankGold] = useState<GoldSchema | null>(null)
  const [items, setItems] = useState<ItemSchema[]>([])
  const [geItems, setGeItems] = useState<GESchema[]>([])

  const polingDataTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const setGeItem = (item: GESchema) => {
    setGeItems(prevState => {
      const state = [...prevState]
      const foundItemIndex = state.findIndex(stateItem => item.code === stateItem.code)
      
      if (foundItemIndex !== -1) state[foundItemIndex] = item
      else state.push(item)

      return state
    })
  }

  const loadData = async (isPoling = false) => {
    if (loading)
      return;

    setLoading(true)
    const charactersRes = await myCharacterApi.myCharacters()
    const charactersData = charactersRes.data.data

    const bankItemsRes = await myAccountApi.items()
    const bankItemsData = bankItemsRes.data.data

    const bankGoldRes = await myAccountApi.gold()
    const bankGoldData = bankGoldRes.data.data

    if (!isPoling) {
      const mapsData = await loadAllMaps()
      const itemsData = await loadAllItems()
      setMaps(mapsData)
      setItems(itemsData)
    }

    setCharacters(charactersData)
    setBankItems(bankItemsData)
    setBankGold(bankGoldData)
    setLoading(false)
  }

  const startPolingData = () => {
    if (polingDataTimeoutRef.current)
      return;

    const poling = () => {
      polingDataTimeoutRef.current = setTimeout(async () => {
        await loadData(true)
        poling()
      }, POLING_TIME)
    }

    poling()
  }

  useEffect(() => {
    loadData()
    startPolingData()
  }, [])

  return (
    <DataContext.Provider value={{ geItems, setGeItem, items, characters, maps, bank: { items: bankItems, gold: bankGold } }}>
      <CharactersTable />
      <div className="mb-8" />

      <BankData />

      {loading && <Loading size="16" className={classes.fixedLoader} />}
    </DataContext.Provider>
  )
}
