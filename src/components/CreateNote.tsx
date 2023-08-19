import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { NoteCard } from "./NoteCard";
import { NoteEditor } from "./NoteEditor";
import { useSelectedTopic } from "~/contexts/SelectedTopicContext";

export const CreateNote: React.FC = () => {
  const { data: sessionData } = useSession();
  const { selectedTopic, setSelectedTopic } = useSelectedTopic();

  api.topic.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data) => {
      setSelectedTopic(selectedTopic ?? data[0] ?? null);
    },
  });

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return (
    <div className="col-span-3">
      <div>
        {notes?.map((note) => (
          <div className="mt-5" key={note.id}>
            <NoteCard
              note={note}
              onDelete={() => void deleteNote.mutate({ id: note.id })}
            />
          </div>
        ))}
      </div>
      <NoteEditor
        onSave={({ title, content }) => {
          void createNote.mutate({
            title,
            content,
            topicId: selectedTopic?.id ?? "",
          });
        }}
      />
    </div>
  );
};