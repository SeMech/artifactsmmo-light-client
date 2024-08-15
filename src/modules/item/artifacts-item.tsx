import { InventorySlotSchema, ItemSchema, SimpleItemSchema } from "@/types/schemas"
import { FC, useMemo, useState } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useData } from "@/hooks/use-data"
import { MiniItemCard } from "./artifacts-mini-item-card"
import { HoverCardPortal } from "@radix-ui/react-hover-card"
import { ArtifactsItemCard } from "./artifacts-item-card"


type Props = {
  item: InventorySlotSchema | SimpleItemSchema | ItemSchema
}

export const ArtifactsItem: FC<Props> = ({ item }) => {
  const { items } = useData()
  const [showedCard, setShowedCard] = useState<boolean>(false)

  const currentItem = useMemo(() => items.find(dataItem => dataItem.code === item.code),[item, items])

  const renderContent = () => <div className="border-2 rounded-lg text-center relative flex justify-center items-center h-[60px] cursor-pointer" onClick={() => setShowedCard(true)}>
    {item.code && (
      <>
        <img className="w-2/3 h-2/3 object-contain" src={`https://artifactsmmo.com/images/items/${item.code}.png`} />
        {'quantity' in item && <span className="text-xs absolute bottom-1 left-1">x{item?.quantity}</span>}
      </>
    )}
  </div>

  return (
    <>
      <HoverCard openDelay={100} closeDelay={50}>
        <HoverCardTrigger asChild>
          {renderContent()}
        </HoverCardTrigger>
        <HoverCardPortal>
          {currentItem && <HoverCardContent className="p-0">
            <MiniItemCard item={currentItem} />
          </HoverCardContent>}
        </HoverCardPortal>
      </HoverCard>
      {(showedCard && currentItem) &&
        <ArtifactsItemCard item={currentItem} close={() => setShowedCard(false)} />}
    </>
  )
}
