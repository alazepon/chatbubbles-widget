
import { useEffect, useState, useRef } from "react";
import { Message } from "./Message";

interface MessageType {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
}

export const ChatWidget = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/messages.json");
      const data = await response.json();
      setMessages(data.messages);
      
      // Прокрутка к последнему сообщению
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 100);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    
    // Обновление каждые 5 секунд
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto h-[600px] bg-white rounded-xl shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Чат</h2>
      </div>
      
      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto p-2 space-y-2 scroll-smooth"
      >
        {messages.map((message) => (
          <Message
            key={message.id}
            user={message.user}
            text={message.text}
            timestamp={message.timestamp}
          />
        ))}
      </div>
    </div>
  );
};
