import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html data-theme='lofi'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          id='matomo-script'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//mavfew.fra1.a.restack.io/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();`,
          }}
        />
      </body>
    </Html>
  )
}
