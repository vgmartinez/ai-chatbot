import type { AppProps } from 'next/app'
import { useEffect } from 'react';
 
export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .register('/sw.js')
            .then((registration) => console.log('scope is: ', registration.scope));
        }
      }, []);
    return <Component {...pageProps} />
}