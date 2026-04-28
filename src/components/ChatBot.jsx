import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const SUGGESTIONS = [
  'What projects has Heshan built?',
  'What are his main skills?',
  'How can I contact Heshan?',
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Heshan's AI assistant. Ask me anything about his work, projects, or skills.",
    },
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text) {
    const userText = text ?? input.trim();
    if (!userText || streaming) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setStreaming(true);

    const placeholder = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, placeholder]);

    try {
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const base = import.meta.env.VITE_API_URL ?? '';
      const res = await fetch(`${base}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6);
          if (raw === '[DONE]') break;
          try {
            const { text, error } = JSON.parse(raw);
            if (error) throw new Error(error);
            if (text) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: updated[updated.length - 1].content + text,
                };
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Make sure the server is running and ANTHROPIC_API_KEY is set.',
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const showSuggestions = messages.length === 1;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[var(--accent)] text-[var(--on-accent)] flex items-center justify-center shadow-lg hover:bg-[var(--accent-hover)] transition-all duration-300 hover:scale-110"
        aria-label="Toggle chat"
      >
        {open ? <FaTimes size={18} /> : <FaRobot size={20} />}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-28 right-8 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl border border-[#1e1e1e] bg-[#111] shadow-2xl transition-all duration-300 origin-bottom-right ${
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ height: '480px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1e1e1e]">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <FaRobot size={14} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-medium text-white">Heshan's Assistant</div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-xs text-[#555]">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-thin">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-white text-[#0a0a0a] rounded-br-sm'
                    : 'bg-[#1a1a1a] text-[#ccc] border border-[#222] rounded-bl-sm'
                }`}
              >
                {msg.content || (
                  <span className="flex gap-1 items-center py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#555] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#555] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#555] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Suggestion chips */}
          {showSuggestions && (
            <div className="flex flex-col gap-2 mt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-xs text-[#666] border border-[#1e1e1e] rounded-xl px-3 py-2 hover:border-[#444] hover:text-[#aaa] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-[#1e1e1e] flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={streaming}
            placeholder="Ask something..."
            className="flex-1 bg-transparent text-sm text-white placeholder-[#444] outline-none py-1"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || streaming}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-[#0a0a0a] disabled:opacity-20 hover:bg-[#e0e0e0] transition-all disabled:cursor-not-allowed"
            aria-label="Send"
          >
            <FaPaperPlane size={12} />
          </button>
        </div>
      </div>
    </>
  );
}
