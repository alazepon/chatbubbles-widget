
import { cn } from "@/lib/utils";

interface MessageProps {
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
}

export const Message = ({ user, text, timestamp }: MessageProps) => {
  return (
    <div className="flex items-start gap-3 px-4 py-2 animate-message-appear">
      <div className="flex-shrink-0">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
          loading="lazy"
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-purple-100">
            {user.name}
          </span>
          <div className="mt-1 bg-gray-800/50 rounded-2xl p-3 inline-block max-w-[80%]">
            <p className="text-gray-100 text-sm leading-relaxed">{text}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {new Date(timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
