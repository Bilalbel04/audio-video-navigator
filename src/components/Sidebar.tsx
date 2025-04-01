
import { Music, Video, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  mediaType: "video" | "audio";
  setMediaType: (type: "video" | "audio") => void;
}

const Sidebar = ({ mediaType, setMediaType }: SidebarProps) => {
  const { user, signOut } = useAuth();
  
  return (
    <div className="w-16 md:w-56 bg-gray-950 h-full flex flex-col shadow-xl">
      <div className="p-4 text-center text-xl font-bold hidden md:block">
        Media Player
      </div>
      
      {user && (
        <div className="px-4 py-2 hidden md:flex items-center gap-2 text-sm text-gray-300 border-b border-gray-800">
          <User className="h-4 w-4" />
          <span className="truncate">{user.email}</span>
        </div>
      )}
      
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
      
      <div className="p-2 border-t border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-gray-800"
          onClick={signOut}
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden md:inline">Cerrar Sesión</span>
        </Button>
      </div>
      
      <div className="p-4 text-xs text-gray-500 hidden md:block">
        Media Navigator v1.0
      </div>
    </div>
  );
};

export default Sidebar;
