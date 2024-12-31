'use client'

import { useState } from 'react'
import { Home, Briefcase, Users, MapPin } from 'lucide-react'
import { addressService } from '../services/addressService'
import { AddressInput } from '../types/address'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'react-hot-toast'

interface CategoryOption {
  id: string
  label: string
  icon: React.ReactNode
}

const categories: CategoryOption[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-6 h-6" /> },
  { id: 'office', label: 'Office', icon: <Briefcase className="w-6 h-6" /> },
  { id: 'friends', label: 'Friends & Family', icon: <Users className="w-6 h-6" /> },
  { id: 'other', label: 'Other', icon: <MapPin className="w-6 h-6" /> },
]

interface AddressFormProps {
  selectedLocation: google.maps.LatLngLiteral | null
  initialData?: AddressInput
  onSuccess: () => void
  onCancel: () => void
}

export const AddressForm = ({
  selectedLocation,
  initialData,
  onSuccess,
  onCancel
}: AddressFormProps) => {
  const [formData, setFormData] = useState<AddressInput>(
    initialData || {
      label: '',
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      latitude: selectedLocation?.lat || 0,
      longitude: selectedLocation?.lng || 0,
      isDefault: false
    }
  )
  const [selectedCategory, setSelectedCategory] = useState(initialData?.label || 'home')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const addressData = {
        ...formData,
        label: selectedCategory
      }
      
      if (initialData) {
        //@ts-ignore
        await addressService.updateAddress(initialData.id, addressData)
        toast.success('Address updated successfully')
      } else {
        await addressService.createAddress(addressData)
        toast.success('Address created successfully')
      }
      onSuccess()
    } catch (error) {
      toast.error('Failed to save address')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
              selectedCategory === category.id
                ? 'border-teal-600 bg-teal-50 text-teal-600'
                : 'border-gray-200 hover:border-teal-600'
            }`}
          >
            {category.icon}
            <span className="text-sm font-medium">{category.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="street">House/Flat/Block No.</Label>
          <Input
            id="street"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            placeholder="Enter house/flat/block number"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">Apartment/Road/Area</Label>
          <Input
            id="area"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Enter apartment, road or area"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              placeholder="State"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">PIN Code</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              placeholder="PIN Code"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isDefault"
            checked={formData.isDefault}
            onCheckedChange={(checked) => setFormData({ ...formData, isDefault: checked })}
          />
          <Label htmlFor="isDefault">Set as default address</Label>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update' : 'Save'} Address
          </Button>
        </div>
      </div>
    </form>
  )
}

