import React, { FormEvent } from 'react'
import { Flex, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useAtom } from 'jotai'

import { createNewGuest, addGuestAtom } from '../../store/guest'

const Index = (): React.ReactElement => {
  const [, addGuest] = useAtom(addGuestAtom)

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')?.toString().trim() ?? ''
    const organization = formData.get('organization') as string ?? null
    const newGuest = createNewGuest(name, organization)
    addGuest(newGuest)
    e.currentTarget.reset()
  }

  return (
    <Flex py="8" px="16" alignItems="center" minH="100vh" color="gray.900" bg="purple.50">
      <Flex flexDirection="column">
        <Heading variant="h1" color="purple.500" size="2xl" mb="8">Selamat Datang!</Heading>
        <form onSubmit={handleFormSubmit}>
          <FormControl mb="4">
            <FormLabel>Nama</FormLabel>
            <Input name="name" required placeholder="Nama Anda" borderColor="gray.300" />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Instansi (Tidak Wajib)</FormLabel>
            <Input name="organization" placeholder="Asal Instansi/Organisasi/Keluarga Anda" borderColor="gray.300" />
          </FormControl>
          <Button type="submit" colorScheme="purple">
            Isi Buku Tamu
          </Button>
        </form>
      </Flex>
    </Flex>
  )
}

export default Index
