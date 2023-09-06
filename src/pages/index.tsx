import { useSession } from "next-auth/react";
import Head from "next/head";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Principal from "~/components/Principal";
import { Content } from "~/components/Content";
import { SelectedTopicProvider } from "~/contexts/SelectedTopicContext";
import { Loading } from "~/components/Loading";
import { LoadingProvider } from "~/contexts/LoadingContext";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const { data: sessionData, status: sessionLoading } = useSession();
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Memowise</title>
        <meta name="description" content="Página realizada por Axel Araya" />
        <link rel="icon" href="/note.svg" />
      </Head>
      <LoadingProvider>
        <Header />
        <main className="flex-grow pb-6">
          {sessionLoading === "loading" ? (
            <Loading />
          ) : sessionData?.user ? (
            <SelectedTopicProvider>
              <Content />
            </SelectedTopicProvider>
          ) : (
            <Principal />
          )}
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </LoadingProvider>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
