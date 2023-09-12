/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { type RouterOutputs } from "~/utils/api";
type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
  onClickEdit,
}: {
  note: Note;
  onDelete: () => void;
  onClickEdit: (note: Note) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleEditClick = () => {
    onClickEdit(note);
  };

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
        >
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer collapse-title text-xl font-bold"
          >
            {note.title}
          </div>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
          <div className="card-actions mx-2 flex justify-end">
            <button className="btn-error btn btn-xs px-5 flexWrow" onClick={onDelete}>
              Eliminar
            </button>
            <button
              className="btn-warning btn btn-xs px-5 flexWrow"
              onClick={handleEditClick}
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
