import { EFFECT_ICONS } from "@/common/consts"

export const getEffectIcon = (effectName: string): string => {
  const splittedName = effectName.split('_')
  
  if (splittedName.includes('res') || splittedName.includes('dmg') || splittedName.includes('attack'))
    return EFFECT_ICONS[splittedName[splittedName.length-1]]

  if (effectName === 'restore')
    return EFFECT_ICONS['hp']

  return EFFECT_ICONS[effectName]
}
