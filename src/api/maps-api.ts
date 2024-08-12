import { paths } from "@/types/artifactsmmo-openapi-scheme";
import api from "./api";

type MapsRes = paths['/maps/']['get']['responses']['200']['content']['application/json']
type MapRes = paths['/maps/{x}/{y}']['get']['responses']['200']['content']['application/json']

export default {
  maps: (params: paths['/maps/']['get']['parameters'] = {}) =>
    api.get<MapsRes>('/maps/', params),
  map: (params: paths['/maps/{x}/{y}']['get']['parameters']) =>
    api.get<MapRes>('/maps/{x}/{y}', params)
}
