export const renderCooldown = (expireDate: string) => {
  const currentTime = Date.now()
  const expireTime = (new Date(expireDate)).getTime()

  if (currentTime > expireTime)
    return '-'

  const time = Math.abs(expireTime - currentTime)

  return Math.ceil(time/1000) + 's'
}
