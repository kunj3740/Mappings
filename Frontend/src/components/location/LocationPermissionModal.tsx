import { MapPin, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface LocationPermissionModalProps {
  open: boolean;
  onEnableLocation: () => void;
  onSearchManually: () => void;
}

export function LocationPermissionModal({
  open,
  onEnableLocation,
  onSearchManually,
}: LocationPermissionModalProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Enable Location Services</DialogTitle>
          <DialogDescription className="text-center">
            To provide you with the best delivery experience, we need access to your location.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            className="flex items-center gap-2"
            onClick={onEnableLocation}
            variant="default"
          >
            <MapPin className="h-4 w-4" />
            Enable Location
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={onSearchManually}
            variant="outline"
          >
            <Search className="h-4 w-4" />
            Search Manually
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}