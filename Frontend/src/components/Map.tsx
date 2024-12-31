'use client'

import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Button } from '@/components/ui/button'
import { MapPin, Loader2, Save } from 'lucide-react'
import { toast } from 'react-hot-toast'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const defaultCenter = {
  lat: 0,
  lng: 0
}

interface MapProps {
  onMapClick: (location: google.maps.LatLngLiteral) => void
  onSaveLocation: (location: google.maps.LatLngLiteral) => void
  initialLocation?: google.maps.LatLngLiteral | null
}

export const Map = ({ onMapClick, onSaveLocation, initialLocation }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(initialLocation || null)
  const [isLocating, setIsLocating] = useState(false)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(initialLocation || defaultCenter)
    map.fitBounds(bounds)
    setMap(map)
  }, [initialLocation])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const clickedLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      setMarker(clickedLocation)
      onMapClick(clickedLocation)
    }
  }

  const handleLocateMe = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setMarker(location)
          map?.panTo(location)
          map?.setZoom(17)
          onMapClick(location)
          setIsLocating(false)
        },
        (error) => {
          console.error('Error getting location:', error)
          toast.error('Could not get your location. Please try again.')
          setIsLocating(false)
        }
      )
    } else {
      toast.error('Geolocation is not supported by your browser')
      setIsLocating(false)
    }
  }

  const handleSaveLocation = () => {
    if (marker) {
      onSaveLocation(marker)
    } else {
      toast.error('Please select a location on the map first')
    }
  }

  return (
    <div className="relative">
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={marker || defaultCenter}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
            options={{
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }}
          >
            {marker && <Marker position={marker} draggable={true} onDragEnd={(e) => {
              if (e.latLng) {
                const newLocation = {
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng()
                }
                setMarker(newLocation)
                onMapClick(newLocation)
              }
            }} />}
          </GoogleMap>
          <div className="absolute top-4 right-4 z-10 space-y-2">
            <Button
              onClick={handleLocateMe}
              className="w-full"
              disabled={isLocating}
            >
              {isLocating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4 mr-2" />
              )}
              Locate Me
            </Button>
            <Button
              onClick={handleSaveLocation}
              className="w-full"
              disabled={!marker}
            >
              <Save className="w-4 h-4 mr-2" />
              Save This Location
            </Button>
          </div>
        </>
      ) : (
        <div className="h-[400px] flex items-center justify-center bg-gray-100">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}
    </div>
  )
}

