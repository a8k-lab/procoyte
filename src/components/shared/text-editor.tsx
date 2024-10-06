import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import {
  EditorProvider,
  type EditorProviderProps,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";
const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group p-3 rounded-t-lg bg-muted">
        <ButtonToolbar
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Icon icon="lucide:bold" className="w-4 h-4" />
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <Icon icon="lucide:italic" className="w-4 h-4" />
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <Icon icon="lucide:strike" className="w-4 h-4" />
        </ButtonToolbar>

        <ButtonToolbar
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <Icon icon="lucide:eraser" className="w-4 h-4" />
        </ButtonToolbar>

        <ButtonToolbar
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          H6
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered list
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Code block
        </ButtonToolbar>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </button>
        <ButtonToolbar
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Hard break
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </ButtonToolbar>
        <ButtonToolbar
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </ButtonToolbar>
      </div>
    </div>
  );
};

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

export default ({
  value,
  onChange,
}: {
  value: string;
  onChange: EditorProviderProps["onUpdate"];
}) => {
  return (
    <div className="[&>div>.tiptap]:p-4 [&>div>.tiptap]:border [&>div>.tiptap]:rounded-b-lg">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={value}
        onUpdate={onChange}
      />
    </div>
  );
};

function ButtonToolbar({
  className,
  isActive,
  ...props
}: {
  className?: string;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn(
        className,

        isActive ? "bg-gray-300" : "",
      )}
      {...props}
    />
  );
}
