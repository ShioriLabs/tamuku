import { atom } from 'jotai'
import shortid from 'shortid'
import localForage from 'localforage'

export interface Guest {
  id: string,
  name: string,
  organization?: string | null,
  createdAt: number
}

export const guestsAtom = atom<Guest[]>([])

export const organizationsAtom = atom<{organization: string, count: number }[]>(
  get => get(guestsAtom)
    .filter(guest => guest.organization !== '')
    .map(guest => guest.organization)
    .reduce((prev, item) => {
      let newArray = [...prev]
      const isExistsIndex = newArray.findIndex(arrItem => arrItem.organization === item)
      if (isExistsIndex > -1) newArray[isExistsIndex].count = newArray[isExistsIndex].count + 1
      else newArray = [...newArray, { organization: item?.toString() ?? '', count: 1 }]
      return newArray
    }, [] as {organization: string, count: number }[])
)

export const modifyGuestsAtom = atom<Guest[], Guest[]>(
  get => get(guestsAtom),
  async (_get, set, newList): Promise<void> => {
    await localForage.setItem('tamuku.guests', newList)
    set(guestsAtom, newList)
  }
)

export const addGuestAtom = atom<Guest[], Guest>(
  get => get(modifyGuestsAtom),
  (get, set, newGuest) => set(modifyGuestsAtom, [...get(modifyGuestsAtom), newGuest])
)

export const getGuestsCount = atom(get => get(guestsAtom).length)

export const getOrganizationsCount = atom(get => get(organizationsAtom).length)

export const createNewGuest = (name: string, organization?: string | null): Guest => {
  return {
    id: shortid.generate(),
    name,
    organization: organization ?? null,
    createdAt: new Date().getTime()
  }
}
