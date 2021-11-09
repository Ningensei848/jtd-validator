/* eslint-disable @next/next/next-script-for-ga */
/*
 Next.jsでGoogle Analyticsを使えるようにする - パンダのプログラミングブログ cf. https://panda-program.com/posts/nextjs-google-analytics
*/

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

import { GA_ID, existsGaId, Ad_ID, existsAdId, pageview, GTM_ID } from 'src/google'

export const GoogleAnalytics = () => {
  if (!existsGaId) {
    throw Error('GA_ID is not set')
  } else {
    return (
      <>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script id='gtagjs' async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <Script
          id='GoogleAnalytics'
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
            `
          }}
        />
      </>
    )
  }
}

export const GoogleAdsense = () => {
  if (!existsAdId) {
    throw Error('Ad_ID is not set')
  } else {
    return (
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${Ad_ID}`}
        crossOrigin='anonymous'
      />
    )
  }
}

export const GoogleTagManager = () => {
  if (!existsGaId) {
    throw Error('GTM_ID is not set')
  } else {
    return (
      <>
        {/* Google Tag Manager - Global base code */}
        <Script
          id='GoogleTagManagerGlobal'
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
              `
          }}
        />
      </>
    )
  }
}

export const GTMProvider: React.FC = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  return <>{children}</>
}
