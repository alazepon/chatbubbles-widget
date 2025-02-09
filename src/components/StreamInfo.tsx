
import { useEffect, useState } from "react";

interface StreamerInfo {
  name: string;
  avatar: string;
  viewers: number;
}

export const StreamInfo = () => {
  const [streamerInfo, setStreamerInfo] = useState<StreamerInfo | null>(null);

  const fetchStreamerInfo = async () => {
    try {
      const response = await fetch("/streamInfo.json");
      const data = await response.json();
      setStreamerInfo(data);
    } catch (error) {
      console.error("Error fetching streamer info:", error);
    }
  };

  useEffect(() => {
    fetchStreamerInfo();
    const interval = setInterval(fetchStreamerInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!streamerInfo) return null;

  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-t-xl">
      <div className="flex items-center gap-3">
        <img
          src={streamerInfo.avatar}
          alt={streamerInfo.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
        />
        <div className="flex flex-col">
          <span className="text-white font-bold text-lg">{streamerInfo.name}</span>
          <span className="text-gray-400 text-sm">
            {streamerInfo.viewers.toLocaleString()} зрителей
          </span>
        </div>
      </div>
      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm font-medium transition-colors">
        Follow
      </button>
    </div>
  );
};
