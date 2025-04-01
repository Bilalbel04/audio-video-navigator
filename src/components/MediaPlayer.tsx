
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MediaPlayerProps {
  mediaType: "video" | "audio";
  mediaPath: string | null;
}

const MediaPlayer = ({ mediaType, mediaPath }: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (!mediaRef.current) return;
    
    if (isPlaying) {
      mediaRef.current.pause();
    } else {
      mediaRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!mediaRef.current) return;
    
    const newVolume = value[0];
    setVolume(newVolume);
    mediaRef.current.volume = newVolume;
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (!mediaRef.current || !duration) return;
    
    const newTime = (value[0] / 100) * duration;
    setCurrentTime(newTime);
    mediaRef.current.currentTime = newTime;
  };

  const toggleMute = () => {
    if (!mediaRef.current) return;
    
    setIsMuted(!isMuted);
    mediaRef.current.muted = !isMuted;
  };

  useEffect(() => {
    if (!mediaRef.current || !mediaPath) return;
    
    const handleTimeUpdate = () => {
      if (!mediaRef.current) return;
      
      setCurrentTime(mediaRef.current.currentTime);
      setProgress((mediaRef.current.currentTime / duration) * 100);
    };
    
    const handleLoadedMetadata = () => {
      if (!mediaRef.current) return;
      
      setDuration(mediaRef.current.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
    
    mediaRef.current.addEventListener("timeupdate", handleTimeUpdate);
    mediaRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    mediaRef.current.addEventListener("ended", handleEnded);
    
    return () => {
      if (!mediaRef.current) return;
      
      mediaRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      mediaRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
      mediaRef.current.removeEventListener("ended", handleEnded);
    };
  }, [mediaRef.current, duration]);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    
    if (mediaRef.current && mediaPath) {
      mediaRef.current.src = mediaPath;
      mediaRef.current.volume = volume;
    }
  }, [mediaPath]);

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden bg-gray-800">
      <div className="relative flex-1 flex justify-center items-center bg-black">
        {!mediaPath ? (
          <div className="text-center text-gray-400">
            <p className="text-xl">Select a {mediaType} to play</p>
          </div>
        ) : mediaType === "video" ? (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            className="max-h-full max-w-full"
            playsInline
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-gray-700 flex items-center justify-center">
              <Music className="h-24 w-24 text-gray-400" />
            </div>
            <audio
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              className="hidden"
            />
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-800">
        <div className="flex items-center mb-2">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <div className="flex-1 mx-2">
            <Slider
              value={[progress]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="cursor-pointer"
            />
          </div>
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-200 hover:text-white"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className={cn("rounded-full", isPlaying ? "bg-purple-600" : "bg-white text-black")}
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-200 hover:text-white"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-200"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            
            <div className="w-24">
              <Slider
                value={[volume * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => handleVolumeChange([value[0] / 100])}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
