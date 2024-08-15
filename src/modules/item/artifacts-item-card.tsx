import { GESchema, ItemSchema } from "@/types/schemas"

import { Modal } from "@/components/ui/modal"
import { FC, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { useData } from "@/hooks/use-data"
import { ArtifactsItem } from "./artifacts-item"
import geApi from "@/api/ge-api"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Loading } from "@/components/ui/loading"
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AccordionContent } from "@radix-ui/react-accordion"
import { EffectsTable } from "@/components/effects-table"

type Props = {
  item: ItemSchema,
  close: () => void,
}

export const ArtifactsItemCard: FC<Props> = ({ item, close }) => {
  const { items: dataItems, geItems, setGeItem, maps } = useData()

  const [ge, setGe] = useState<GESchema|undefined>(geItems.find(geItem => geItem.code === item.code))
  const [loading, setLoading] = useState<boolean>(false)

  const craftItems = dataItems.filter(dataItem => dataItem?.craft?.items?.find(craftItem => craftItem.code === item.code))

  const craftMap = maps.find(map => map.content?.type === 'workshop' && map.content.code === item.craft?.skill)

  const load = async () => {
    if (!ge)
      setLoading(true)

    const geRes = await geApi.item({ path: { code: item.code } })
    const geData = geRes.data.data
    
    setGe(geData)
    setGeItem(geData)

    if (!ge)
      setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const content = [
    {
      id: 'craft',
      header: `Craft (${item.craft?.skill})`,
      visible: !!item.craft,
      content: () => <div className="w-full">
        <div className="flex flex-col mb-3">
          <div className="text-sm">Level: {item.craft?.level}</div>
        </div>
        {craftMap && <div className="flex flex-col mb-3">
          <div className="text-sm">Location</div>
          <div className="text-xs">
            Name: {craftMap.name} <br />
            Content: {craftMap.content ? `${craftMap.content.code}:${craftMap?.content.type}` : '-'} <br />
            Coords: {craftMap.x}:{craftMap.y}
          </div>
        </div>}
        <div className="grid grid-cols-4 gap-2 py-2">
          {item.craft ? item.craft?.items?.map(item => (
            <ArtifactsItem key={item.code} item={item} />
          )) : (
            <div className="text-xs">Not found</div>
          )}
        </div>
      </div>
    },
    {
      id: 'effects',
      header: `Effects`,
      visible: item.effects && item.effects.length > 0,
      content: () => <div className="w-full">
        {item.effects && item.effects.length > 0 ? (
          <EffectsTable effects={item.effects} />
        ) : (
          <div className="text-xs">Not found</div>
        )}
      </div>
    },
    {
      id: 'grand-exchange',
      header: 'Grand Exchange',
      content: () => <Table className="w-full">
        <TableBody>
          {!loading ? (
            <>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>{ge?.stock}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Buy</TableCell>
                <TableCell>{ge?.buy_price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sell</TableCell>
                <TableCell>{ge?.sell_price}</TableCell>
              </TableRow>
            </>
          ) : (
            <Loading  />
          )}
        </TableBody>
      </Table>
    },
    {
      id: 'used-in-crafts',
      header: 'Used in crafts',
      visible: !!craftItems.length,
      content: () => <div className="grid grid-cols-4 gap-2 py-2">
        {craftItems.length > 0 ? craftItems.map(item => (
          <ArtifactsItem key={item.code + item.type} item={item} />
        )) : (
          <div className="text-xs">Not found</div>
        )}
      </div>
    }
  ]

  return <Modal>
    <Card className="w-card max-w-full">
      <CardHeader className="flex-row gap-4 items-center">
        <img className="w-[60px] h-[60px] object-contain" src={`https://artifactsmmo.com/images/items/${item.code}.png`} />
        <div className="flex flex-col space-y-1.5 w-full">
          <CardTitle className="flex justify-between items-center">
            {item.name}
          </CardTitle>
          <CardDescription>
            {item.description && <>{item.description} <br /></>}
            Type: {item.type}:{item.subtype}
          </CardDescription>
        </div>
        <X className="cursor-pointer self-start min-w-[24px] min-h-[24px]" onClick={close} />
      </CardHeader>
      <CardContent className="grid w-full items-center gap-4">
        <Accordion type="single" className="w-full" collapsible>
          {content.filter(c => c.visible !== undefined ? c.visible : true).map(({ id, header, content }) => (
            <AccordionItem value={id} key={id}>
              <AccordionTrigger>
                <div className="text-sm">{header}</div>
              </AccordionTrigger>
              <AccordionContent>{content()}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  </Modal>
}
