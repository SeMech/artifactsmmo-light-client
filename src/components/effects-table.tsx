import { Table, TableBody, TableCell, TableRow } from "./ui/table"
import { EffectSchema } from "@/types/schemas"
import { FC } from "react"
import { getEffectIcon } from "@/utils/get-effect-icon"

type Props = {
  effects: EffectSchema[]
}

export const EffectsTable: FC<Props> = ({ effects }) => {
  return (
    <Table className="w-full">
      <TableBody>
        {effects?.map(effect => (
          <TableRow key={effect.name}>
            <TableCell className="flex items-center gap-2 px-0">
              <img src={getEffectIcon(effect.name)} width="20" height="20" className="object-contain" />
              {effect.name}
            </TableCell>
            <TableCell className="px-0 pl-1">{effect.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
