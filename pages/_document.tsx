/* eslint-disable @next/next/next-script-for-ga */
import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import theme from 'src/theme'
import createEmotionCache from 'src/createEmotionCache'
import { GTM_ID } from 'src/google'
import { url } from 'src/config'

const Favicons = () => {
  return (
    <>
      <link rel='apple-touch-icon' sizes='180x180' href={url('/favicons/apple-touch-icon.png')} />
      <link rel='icon' type='image/png' sizes='32x32' href={url('/favicons/favicon-32x32.png')} />
      <link rel='icon' type='image/png' sizes='16x16' href={url('/favicons/favicon-16x16.png')} />
      <link rel='manifest' href={url('/favicons/site.webmanifest')} />
      <link rel='mask-icon' href={url('/favicons/safari-pinned-tab.svg')} color='#059669' />
      <link rel='shortcut icon' href={url('/favicon.ico')} />
      <meta name='apple-mobile-web-app-title' content='JTD Validator' />
      <meta name='application-name' content='JTD Validator' />
      <meta name='msapplication-TileColor' content='#059669' />
    </>
  )
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* PWA primary color */}
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          <Favicons />
        </Head>
        <body>
          {/* Google Tag Manager - (noscript) */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags]
  }
}
