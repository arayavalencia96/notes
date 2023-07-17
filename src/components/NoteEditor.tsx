import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setcode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
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
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setcode(value)}
          className="border border-gray-300"
        />
      </div>
      <div className="card-actions justify-end">
        <button
        onClick={() => {
            onSave({
                title,
                content: code,
            });
            setcode("");
            setTitle("");
        }}
        disabled={title.trim().length === 0 || code.trim().length === 0}
        className="btn btn-primary">Guardar</button>
      </div>
    </div>
  );
};
