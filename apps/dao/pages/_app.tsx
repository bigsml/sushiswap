import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'

import { App, classNames, Container, Typography } from '@sushiswap/ui'

import '@sushiswap/ui/index.css'
import Link from 'next/link'
import { MDXProvider } from '@mdx-js/react'
import { NextRouter, useRouter } from 'next/router'
import Script from 'next/script'

const TITLE = {
  '/': 'Sushi DAO',
  safes: 'Sushi Safes',
  team: 'Sushi Team',
  house: 'Sushi House',
  grants: 'Sushi Grants',
  sips: 'Sushi Improvement Proposals',
}

const getTitle = (router: NextRouter) => {
  return TITLE[router.asPath !== '/' ? router.asPath.slice(1, router.asPath.length) : '/']
}

const components = {
  h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
  h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
  h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
  p: ({ children }) => <Typography>{children}</Typography>,
}

declare global {
  interface Window {
    dataLayer: Record<string, any>[]
  }
}

declare global {
  interface Window {
    dataLayer: Record<string, any>[]
  }
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    const handler = (page) =>
      window.dataLayer.push({
        event: 'pageview',
        page,
      })
    router.events.on('routeChangeComplete', handler)
    return () => {
      router.events.off('routeChangeComplete', handler)
    }
  }, [router.events])
  return (
    <>
      <MDXProvider components={components}>
        <App.Shell>
          <App.Header
            className="py-8 mx-auto max-w-7xl"
            brand={<div className="font-bold">{getTitle(router)}</div>}
            nav={
              <div className="flex space-x-4 ">
                {['/', '/safes', '/team', '/grants', '/sips'].map((href, i) => {
                  const children =
                    href !== '/' ? `${href.slice(1, href.length).charAt(0).toUpperCase()}${href.slice(2)}` : 'DAO'
                  return (
                    <Link key={i} href={href}>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        className={classNames(
                          'text-gray-400 hover:text-white hover:underline focus:text-white active:text-white',
                          router.asPath === href && '!text-white !underline',
                        )}
                      >
                        {children}
                      </a>
                    </Link>
                  )
                })}
              </div>
            }
          />
          <App.Main className="flex flex-col h-full mx-auto mt-32 space-y-4 max-w-7xl lg:mx-auto">
            <Component {...pageProps} />
          </App.Main>
          <App.Footer />
        </App.Shell>
      </MDXProvider>
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', 'UA-191094689-1');
          `,
        }}
      />
    </>
  )
}

export default MyApp