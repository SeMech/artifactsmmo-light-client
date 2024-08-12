import { MapSchema } from "@/types/schemas";

export const getMapTableContent = (map: MapSchema) => (
  <div>
    Name: {map.name}
    <br />
    Content: {map.content ? `${map.content.code}:${map.content.type}` : '-'}
  </div>
)
