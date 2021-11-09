import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Window {
  dataLayer: any
}
declare var window: Window

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ''
export const Ad_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ''

// IDが取得できない場合を想定する
export const existsGtmId = GTM_ID !== ''
export const existsAdId = Ad_ID !== ''

export const pageview = (url: string) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url
  })
}

export const usePageView = () => {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])
}
