import { api, type RouterOutputs } from "~/utils/api";
import {
  FixedSizeList as List,
  type ListChildComponentProps,
} from "react-window";
import { useSession } from "next-auth/react";
import { useSelectedTopic } from "~/contexts/SelectedTopicContext";
import {
  FaEdit,
  FaRegHandPointDown,
  FaRegHandPointUp,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TopicsList = () => {
  type Topic = RouterOutputs["topic"]["getAll"][0];

  const { data: sessionData } = useSession();

  const {
    selectedTopic,
    setSelectedTopic,
    setSelectedTopicId,
    selectedTopicId,
    setAction,
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

  const handleClick = async (id: string, topic: Topic, action: string) => {
    setSelectedTopic(topic);
    setSelectedTopicId(id);
    setAction(action);
    action === "delete" ? await deleteAllNotesWithTopicId(topic.id) : null;
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
      toast.success("Tema eliminado");
    } catch (error) {
      toast.error("Error al eliminar el tema");
    }
  }

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
            void handleClick(topic.id, topic, "select");
          }}
        >
          {topic.title}
        </a>
        <div className="flex">
          <button
            className="btn-sm hover:text-warning"
            title="Editar"
            type="button"
            onClick={() => {
              void handleClick(topic.id, topic, "edit");
            }}
          >
            <FaEdit />
          </button>
          <button
            className="btn-sm hover:text-error"
            title="Eliminar"
            type="button"
            onClick={() => {
              void handleClick(topic.id, topic, "delete");
            }}
          >
            <FaTrash />
          </button>
        </div>
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
