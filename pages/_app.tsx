import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from 'src/theme'
import createEmotionCache from 'src/createEmotionCache'
import Layout from 'src/components/Layout'
import { usePageView } from 'src/google'
import { GTMProvider } from 'src/components/Google'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const App: React.FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Google Analytics
  usePageView()

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>JSON Typed Definition Validator</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GTMProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GTMProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
export default App
