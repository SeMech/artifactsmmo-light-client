import { paths } from "@/types/artifactsmmo-openapi-scheme";
import api from "./api";

type GEItemsRes = paths['/ge/']['get']['responses']['200']['content']['application/json']
type GEItemRes = paths['/ge/{code}']['get']['responses']['200']['content']['application/json']

export default {
  items: (params: paths['/ge/']['get']['parameters'] = {}) =>
    api.get<GEItemsRes>('/ge/', params),
  item: (params: paths['/ge/{code}']['get']['parameters']) =>
    api.get<GEItemRes>('/ge/{code}', params)
}
