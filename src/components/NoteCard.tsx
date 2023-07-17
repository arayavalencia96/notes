/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { type RouterOutputs } from "~/utils/api";
type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
          <div className="card-actions mx-2 flex justify-end">
            <button className="btn-warnin btn btn-xs px-5" onClick={onDelete}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
