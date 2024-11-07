"use client";

import type { Editor as EditorInstance, JSONContent } from "@tiptap/react";
import { cn } from "@travelese/ui/cn";
import { Editor as BaseEditor } from "@travelese/ui/editor";
import { useCallback, useEffect, useState } from "react";

type Props = {
  initialContent?: JSONContent;
  className?: string;
  onChange?: (content?: JSONContent | null) => void;
  onBlur?: (content: JSONContent | null) => void;
  placeholder?: string;
};

export function Editor({
  initialContent,
  className,
  onChange,
  onBlur,
  placeholder,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState<JSONContent | null | undefined>(
    initialContent,
  );

  // When async content is loaded, set the content
  useEffect(() => {
    if (initialContent !== content) {
      setContent(initialContent);
    }
  }, [initialContent]);

  const handleUpdate = useCallback(
    (editor: EditorInstance) => {
      const json = editor.getJSON();
      const newIsEmpty = editor.state.doc.textContent.length === 0;

      setContent(newIsEmpty ? null : json);
      onChange?.(newIsEmpty ? null : json);
    },
    [onChange],
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    // Only call onBlur if the content has changed
    if (content !== initialContent) {
      onBlur?.(content ?? null);
    }
    onBlur?.(content ?? null);
  }, [content, onBlur]);

  const showPlaceholder = !content && !isFocused;

  return (
    <BaseEditor
      className={cn(
        "font-mono text-[11px] text-primary leading-[18px] invoice-editor",
        showPlaceholder &&
          "w-full bg-[repeating-linear-gradient(-60deg,#DBDBDB,#DBDBDB_1px,background_1px,background_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,background_1px,background_5px)]",
        className,
      )}
      placeholder={placeholder}
      initialContent={content}
      onUpdate={handleUpdate}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
    />
  );
}
