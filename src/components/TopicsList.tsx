import { api, type RouterOutputs } from "~/utils/api";
import {
  FixedSizeList as List,
  type ListChildComponentProps,
} from "react-window";
import { useSession } from "next-auth/react";
import { useSelectedTopic } from "~/contexts/SelectedTopicContext";
import { FaRegHandPointDown, FaRegHandPointUp, FaTrash } from "react-icons/fa";

export const TopicsList = () => {
  type Topic = RouterOutputs["topic"]["getAll"][0];
  const { data: sessionData } = useSession();
  const {
    selectedTopic,
    setSelectedTopic,
    setSelectedTopicId,
    selectedTopicId,
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
      setSelectedTopicId(null);
    } catch (error) {
      console.error("Error al eliminar el topico:", error);
    }
  }
  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

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

  const WithoutTopics = () => {
    return (
      <div className="order mt-2 flex flex-col items-center">
        <p className="mb-2 text-lg font-medium">Agregar un tema.</p>
        <FaRegHandPointUp className="text-3xl md:hidden" />
        <FaRegHandPointDown className="hide text-3xl" />
      </div>
    );
  };
  const Row = ({ index, style }: ListChildComponentProps) => {
    const topic = topics?.[index];

    if (!topic) {
      return null;
    }

    return (
      <li
        style={style}
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
    );
  };
  return (
    <div>
      {topics && topics?.length > 0 ? (
        <div>
          <List
            height={Math.min(200, topics.length * 50)}
            width={`auto`}
            itemCount={topics?.length || 0}
            itemSize={50}
          >
            {Row}
          </List>
        </div>
      ) : (
        <WithoutTopics />
      )}
    </div>
  );
};
