import Header from "@/layout/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WalletConnectProvider } from "@/components/WalletConnectProvider";
import Sidebar from "@/components/Sidebar";
import Footer from "@/layout/footer";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pageTitle = router.pathname.replace("/", "").toUpperCase() || "Presale";
  return (
    <>
      <WalletConnectProvider>
        <Header />
        {/* <Sidebar /> */}
        <main className="flex flex-col justify-center">
          <img src="/images/logo.png" width={256} className="mx-auto mt-20" />
          <h1 className="mx-auto text-center text-[36px] font-bold text-white drop-shadow-[4px_4px_0px_rgba(221,82,48,1)]">
            {pageTitle}
          </h1>
          <Component {...pageProps} />
          <ToastContainer autoClose={3000} draggableDirection="x" />
        </main>
        <div className="z-[100]">
          <Footer></Footer>
        </div>
      </WalletConnectProvider>
    </>
  );
}
