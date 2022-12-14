import { BrowserRouter} from "react-router-dom";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { CookiesProvider } from "react-cookie";
import InsureContext from "../context/InsureContext";
function MyApp({ Component, pageProps }) {
  return (
    <InsureContext>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      >
        
          <Component {...pageProps} />
        
      </MoralisProvider>
    </InsureContext>
  );
}

export default MyApp;
