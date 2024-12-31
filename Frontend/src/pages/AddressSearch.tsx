'use client'

import { useState, useEffect } from 'react'
import { Loader2, Plus, Search } from 'lucide-react'
import { Map } from '../components/Map'
import { AddressForm } from '../components/AddressForm'
import { AddressList } from '../components/AddressList'
import { LocationPermissionModal } from '../components/LocationPermissionModal'
import { addressService } from '../services/addressService'
import { Address, AddressInput } from '../types/address'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'

export const AddressSearch = () => {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    loadAddresses()
    // Check user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    }
  }, [])

  const loadAddresses = async () => {
    try {
      const data = await addressService.getAllAddresses()
      setAddresses(data)
    } catch (error) {
      toast.error('Failed to load addresses')
    } finally {
      setLoading(false)
    }
  }

  const handleEnableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setSelectedLocation(location)
          setShowLocationModal(false)
        },
        (error) => {
          console.error('Error getting location:', error)
          toast.error('Could not get your location. Please try searching manually.')
        }
      )
    } else {
      toast.error('Geolocation is not supported by your browser')
    }
  }

  const handleSearchManually = () => {
    setShowLocationModal(false)
  }

  const handleMapClick = (location: google.maps.LatLngLiteral) => {
    setSelectedLocation(location)
  }

  const handleSaveLocation = async (location: google.maps.LatLngLiteral) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`)
      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components
        const formattedAddress = data.results[0].formatted_address

        const getAddressComponent = (type: string) => {
          const component = addressComponents.find((component: any) => component.types.includes(type))
          return component ? component.long_name : ''
        }

        const newAddress: AddressInput = {
          label: 'Custom Location',
          street: getAddressComponent('route') || formattedAddress,
          city: getAddressComponent('locality') || getAddressComponent('administrative_area_level_2'),
          state: getAddressComponent('administrative_area_level_1'),
          country: getAddressComponent('country'),
          postalCode: getAddressComponent('postal_code'),
          latitude: location.lat,
          longitude: location.lng,
          isDefault: false
        }

        await addressService.createAddress(newAddress)
        toast.success('Address saved successfully')
        loadAddresses()
      } else {
        toast.error('Could not retrieve address information for this location')
      }
    } catch (error) {
      console.error('Error saving address:', error)
      toast.error('Failed to save address')
    }
  }

  const handleAddressCreated = () => {
    loadAddresses()
    setShowForm(false)
    setSelectedLocation(null)
  }

  const filteredAddresses = addresses.filter(address => 
    address.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
    address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    address.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="container mx-auto px-4 py-8">
        <LocationPermissionModal
          isOpen={showLocationModal}
          onEnableLocation={handleEnableLocation}
          onSearchManually={handleSearchManually}
        />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Addresses</h1>
          <div className="flex items-center gap-4">
            <Button onClick={toggleDarkMode} variant="outline" className="flex items-center gap-2">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Address
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search saved addresses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className={`rounded-lg shadow-md p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <Map 
                onMapClick={handleMapClick} 
                onSaveLocation={handleSaveLocation}
                initialLocation={selectedLocation} 
              />
            </div>
            {showForm && (
              <div className={`rounded-lg shadow-md p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <AddressForm
                  selectedLocation={selectedLocation}
                  onSuccess={handleAddressCreated}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}
          </div>
          <div className={`rounded-lg shadow-md p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <AddressList
              addresses={filteredAddresses}
              onAddressUpdated={loadAddresses}
              onAddressDeleted={loadAddresses}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

