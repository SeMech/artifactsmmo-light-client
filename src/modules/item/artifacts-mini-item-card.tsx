import { GESchema, ItemSchema } from "@/types/schemas"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { FC, useEffect, useState } from "react"
import geApi from "@/api/ge-api"
import { useData } from "@/hooks/use-data"

type Props = {
  item: ItemSchema
}

export const MiniItemCard: FC<Props> = ({ item }) => {
  const { geItems, setGeItem } = useData()
  const [ge, setGe] = useState<GESchema|undefined>(geItems.find(geItem => geItem.code === item.code))

  const load = async () => {
    const geRes = await geApi.item({ path: { code: item.code } })
    setGe(geRes.data.data)
    setGeItem(geRes.data.data)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell colSpan={2}>{item.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>GE</TableCell>
          {ge && (
            <>
              <TableCell>sell: {ge.sell_price}</TableCell>
              <TableCell>buy: {ge.buy_price}</TableCell>
            </>
          )}
        </TableRow>
      </TableBody>
    </Table>
  )
}
