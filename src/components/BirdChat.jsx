import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  askBird,
  getSiteDestination,
  parseBirdReply,
  SUGGESTED_QUESTIONS,
} from "../lib/birdAI";

const GREETING = {
  role: "assistant",
  content: "Hey! I'm Sushi 🐦 Het's bird. I know him and this site inside out, and I'm decent at everything else too. What do you want to know?",
};

const CHAT_STORAGE_KEY = "sushi-chat-v2";
const MAX_SAVED_MESSAGES = 25;
const ACTION_LINK_CLASS =
  "chat-action-link mt-2.5 inline-flex min-h-11 max-w-full items-center gap-2 self-start rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold leading-5 text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200";

const ChatActionLink = ({ action, onInternalNavigate }) => {
  if (!action) return null;

  const contents = (
    <>
      <span className="min-w-0 whitespace-normal break-words">{action.label}</span>
      <span className="shrink-0" aria-hidden="true">→</span>
    </>
  );

  if (action.kind === "internal") {
    return (
      <Link
        to={action.href}
        className={ACTION_LINK_CLASS}
        onClick={onInternalNavigate}
      >
        {contents}
      </Link>
    );
  }

  const opensNewTab = /^https?:/i.test(action.href);
  return (
    <a
      href={action.href}
      className={ACTION_LINK_CLASS}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noopener noreferrer" : undefined}
    >
      {contents}
    </a>
  );
};
const appendMessage = (messages, message) => [
  GREETING,
  ...[...messages.slice(1), message].slice(-MAX_SAVED_MESSAGES),
];

const loadSavedMessages = () => {
  if (typeof window === "undefined") return [GREETING];

  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(CHAT_STORAGE_KEY));
    if (!Array.isArray(parsed)) return [GREETING];

    const saved = parsed
      .filter(
        (message) =>
          message &&
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim()
      )
      .map((message) => {
        const destination = message.role === "assistant"
          ? getSiteDestination(message.action?.id || message.action?.href)
          : null;
        return {
          role: message.role,
          content: message.content,
          ...(destination
            ? {
                action: {
                  id: destination.id,
                  href: destination.href,
                  label: destination.label,
                  kind: destination.kind,
                },
              }
            : {}),
        };
      })
      .slice(-MAX_SAVED_MESSAGES);

    return saved.length ? [GREETING, ...saved] : [GREETING];
  } catch {
    return [GREETING];
  }
};

export const BirdChat = ({
  open,
  onClose,
  onPlayBird,
  variant = "corner",
  autoFocus = true,
}) => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const [messages, setMessages] = useState(loadSavedMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const isAnchored = variant === "anchored";

  useEffect(() => {
    try {
      window.sessionStorage.setItem(
        CHAT_STORAGE_KEY,
        JSON.stringify(messages.slice(1).slice(-MAX_SAVED_MESSAGES))
      );
    } catch {
      // Storage can be unavailable in strict privacy modes; chat still works in memory.
    }
  }, [messages]);

  useEffect(() => {
    if (open && autoFocus) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 350);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [autoFocus, open]);

  useEffect(() => {
    if (!open) return undefined;
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, open]);

  useEffect(() => {
    if (!open) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages, open, typing]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const history = messages
      .slice(1)
      .slice(-MAX_SAVED_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content }));
    setMessages((current) => appendMessage(current, { role: "user", content: trimmed }));
    setInput("");
    setTyping(true);
    try {
      const currentLocation = `${pathname}${hash}`;
      const reply = await askBird(trimmed, history, currentLocation);
      const parsedReply = parseBirdReply(reply, trimmed);
      setMessages((current) =>
        appendMessage(current, {
          role: "assistant",
          content: parsedReply.content || "Let me take you there. 🐦",
          ...(parsedReply.action ? { action: parsedReply.action } : {}),
        })
      );
      if (parsedReply.route) {
        navigate(parsedReply.route);
        onClose();
      }
    } finally {
      setTyping(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Chat with Sushi"
      className={`bird-chat-panel animate-fade-up ${
        isAnchored
          ? "fixed inset-x-3 bottom-3 z-40 max-h-[calc(100dvh-1.5rem)] w-auto sm:static sm:w-[min(36vw,360px)] sm:min-w-[300px]"
          : "fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] sm:w-[380px]"
      }`}
    >
      <div className="flex max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_30px_70px_-25px_rgba(0,114,255,0.55)] ring-1 ring-blue-100">
        {/* header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#00c6ff] to-[#0072ff] px-4 py-3 text-white">
          <div className="flex min-w-0 items-center gap-2">
            {onPlayBird ? (
              <button
                type="button"
                onClick={onPlayBird}
                aria-label="Play with Sushi"
                title="Play with Sushi"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 text-lg transition hover:rotate-6 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                🐦
              </button>
            ) : (
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-lg">🐦</span>
            )}
            <div className="min-w-0 leading-tight">
              <p className="font-poppins font-semibold">Sushi</p>
              <p className="truncate text-[11px] text-white/80">
                {onPlayBird ? "Het's bird · tap me to play" : "Het's bird · ask me anything"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white/90 transition hover:bg-white/20"
          >
            ✕
          </button>
        </div>

        {/* messages */}
        <div
          ref={scrollRef}
          aria-live="polite"
          aria-busy={typing}
          className={`flex min-h-[clamp(150px,28dvh,220px)] flex-col gap-3 overflow-y-auto bg-slate-50 px-4 py-4 ${
            isAnchored ? "max-h-[42dvh] sm:max-h-[320px]" : "max-h-[46dvh]"
          }`}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-[82%] flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`chat-bubble whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white"
                      : "rounded-bl-sm bg-white text-slate-700 shadow-sm ring-1 ring-slate-100"
                  }`}
                >
                  {m.content}
                </div>
                {m.role === "assistant" ? (
                  <ChatActionLink action={m.action} onInternalNavigate={onClose} />
                ) : null}
              </div>
            </div>
          ))}

          {typing ? (
            <div className="flex justify-start">
              <div className="chat-bubble flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 shadow-sm ring-1 ring-slate-100">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="chat-typing-dot h-2 w-2 rounded-full bg-blue-400/70"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {messages.length <= 1 && !typing ? (
            <div className="mt-1 flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="min-h-11 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-slate-100 bg-white px-3 py-3"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1200}
            placeholder="Ask Sushi anything…"
            aria-label="Ask Sushi anything"
            className="min-h-11 min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white sm:text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            aria-label="Send"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white transition hover:scale-105 disabled:opacity-40"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default BirdChat;
