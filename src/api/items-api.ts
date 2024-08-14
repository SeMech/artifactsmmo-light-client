import { paths } from "@/types/artifactsmmo-openapi-scheme";
import api from "./api";

type ItemsRes = paths['/items/']['get']['responses']['200']['content']['application/json']
type ItemRes = paths['/items/{code}']['get']['responses']['200']['content']['application/json']

export default {
  items: (params: paths['/items/']['get']['parameters'] = {}) =>
    api.get<ItemsRes>('/items/', params),
  item: (params: paths['/items/{code}']['get']['parameters']) =>
    api.get<ItemRes>('/items/{code}', params)
}
