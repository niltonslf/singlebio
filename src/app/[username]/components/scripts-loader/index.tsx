import Script from 'next/script'

export const ScriptsLoader = ({gaCode}: {gaCode?: string}) => {
  return (
    <>
      {gaCode && (
        <>
          <Script
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=${gaCode}`}
          />

          <Script
            id='user-page-analytics'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaCode}');
          `,
            }}
          />
        </>
      )}
    </>
  )
}
