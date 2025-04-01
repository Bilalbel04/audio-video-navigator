
import { Music, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  mediaType: "video" | "audio";
  setMediaType: (type: "video" | "audio") => void;
}

const Sidebar = ({ mediaType, setMediaType }: SidebarProps) => {
  return (
    <div className="w-16 md:w-56 bg-gray-950 h-full flex flex-col shadow-xl">
      <div className="p-4 text-center text-xl font-bold hidden md:block">
        Media Player
      </div>
      
      <nav className="flex-1 py-8">
        <ul className="space-y-2 px-2">
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 py-6",
                mediaType === "video" && "bg-gray-800"
              )}
              onClick={() => setMediaType("video")}
            >
              <Video className="h-5 w-5" />
              <span className="hidden md:inline">Videos</span>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 py-6",
                mediaType === "audio" && "bg-gray-800"
              )}
              onClick={() => setMediaType("audio")}
            >
              <Music className="h-5 w-5" />
              <span className="hidden md:inline">Audio</span>
            </Button>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 text-xs text-gray-500 hidden md:block">
        Media Navigator v1.0
      </div>
    </div>
  );
};

export default Sidebar;
