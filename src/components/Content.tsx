import { NavTopics } from "./NavTopics";
import { CreateNote } from "./CreateNote";

export const Content: React.FC = () => {
  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <NavTopics />
      <CreateNote />
    </div>
  );
};
