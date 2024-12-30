import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface MapControlsProps {
  onLocateMe: () => void;
}

export function MapControls({ onLocateMe }: MapControlsProps) {
  return (
    <Button
      className="w-full flex items-center justify-center gap-2"
      onClick={onLocateMe}
    >
      <MapPin className="h-4 w-4" />
      Locate Me
    </Button>
  );
}