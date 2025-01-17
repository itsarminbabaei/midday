"use client";

import type { ClientMessage } from "@/actions/ai/types";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { ScrollArea } from "@travelese/ui/scroll-area";
import { Textarea } from "@travelese/ui/textarea";
import { useActions } from "ai/rsc";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState  } from "react";
import { ChatEmpty } from "@/components/chat/chat-empty";
import { ChatExamples } from "@/components/chat/chat-examples";
import { ChatFooter } from "@/components/chat/chat-footer";
import { ChatList } from "@/components/chat/chat-list";
import { UserMessage } from "@/components/chat/messages";
import { useAIState, useUIState } from "ai/rsc";
import type { AI } from "@/actions/ai/chat";

export function PageChat() {
  const { submitUserMessage } = useActions();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [messages, setMessages] = useUIState<typeof AI>();
  const [aiState] = useAIState<typeof AI>();
  const [input, setInput] = useState<string>("");

  const onSubmit = async (input: string) => {
    const value = input.trim();

    if (value.length === 0) return null;

    setInput("");
    scrollToBottom();

    setMessages((messages: ClientMessage[]) => [
      ...messages,
      {
        id: nanoid(),
        role: "user",
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    const responseMessage = await submitUserMessage(value);

    setMessages((messages: ClientMessage[]) => [
      ...messages,
      responseMessage,
    ]);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef?.current?.focus();
    });
  }, [messages]);

  const { messagesRef, scrollRef, visibilityRef, scrollToBottom } =
    useScrollAnchor();

  const showExamples = messages.length === 0 && !input;

  return (
    <div className="relative h-full flex flex-col">
      <ScrollArea className="flex-1 overflow-auto" ref={scrollRef}>
        <div ref={messagesRef}>
          {messages.length ? (
            <ChatList messages={messages} className="p-4 pb-8" />
          ) : (
            <ChatEmpty firstName={aiState.user?.full_name.split(" ").at(0)} />
          )}

          <div className="w-full h-px" ref={visibilityRef} />
        </div>
      </ScrollArea>

      <div className="border-t bg-background">
        {showExamples && <ChatExamples onSubmit={onSubmit} />}

        <form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            onSubmit(input);
          }}
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            rows={1}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            value={input}
            className="h-12 min-h-12 pt-3 resize-none border-none"
            placeholder="Ask Travelese a question..."
            onKeyDown={onKeyDown}
            onChange={(evt) => {
              setInput(evt.target.value);
            }}
          />
        </form>

        <ChatFooter
          onSubmit={() => onSubmit(input)}
          showFeedback={() => {/* Implement feedback logic */}}
        />
      </div>
    </div>
  );
}

