import { BrowserRouter } from "react-router-dom";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { CookiesProvider } from "react-cookie";
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    >
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </MoralisProvider>
  );
}

export default MyApp;
