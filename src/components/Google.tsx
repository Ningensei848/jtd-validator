/* eslint-disable @next/next/next-script-for-ga */

// import Script from 'next/script'

import { Ad_ID, existsAdId, GTM_ID, existsGtmId } from 'src/google'

export const GoogleAdsense = () => {
  if (!existsAdId) {
    console.warn('Ad_ID is not set')
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${Ad_ID}`}
      crossOrigin='anonymous'
    />
  )
}

export const GoogleTagManager = () => {
  if (!existsGtmId) {
    console.warn('GTM_ID is not set')
  }
  return (
    <>
      {/* Google Tag Manager - Global base code */}
      <script
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
