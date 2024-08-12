import { components } from "@/types/artifactsmmo-openapi-scheme"
import { useEffect, useRef, useState } from "react"

import myCharacterApi from "@/api/my-character-api";
import { Loading } from "@/components/ui/loading";

import classes from './main.module.css';
import { POLING_TIME } from "@/common/config";
import mapsApi from "@/api/maps-api";
import { DataContext } from "@/context/data-context";
import { CharactersTable } from "@/modules/characters";

const loadAllMaps = async (page = 1, size = 100) => {
  const { data: mapsRes } = await mapsApi.maps({ query: { size, page } })
  
  const maps = mapsRes.data

  if (mapsRes.pages && mapsRes.pages > page) {
    maps.push(...await loadAllMaps(page + 1, size))
  }

  return maps
}

export function Main() {
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState<components['schemas']['CharacterSchema'][]>([])
  const [maps, setMaps] = useState<components['schemas']['MapSchema'][]>([])

  const polingDataTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadData = async (isPoling = false) => {
    if (loading)
      return;

    setLoading(true)
    const charactersRes = await myCharacterApi.myCharacters()
    const charactersData = charactersRes.data.data

    if (!isPoling) {
      const mapsData = await loadAllMaps()
      setMaps(mapsData)
    }

    setCharacters(charactersData)
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
    <DataContext.Provider value={{ characters, maps }}>
      <CharactersTable />

      {loading && <Loading size="16" className={classes.fixedLoader} />}
    </DataContext.Provider>
  )
}