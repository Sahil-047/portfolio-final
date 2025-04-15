import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp; 