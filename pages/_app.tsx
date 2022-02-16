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
import { GoogleAdsense, GoogleTagManager } from 'src/components/Google'

const siteUrl = 'https://ningensei848.github.io/jtd-validator'
const Description = 'Online Validator for "JSON Typed Definition" built with Next.js + TypeScript'
const SITE_NAME = '気合でなんとか'
const Title = `JTDV - JSON Typed Definition Validator | ${SITE_NAME}`
const imageUrl =
  'https://custom-og-image-generator.vercel.app/api/' +
  '**JTDV**%20-%20JSON%20Typed%20Definition%20Validator.png' +
  '?theme=dark&copyright=Kubokawa+Takara' +
  '&logo=https%3A%2F%2Fraw.githubusercontent.com%2FNingensei848%2Fjtd-validator%2Fmain%2Fpublic%2Ffavicons%2Fandroid-chrome-192x192.png' +
  '&avater=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F763543133724352513%2Fr6RlBYDo_400x400.jpg' +
  '&author=Kiai&aka=%40Ningensei848&site=Ningensei848%2Fjtd-validator' +
  '&tags=JSONTypedDefinition&tags=jtd&tags=typescript&tags=nextjs'

const TWITTER_SITE =
  process.env.NEXT_PUBLIC_TWITTER_SITE || process.env.NEXT_PUBLIC_TWITTER_SITE_ID || '@Ningensei848'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const App: React.FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  usePageView()

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>JSON Typed Definition Validator</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='description' content={Description} />
        <meta property='og:url' content={siteUrl} />
        <meta property='og:title' content={Title} />
        <meta property='og:site_name' content={SITE_NAME} />
        <meta property='og:description' content={Description} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        {/* About Twitter Cards |  https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards */}
        <meta name='twitter:card' content='summary_large_image' />
        {process.env.NEXT_PUBLIC_TWITTER_SITE ? (
          <meta name='twitter:site' content={TWITTER_SITE} />
        ) : (
          <meta name='twitter:site:id' content={TWITTER_SITE} />
        )}
        <meta name='twitter:title' content={Title} />
        <link rel='canonical' href={process.env.NEXT_PUBLIC_CANONICAL || siteUrl} />
        <GoogleTagManager />
        <GoogleAdsense />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  )
}
export default App
