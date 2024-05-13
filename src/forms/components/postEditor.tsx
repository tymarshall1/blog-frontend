import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function MenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-1 text-black bg-white border-b-2 rounded justify-evenly">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`${
                editor.isActive("bold") ? "bg-secondary" : ""
              } hover:bg-secondary rounded-full px-1`}
            >
              <span className="text-2xl material-symbols-outlined">
                format_bold
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bold</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`${
                editor.isActive("italic") ? "bg-secondary" : ""
              } hover:bg-secondary rounded-full px-1`}
            >
              <span className="text-2xl material-symbols-outlined">
                format_italic
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Italic</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={`${
                editor.isActive("strike") ? "bg-secondary" : ""
              } hover:bg-secondary rounded-full px-1`}
            >
              <span className="text-2xl material-symbols-outlined">
                strikethrough_s
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Strikethrough</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`${
                editor.isActive("heading", { level: 1 }) ? "bg-secondary" : ""
              } hover:bg-secondary rounded-full px-1`}
            >
              <span className="text-2xl material-symbols-outlined">
                uppercase
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Heading</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`${
                editor.isActive("bulletList") ? "bg-secondary" : ""
              } hover:bg-secondary rounded-full px-1`}
            >
              <span className="text-2xl material-symbols-outlined">
                format_list_bulleted
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>List</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`${
                editor.isActive("codeBlock") ? "bg-secondary" : ""
              } hover:bg-secondary rounded-full px-1`}
            >
              <span className="text-2xl material-symbols-outlined">
                code_blocks
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Code Block</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`${
                editor.isActive("blockquote") ? "bg-secondary" : ""
              } hover:bg-secondary rounded-full px-1`}
            >
              <span className="text-2xl material-symbols-outlined">
                format_quote
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Block Quote</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

type PostEditorProps = {
  setBody: (body: string) => void;
  className?: string;
  id: string;
};
export default function PostEditor({
  setBody,
  className,
  id,
}: PostEditorProps) {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      onUpdate={({ editor }) => {
        setBody(editor.getHTML());
      }}
      editorProps={{
        attributes: {
          id: id,
          class: `${className} max-w-none rounded prose text-black px-2 prose-li:my-1 prose-p:my-1 prose-h1:text-xl prose-h1:my-1 bg-white prose-ul:list-disc outline-none prose-li:marker:text-black`,
        },
      }}
    >
      <></>
    </EditorProvider>
  );
}
