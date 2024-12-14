import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>불타는 마음으로</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
