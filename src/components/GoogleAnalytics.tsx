/* eslint-disable @next/next/inline-script-id */

/*
 Next.jsでGoogle Analyticsを使えるようにする - パンダのプログラミングブログ cf. https://panda-program.com/posts/nextjs-google-analytics
*/

import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

interface Window {
  gtag: any
}
declare var window: Window

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''
export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ''

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== ''

// PVを測定する
export const pageview = (path: string) => {
  window.gtag('config', GA_ID, {
    page_path: path
  })
}

// GAイベントを発火させる
export const event = ({ action, category, label, value = '' }: Event) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label ? JSON.stringify(label) : '',
    value
  })
}

// _app.tsx で読み込む
export const usePageView = () => {
  const router = useRouter()

  useEffect(() => {
    if (!existsGaId) {
      return
    }

    const handleRouteChange = (path: string) => {
      pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

// _app.tsx で読み込む
export const GoogleAnalytics: React.FC = () => {
  if (!existsGaId) {
    return <></>
  } else {
    return (
      <>
        {/* Google Tag Manager */}
        <Script
          defer
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
              `
          }}
        />

        <Script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy='afterInteractive'
        />
        <Script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `
          }}
          strategy='afterInteractive'
        />
      </>
    )
  }
}

export type Event = {
  action: string
  category: string
  label?: Record<string, string | number | boolean>
  value?: string
}
