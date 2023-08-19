import { useSession } from "next-auth/react";
import { useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useSelectedTopic } from "~/contexts/SelectedTopicContext";

export const NavTopics: React.FC = () => {
  type Topic = RouterOutputs["topic"]["getAll"][0];
  const { data: sessionData } = useSession();
  const [inputValue, setInputValue] = useState("");
  const {
    selectedTopicId,
    setSelectedTopicId,
    selectedTopic,
    setSelectedTopic,
  } = useSelectedTopic();

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const handleCreateTopic = () => {
    createTopic.mutate({ title: inputValue });
    setInputValue("");
  };

  const handleClick = (id: string, topic: Topic) => {
    setSelectedTopicId(id);
    setSelectedTopic(topic);
  };

  async function deleteAllNotesWithTopicId(topicId: string) {
    try {
      if (notes !== undefined) {
        const notesToDelete = notes.filter((note) => note.topicId === topicId);
        for (const note of notesToDelete) {
          const noteToDelete = { id: note.id };
          await deleteNote.mutateAsync(noteToDelete);
        }
      }
      await deleteTopic.mutateAsync({ id: topicId });
      console.log("Se eliminó el topic correctamente.");
    } catch (error) {
      console.error("Error al eliminar el topico:", error);
    }
  }

  return (
    <div className="px-2">
      <ul className="rounded-box w-56 bg-base-100 p-2">
        {topics?.map((topic) => (
          <li
            onClick={() => handleClick(topic.id, topic)}
            key={topic.id}
            id={`topic-${topic.id}`}
            className={`flex items-center justify-between p-2 hover:bg-base-300 ${
              selectedTopicId === topic.id
                ? "bg-base-300"
                : "bg-base-100 hover:bg-base-200"
            }`}
          >
            <a
              className="flex-grow hover:text-blue-500"
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                setSelectedTopic(topic);
              }}
            >
              {topic.title}
            </a>
            <button
              className="btn-sm hover:text-blue-500"
              title="Eliminar"
              type="button"
              onClick={() => void deleteAllNotesWithTopicId(topic.id)}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      <div className="divider"></div>

      <div className="flex items-center justify-between p-2">
        <input
          type="text"
          placeholder="Nuevo Tema"
          className="input-borderer input input-sm w-full border-4 border-solid"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
        <button
          className="btn-sm"
          title="Agregar"
          type="button"
          onClick={handleCreateTopic}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};
