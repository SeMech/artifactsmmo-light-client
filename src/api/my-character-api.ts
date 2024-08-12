import { paths } from "@/types/artifactsmmo-openapi-scheme";
import api from "./api";

type AllCharactersLogsRes = paths['/my/logs']['get']['responses']['200']['content']['application/json']
type MyCharactersRes = paths['/my/characters']['get']['responses']['200']['content']['application/json']

export default {
  allCharactersLogs: (params: paths['/my/logs']['get']['parameters'] = {}) =>
    api.privateGet<AllCharactersLogsRes>('/my/logs', params),
  myCharacters: (params: paths['/my/characters']['get']['parameters'] = {}) =>
    api.privateGet<MyCharactersRes>('/my/characters', params)
}
