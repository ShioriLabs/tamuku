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

export const createNewGuest = (name: string, organization?: string | null): Guest => {
  return {
    id: shortid.generate(),
    name,
    organization: organization ?? null,
    createdAt: new Date().getTime()
  }
}
