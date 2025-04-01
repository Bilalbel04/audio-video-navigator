
import { useState, useEffect } from "react";
import { Loader, Video } from "lucide-react";

interface VideoLibraryProps {
  onSelect: (path: string) => void;
  currentMedia: string | null;
}

interface VideoItem {
  id: number;
  title: string;
  path: string;
  thumbnail?: string;
}

// Sample video data - this would normally come from an API
const sampleVideos: VideoItem[] = [
  { id: 1, title: "Introduction", path: "/plc/videos/intro.mp4" },
  { id: 2, title: "Tutorial: Getting Started", path: "/plc/videos/tutorial.mp4" },
  { id: 3, title: "Product Demo", path: "/plc/videos/demo.mp4" },
  { id: 4, title: "Behind the Scenes", path: "/plc/videos/bts.mp4" },
  { id: 5, title: "Customer Testimonials", path: "/plc/videos/testimonials.mp4" },
];

const VideoLibrary = ({ onSelect, currentMedia }: VideoLibraryProps) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading videos from an API
    const loadVideos = async () => {
      setLoading(true);
      // In a real app, fetch videos from an API
      setTimeout(() => {
        setVideos(sampleVideos);
        setLoading(false);
      }, 800);
    };

    loadVideos();
  }, []);

  return (
    <div className="h-full bg-gray-850 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Video Library</h2>
      </div>
      
      <div className="overflow-y-auto p-2" style={{ maxHeight: "calc(100% - 60px)" }}>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  currentMedia === video.path
                    ? "bg-purple-900/50 border-l-4 border-purple-500"
                    : "hover:bg-gray-800 border-l-4 border-transparent"
                }`}
                onClick={() => onSelect(video.path)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 bg-gray-700 flex items-center justify-center rounded">
                    <Video className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{video.title}</h3>
                    <p className="text-xs text-gray-400">Video</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No videos found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLibrary;
