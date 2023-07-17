/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "~/components/Header";
import { api, type RouterOutputs } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>Memowise</title>
        <meta name="description" content="Página realizada por Axel Araya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Content />
      </main>
    </>
  );
}

const Content: React.FC = () => {

  type Topic = RouterOutputs["topic"]["getAll"][0];

  const { data: sessionData } = useSession();
  const [ selectedTopic, setSelectedTopic ] = useState<Topic | null>(null);
  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      }
    }
  );
  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    }
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu rounded-box w-56 bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id}>
              <a href="#"
              onClick={(evt) => {
                evt.preventDefault();
                setSelectedTopic(topic)
              }}>
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <input
          type="text"
          placeholder="Nuevo Tema"
          className="input-borderer input input-sm w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};
