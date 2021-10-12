import "../styles/globals.css";
<<<<<<< HEAD
=======
import "antd/dist/antd.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
>>>>>>> FinalAccounts
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

declare const window: any;
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
export default MyApp;
