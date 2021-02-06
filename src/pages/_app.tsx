import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'jotai'
import { ChakraProvider } from '@chakra-ui/react'

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <ChakraProvider>
      <Provider>
        <Head>
          <title>Tamuku</title>
          <meta name="description" content="Tamuku" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default App
