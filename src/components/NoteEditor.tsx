import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { type RouterOutputs } from "~/utils/api";
type Note = RouterOutputs["note"]["getAll"][0];

export const NoteEditor = ({
  onSave,
  onEdit,
  values,
  isEdit,
}: {
  onSave: (note: { title: string; content: string }) => void;
  onEdit: (note: {
    id: string;
    topicId: string;
    title: string;
    content: string;
  }) => void;
  values?: Note;
  isEdit?: boolean;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (values) {
      setCode(values?.content || "");
      setTitle(values?.title || "");
    }
  }, [values]);

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            className="input input-primary input-lg w-full font-bold"
          />
        </h2>
        <CodeMirror
          value={code}
          width="100%"
          height="70%"
          minWidth="70%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="border border-gray-300"
        />
      </div>
      <div className="card-actions justify-end">
        <button
          onClick={() => {
            if (!isEdit) {
              onSave({
                title,
                content: code,
              });
            } else {
              onEdit({
                id: values?.id || "",
                topicId: values?.topicId || "",
                title,
                content: code,
              });
            }
            setCode("");
            setTitle("");
          }}
          disabled={title.trim().length === 0 || code.trim().length === 0}
          className="btn btn-primary"
        >
          {isEdit ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </div>
  );
};
