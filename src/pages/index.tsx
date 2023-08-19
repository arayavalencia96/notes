import { useSession } from "next-auth/react";
import Head from "next/head";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Principal from "~/components/Principal";
import { Content } from "~/components/Content";
import { SelectedTopicProvider } from "~/contexts/SelectedTopicContext";

export default function Home() {
  const { data: sessionData } = useSession();
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Memowise</title>
        <meta name="description" content="Página realizada por Axel Araya" />
        <link rel="icon" href="/note.svg" />
      </Head>
      <Header />
      <main className="flex-grow pb-6">
        {sessionData?.user ? (
          <SelectedTopicProvider>
            <Content />
          </SelectedTopicProvider>
        ) : (
          <Principal />
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
