import { AxiosResponse } from "axios"

export const multiLoad = async <Model, Api extends (arg: object) => Promise<AxiosResponse>>(api: Api, page = 1, size = 100): Promise<Model[]> => {
  const acc = []
  
  const res = await api({ query: { size, page } })
  
  acc.push(...res.data.data)

  if (res.data.pages && res.data.pages > page) {
    acc.push(...await multiLoad(api, page + 1, size))
  }

  return acc
}
