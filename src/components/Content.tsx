import { Sidebar } from "./Sidebar";
import { CreateNote } from "./CreateNote";
import { FaInfoCircle } from "react-icons/fa";
import { useSelectedTopic } from "~/contexts/SelectedTopicContext";

export const Content: React.FC = () => {
  const { selectedTopicId, action } = useSelectedTopic();
  const NotSelectedTopic = () => {
    return (
      <div className="min-h col-span-3 flex w-full flex-col items-center justify-center md:w-3/4">
        <FaInfoCircle className="mb-2 text-6xl" />
        <p className="text-xl font-medium">Seleccionar un tema</p>
      </div>
    );
  };
  return (
    <div className="mx-5 mt-5 flex min-h-[75vh] flex-col md:flex-row">
      <Sidebar />
      <div className="hide mr-6 mt-8 inline-block min-h-[1em] w-[1px] self-stretch bg-gray-300 opacity-100 dark:opacity-25"></div>
      {selectedTopicId !== null && action !== "delete" ? (
        <CreateNote />
      ) : (
        <NotSelectedTopic />
      )}
    </div>
  );
};
