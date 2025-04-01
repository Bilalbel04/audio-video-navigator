
import { useState, useEffect } from "react";
import { Loader, Music } from "lucide-react";

interface AudioLibraryProps {
  onSelect: (path: string) => void;
  currentMedia: string | null;
}

interface AudioItem {
  id: number;
  title: string;
  artist?: string;
  path: string;
  coverArt?: string;
}

// Sample audio data - this would normally come from an API
const sampleAudios: AudioItem[] = [
  { id: 1, title: "Summer Vibes", artist: "Chill Beats", path: "/plc/audios/summer_vibes.mp3" },
  { id: 2, title: "Deep Focus", artist: "Study Music", path: "/plc/audios/deep_focus.mp3" },
  { id: 3, title: "Ambient Sounds", artist: "Nature Calls", path: "/plc/audios/ambient.mp3" },
  { id: 4, title: "Acoustic Session", artist: "Guitar Solo", path: "/plc/audios/acoustic.mp3" },
  { id: 5, title: "Electronic Dreams", artist: "Synth Wave", path: "/plc/audios/electronic.mp3" },
];

const AudioLibrary = ({ onSelect, currentMedia }: AudioLibraryProps) => {
  const [audios, setAudios] = useState<AudioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading audios from an API
    const loadAudios = async () => {
      setLoading(true);
      // In a real app, fetch audios from an API
      setTimeout(() => {
        setAudios(sampleAudios);
        setLoading(false);
      }, 800);
    };

    loadAudios();
  }, []);

  return (
    <div className="h-full bg-gray-850 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Audio Library</h2>
      </div>
      
      <div className="overflow-y-auto p-2" style={{ maxHeight: "calc(100% - 60px)" }}>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : audios.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {audios.map((audio) => (
              <div
                key={audio.id}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  currentMedia === audio.path
                    ? "bg-purple-900/50 border-l-4 border-purple-500"
                    : "hover:bg-gray-800 border-l-4 border-transparent"
                }`}
                onClick={() => onSelect(audio.path)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-700 flex items-center justify-center rounded-full">
                    <Music className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{audio.title}</h3>
                    {audio.artist && (
                      <p className="text-xs text-gray-400">{audio.artist}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No audio files found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioLibrary;
