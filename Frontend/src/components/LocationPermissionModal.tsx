'use client'

import { MapPin, Search } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

interface LocationPermissionModalProps {
  isOpen: boolean
  onEnableLocation: () => void
  onSearchManually: () => void
}

export const LocationPermissionModal = ({
  isOpen,
  onEnableLocation,
  onSearchManually,
}: LocationPermissionModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enable Location Services</DialogTitle>
          <DialogDescription>
            To provide you with the best experience, we need access to your location. This helps us show nearby places and deliver to the right address.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button
            onClick={onEnableLocation}
            className="flex items-center gap-2"
            size="lg"
          >
            <MapPin className="w-5 h-5" />
            Enable Location
          </Button>
          <Button
            onClick={onSearchManually}
            variant="outline"
            className="flex items-center gap-2"
            size="lg"
          >
            <Search className="w-5 h-5" />
            Search Manually
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

