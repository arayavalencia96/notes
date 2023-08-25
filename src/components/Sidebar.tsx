import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { FaPlus } from "react-icons/fa";
import { useSelectedTopic } from "~/contexts/SelectedTopicContext";
import { TopicsList } from "./TopicsList";

export const Sidebar: React.FC = () => {
  const { data: sessionData } = useSession();
  const [inputValue, setInputValue] = useState("");
  const { selectedTopic, setSelectedTopic } = useSelectedTopic();

  const { refetch: refetchTopics } = api.topic.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data) => {
      setSelectedTopic(selectedTopic ?? data[0] ?? null);
    },
  });

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const handleCreateTopic = () => {
    createTopic.mutate({ title: inputValue });
    setInputValue("");
  };

  return (
    <div className="flex flex-col-reverse justify-center mt-10 px-2 md:h-[35vh] md:1/4 md:flex-col">
      <div className="divider md:hidden"></div>
      <TopicsList />
      <div className="divider"></div>

      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Nuevo Tema"
          autoFocus
          className="input-borderer border-1 input input-primary input-sm w-full border-solid"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value,
              });
              setInputValue("");
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
