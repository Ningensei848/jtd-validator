import { useRouter } from 'next/router'
import { useEffect } from 'react'

/*
 * https://github.com/vercel/next.js/blob/master/examples/with-google-analytics/pages/_app.js
 */

interface Window {
  gtag: any
  dataLayer: any
}
declare var window: Window

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''
export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ''
export const Ad_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ''

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== ''
export const existsAdId = Ad_ID !== ''

export type Event = {
  action: string
  category: string
  label?: Record<string, string | number | boolean>
  value?: string
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_ID, {
    page_path: url
  })
  window.dataLayer.push({
    event: 'pageview',
    page: url
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: Event) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

export const usePageView = () => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
