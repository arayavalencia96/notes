/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { NoteCard } from "~/components/NoteCard";
import { NoteEditor } from "~/components/NoteEditor";
import Principal from "~/components/Principal";
import { api, type RouterOutputs } from "~/utils/api";

export default function Home() {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Memowise</title>
        <meta name="description" content="Página realizada por Axel Araya" />
        <link rel="icon" href="/note.svg" />
      </Head>
      <Header />
      <main>{sessionData?.user ? <Content /> : <Principal />}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

const Content: React.FC = () => {
  type Topic = RouterOutputs["topic"]["getAll"][0];

  const { data: sessionData } = useSession();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );
  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });
  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu rounded-box w-56 bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedTopic(topic);
                }}
              >
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
      <div className="col-span-3">
        <div>
          {notes?.map((note) => (
            <div className="mt-5" key={note.id}>
              <NoteCard
                note={note}
                onDelete={() => void deleteNote.mutate({ id: note.id })}
              />
            </div>
          ))}
        </div>
        <NoteEditor
          onSave={({ title, content }) => {
            void createNote.mutate({
              title,
              content,
              topicId: selectedTopic?.id ?? "",
            });
          }}
        />
      </div>
    </div>
  );
};
