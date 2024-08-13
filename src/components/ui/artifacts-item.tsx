import { InventorySlotSchema, SimpleItemSchema } from "@/types/schemas"
import { FC } from "react"

type Props = {
  item: InventorySlotSchema | SimpleItemSchema
}

export const ArtifactsItem: FC<Props> = ({ item }) => {
  return (
    <div className="border-2 rounded-lg text-center relative flex justify-center items-center h-[60px]">
      {item.code && (
        <>
          <img className="w-2/3 h-2/3 object-contain" src={`https://artifactsmmo.com/images/items/${item.code}.png`} />
          <span className="text-xs absolute bottom-1 left-1">x{item?.quantity}</span>
        </>
      )}
    </div>
  )
}