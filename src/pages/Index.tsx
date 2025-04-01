
import { useState } from "react";
import MediaPlayer from "@/components/MediaPlayer";
import Sidebar from "@/components/Sidebar";
import VideoLibrary from "@/components/VideoLibrary";
import AudioLibrary from "@/components/AudioLibrary";

const Index = () => {
  const [mediaType, setMediaType] = useState<"video" | "audio">("video");
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);

  const handleMediaSelect = (mediaPath: string) => {
    setCurrentMedia(mediaPath);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar mediaType={mediaType} setMediaType={setMediaType} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
          <div className="w-full md:w-2/3 md:order-1 order-2">
            <MediaPlayer 
              mediaType={mediaType}
              mediaPath={currentMedia} 
            />
          </div>
          <div className="w-full md:w-1/3 overflow-y-auto md:order-2 order-1">
            {mediaType === "video" ? (
              <VideoLibrary onSelect={handleMediaSelect} currentMedia={currentMedia} />
            ) : (
              <AudioLibrary onSelect={handleMediaSelect} currentMedia={currentMedia} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
