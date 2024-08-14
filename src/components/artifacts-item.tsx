import { InventorySlotSchema, SimpleItemSchema } from "@/types/schemas"
import { FC, useMemo } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { useData } from "@/hooks/use-data"
import { MiniItemCard } from "./mini-item-card"
import { HoverCardPortal } from "@radix-ui/react-hover-card"


type Props = {
  item: InventorySlotSchema | SimpleItemSchema
}

export const ArtifactsItem: FC<Props> = ({ item }) => {
  const { items } = useData()

  const currentItem = useMemo(() => items.find(dataItem => dataItem.code === item.code),[item, items])

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="border-2 rounded-lg text-center relative flex justify-center items-center h-[60px]">
          {item.code && (
            <>
              <img className="w-2/3 h-2/3 object-contain" src={`https://artifactsmmo.com/images/items/${item.code}.png`} />
              <span className="text-xs absolute bottom-1 left-1">x{item?.quantity}</span>
            </>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardPortal>
        {currentItem && <HoverCardContent className="p-0">
          <MiniItemCard item={currentItem} />
        </HoverCardContent>}
      </HoverCardPortal>
    </HoverCard>
    
  )
}
