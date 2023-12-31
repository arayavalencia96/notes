import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { api } from "~/utils/api";
import { FaPlus, FaRegEdit, FaRegTimesCircle } from "react-icons/fa";
import { useSelectedTopic } from "~/contexts/SelectedTopicContext";
import { TopicsList } from "./TopicsList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Sidebar: React.FC = () => {
  const { data: sessionData } = useSession();
  const [inputValue, setInputValue] = useState("");
  const {
    selectedTopic,
    setSelectedTopic,
    selectedTopicId,
    setAction,
    action,
  } = useSelectedTopic();
  const isEditing = selectedTopicId !== null && action === "edit";
  const selectedTopicTitle = useMemo(
    () => selectedTopic?.title,
    [selectedTopic]
  );

  const { refetch: refetchTopics } = api.topic.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data) => {
      setSelectedTopic(selectedTopic ?? data[0] ?? null);
    },
  });

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
      toast.success("Tópico Creado");
    },
    onError: () => {
      toast.error("No se pudo crear el tópico");
    },
  });

  const handleCreateTopic = () => {
    createTopic.mutate({ title: inputValue });
    setInputValue("");
  };

  const updateTopic = api.topic.update.useMutation({
    onSuccess: () => {
      setSelectedTopic(null);
      setAction("");
      void refetchTopics();
      toast.success("Tópico Actualizado");
    },
    onError: () => {
      toast.error("No se pudo actualizar el tópico");
    },
  });

  const handleUpdateTopic = () => {
    updateTopic.mutate({ id: selectedTopicId || "", title: inputValue });
    setSelectedTopic(null);
    setAction("");
    setInputValue("");
  };

  const handleCancelClick = () => {
    setInputValue("");
    setSelectedTopic(null);
    setAction("");
  };

  useEffect(() => {
    if (isEditing) {
      setInputValue(selectedTopicTitle || "");
    }
  }, [isEditing, selectedTopicTitle]);

  return (
    <div className="md:1/4 mt-10 flex flex-col-reverse justify-center px-2 md:h-[35vh] md:flex-col">
      <div className="divider md:hidden"></div>
      <TopicsList />
      <div className="divider"></div>

      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Nuevo Tópico"
          autoFocus
          className="input-borderer border-1 input input-primary input-sm w-full border-solid"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue !== '') {
              if (isEditing) {
                updateTopic.mutate({
                  id: selectedTopicId,
                  title: e.currentTarget.value,
                });
              } else {
                createTopic.mutate({
                  title: e.currentTarget.value,
                });
              }
              setInputValue("");
            }
          }}
        />
        { action === "edit" ? (
          <button
          className={`btn-sm ${inputValue === "" ? "" : "hover:text-error"}`}
          title="Cancelar"
          type="button"
          onClick={handleCancelClick}
        >
          <FaRegTimesCircle />
        </button>
        ) : null }
        <button
          className={`btn-sm ${inputValue === "" ? "" : "hover:text-primary"}`}
          disabled={inputValue === ""}
          title="Agregar"
          type="button"
          onClick={(_) => {
            if (isEditing) {
              handleUpdateTopic();
            } else {
              handleCreateTopic();
            }
          }}
        >
          {isEditing ? <FaRegEdit /> : <FaPlus />}
        </button>
      </div>
    </div>
  );
};
