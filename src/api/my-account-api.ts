import { paths } from "@/types/artifactsmmo-openapi-scheme"
import api from "./api";

type BankItemsRes = paths['/my/bank/items']['get']['responses']['200']['content']['application/json'];
type BankGoldRes = paths['/my/bank/gold']['get']['responses']['200']['content']['application/json'];

export default {
  items: async (params: paths['/my/bank/items']['get']['parameters'] = {}) =>
    api.privateGet<BankItemsRes>('/my/bank/items', params),
  gold: async (params: paths['/my/bank/gold']['get']['parameters'] = {}) =>
    api.privateGet<BankGoldRes>('/my/bank/gold', params)
}
