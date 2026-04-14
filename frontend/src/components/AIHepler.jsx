import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../context/userContext";
import { Bot, User as UserIcon, Send, Sparkles, Trash2 } from "lucide-react";

export default function AIHelper() {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([
    { id: 0, role: "assistant", text: "Hi! I am your AI Interview Assistant. How can I help you prepare today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const endRef = useRef(null);

  function scrollToBottom() {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function addMessage(role, text) {
    setMessages((m) => [...m, { id: Date.now() + Math.random(), role, text }]);
    setTimeout(scrollToBottom, 50);
  }

  async function callApi(prompt, onProgress) {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/generate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || `Status ${res.status}`);
    }

    if (res.body && typeof res.body.getReader === "function") {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulated = "";

      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          accumulated += chunk;
          onProgress(chunk, accumulated);
        }
      }
      return accumulated;
    }

    const data = await res.json();
    return data.text || "No response.";
  }

  async function handleSend(e) {
    e?.preventDefault();
    const prompt = input.trim();
    if (!prompt || loading) return;

    setError(null);
    setInput("");
    addMessage("user", prompt);

    const placeholderId = Date.now() + Math.random();
    setMessages((m) => [
      ...m,
      { id: placeholderId, role: "assistant", text: "..." },
    ]);
    setLoading(true);

    try {
      let lastText = "";
      const onProgress = (chunk, accumulated) => {
        lastText = accumulated;
        setMessages((cur) =>
          cur.map((msg) =>
            msg.id === placeholderId ? { ...msg, text: lastText } : msg
          )
        );
      };

      const full = await callApi(prompt, onProgress);

      let displayText = lastText || full || "(no response)";
      if (
        typeof displayText === "string" &&
        displayText.startsWith("{") &&
        displayText.endsWith("}")
      ) {
        try {
          const parsed = JSON.parse(displayText);
          displayText = parsed.text || displayText;
        } catch {}
      }

      setMessages((cur) =>
        cur.map((msg) =>
          msg.id === placeholderId ? { ...msg, text: displayText } : msg
        )
      );
    } catch (err) {
      setError(err.message || "Something went wrong");
      setMessages((cur) =>
        cur.map((msg) =>
          msg.id === placeholderId
            ? { ...msg, text: "Error: " + (err.message || "Failed") }
            : msg
        )
      );
    } finally {
      setLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  function clearChat() {
    setMessages([
      { id: Date.now(), role: "assistant", text: "Hi! I am your AI Interview Assistant. How can I help you prepare today?" },
    ]);
    setError(null);
  }

  return (
    <div className="h-screen bg-[var(--color-background)] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#0b1120] text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300 overflow-hidden">
      {/* Removed local Navbar */}
      
      <div className="flex-1 flex flex-col w-full relative z-10 overflow-hidden">
        
        {/* Sleek Header */}
        <header className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-transparent backdrop-blur-md transition-colors duration-300">
          {/* Left: hero text */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[15px] font-bold text-gray-900 dark:text-white leading-none mb-0.5">AI Assistant</h1>
              <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Powered by Gemini</span>
            </div>
          </div>

          {/* Right: clear button */}
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 text-[13px] px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-500/10 dark:hover:text-red-400 dark:hover:border-red-500/20 text-gray-600 dark:text-gray-400 font-medium transition-all duration-200"
            title="Clear chat"
          >
            <Trash2 size={15} />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto scroll-smooth px-4 py-6 md:px-0">
          <div className="space-y-6 max-w-3xl mx-auto pb-2">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[85%] md:max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                    
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 outline outline-2 outline-offset-2 ${
                      isUser 
                        ? "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 outline-white dark:outline-[#0b1120]" 
                        : "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 outline-white dark:outline-[#0b1120]"
                    }`}>
                      {isUser ? <UserIcon size={16} strokeWidth={2.5} /> : <Bot size={18} strokeWidth={2} />}
                    </div>
                    
                    {/* Bubble */}
                    <div className={`relative px-4 py-3 shadow-sm ${
                      isUser 
                        ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-2xl rounded-tr-sm" 
                        : "bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm"
                    }`}>
                      {m.text === "..." ? (
                        <div className="flex gap-1 items-center h-6 px-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                        </div>
                      ) : (
                        <div className={`text-[15px] leading-relaxed whitespace-pre-wrap ${isUser ? "font-medium" : "prose prose-sm dark:prose-invert max-w-none break-words"}`}>
                          {m.text}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={endRef} className="h-4" />
          </div>
        </main>

        {/* Input Area */}
        <div className="shrink-0 p-4 md:px-6 md:pb-8 bg-gradient-to-t from-white via-white to-transparent dark:from-[#0b1120] dark:via-[#0b1120] dark:to-transparent pt-10">
          <form
            onSubmit={handleSend}
            className="max-w-3xl mx-auto relative"
          >
            <div className="flex items-end gap-2 p-2 bg-white dark:bg-[#151c2f] border border-gray-200 dark:border-white/10 rounded-[28px] shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-violet-500/40">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={Math.min(Math.max(input.split('\n').length, 1), 7)}
                placeholder="Message AI Assistant..."
                className="flex-1 max-h-40 min-h-[44px] py-3.5 px-5 resize-none bg-transparent text-[15px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10"
              />
              
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`flex-shrink-0 w-[42px] h-[42px] rounded-full flex items-center justify-center transition-all duration-200 mb-[4px] mr-[4px] ${
                  input.trim() && !loading
                    ? "bg-violet-600 hover:bg-violet-700 text-white shadow-md hover:shadow-lg hover:scale-105"
                    : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                }`}
              >
                <Send size={18} className={input.trim() && !loading ? "ml-[2px] mt-[2px]" : "ml-[2px] mt-[2px]"} />
              </button>
            </div>
            {error && (
              <p className="absolute -bottom-6 left-5 text-xs font-medium text-red-500 dark:text-red-400">{error}</p>
            )}
            
            <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 mt-4 font-medium tracking-wide">
              AI Assistant can make mistakes. Consider verifying important information.
            </p>
          </form>
        </div>
        
      </div>
    </div>
  );
}
