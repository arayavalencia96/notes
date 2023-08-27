import { AiOutlineLoading } from "react-icons/ai";

export const Loading: React.FC = () => {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="text-gray-400">
        <AiOutlineLoading className="animate-spin text-6xl" />
        <p className="mt-2">Cargando...</p>
      </div>
    </div>
  );
};
