import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Topbar } from '@/common/Topbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Topbar />
      <Component {...pageProps} />
    </>
  )
}
