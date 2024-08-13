import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { findMap } from "@/helpers/find-map";
import { renderCooldown } from "@/helpers/render-cooldown";
import { useData } from "@/hooks/use-data";
import { CharacterSchema, MapSchema } from "@/types/schemas";
import { ReactNode, useMemo, useState } from "react";
import { CharacterCard } from "./character-card";
import { getMapTableContent } from "@/helpers/get-map-table-content";

type Column<Props = unknown> = {
  header: string,
  content?: ReactNode | string,
  contentFn?(props: Props): ReactNode | string
}

const columns: Column<{ character: CharacterSchema, map: (MapSchema | undefined) }>[] = [
  {
    header: 'Name',
    contentFn: props => props.character.name
  },
  {
    header: 'Level',
    contentFn: props => props.character.level
  },
  {
    header: 'Location',
    contentFn: props => props.map ? getMapTableContent(props.map) : `${props.character.x}:${props.character.y}`
  },
  {
    header: 'Map',
    contentFn: props => props.map && <img className="w-[40px] h-[40px] min-w-[40px] min-h-[40px]" src={`https://artifactsmmo.com/images/maps/${props.map.skin}.png`} />
  },
  {
    header: 'Cooldown',
    contentFn: props => props.character.cooldown_expiration && renderCooldown(props.character.cooldown_expiration)
  }
]

export function CharactersTable() {
  const { characters, maps } = useData();

  const [currentCharacterName, setCurrentCharacterName] = useState<string|null>(null)

  const currentCharacter = useMemo(() => characters.find(({ name }) => name === currentCharacterName) || null, [characters, currentCharacterName])

  return (
    <div>
      <div className="text-2xl font-semibold mb-1">Characters table</div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(({ header }) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {characters.map(character => (
            <TableRow key={character.name} onClick={() => setCurrentCharacterName(character.name)} className="cursor-pointer">
              {columns.map(column => (
                <TableCell key={`${character.name}_${column.header}`} className="w-[max-content]">
                  {column.content || column.contentFn?.({ character, map: findMap(maps, character) }) || '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {currentCharacter && <CharacterCard
        character={currentCharacter}
        close={() => setCurrentCharacterName(null)}
      />}
    </div>
  )
}
