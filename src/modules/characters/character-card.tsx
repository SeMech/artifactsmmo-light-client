import { CRAFT_SKILLS } from "@/common/consts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Modal } from "@/components/ui/modal"
import { Table, TableCell, TableRow } from "@/components/ui/table"
import { CharacterSchema } from "@/types/schemas"
import { X } from "lucide-react"

type Props = {
  character: CharacterSchema,
  close(): void
}

export function CharacterCard({ character, close }: Props) {
  const filteredInventory = character.inventory?.filter(item => item.quantity) || []

  return <Modal>
    <Card className="w-card max-w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {character.name}
          <X className="cursor-pointer" onClick={close} />
        </CardTitle>
        <CardDescription>
          Level: {character.level} <br />
          Expiriance: {character.xp}/{character.max_xp}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex mb-3">
          <Label className="w-1/3 text-base">Gold</Label>
          <div className="w-2/3">
            {character.gold}
          </div>
        </div>
        <div className="flex mb-3">
          <Label className="w-1/3 text-base">Inventory occupancy</Label>
          <div className="w-2/3">
            {character.inventory?.reduce((acc, next) => acc + (next.quantity || 0), 0) || 0}/{character.inventory_max_items}
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <Label className="w-full mb-2 text-base">Inventory</Label>
          <div className="grid grid-cols-4 gap-2">
            {filteredInventory.length > 0 ? filteredInventory.map(item => (
              <div key={item.code + item.slot} className="border-2 rounded-lg text-center relative flex justify-center items-center h-[60px]">
                {item.code && (
                  <>
                    <img className="w-2/3 h-2/3 object-contain" src={`https://artifactsmmo.com/images/items/${item.code}.png`} />
                    <span className="text-xs absolute bottom-1 left-1">x{item.quantity}</span>
                  </>
                )}
              </div>
            )) : (
              <div className="text-xs">Пусто</div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <Label className="w-full mb-2 text-base">Skills</Label>
          <Table>
            {CRAFT_SKILLS.map(skill => {
              const level = character[`${skill}_level` as keyof CharacterSchema] as string
              const xp = character[`${skill}_xp` as keyof CharacterSchema] as string
              const max_xp = character[`${skill}_max_xp` as keyof CharacterSchema] as string

              return (
                <TableRow>
                  <TableCell className="px-0">{skill}</TableCell>
                  <TableCell className="px-0 pl-1">
                    Level: {level};<br className="sm:hidden" /> Exp: {xp}/{max_xp}
                  </TableCell>
                </TableRow>
              )
            })}
          </Table>
        </div>
      </CardContent>
    </Card>
  </Modal>
}
