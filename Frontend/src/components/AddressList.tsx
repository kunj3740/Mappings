'use client'

import { useState } from 'react';
import { MapPin, Edit, Trash2, Star } from 'lucide-react';
import { Address } from '../types/address';
import { addressService } from '../services/addressService';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AddressListProps {
  addresses: Address[];
  onAddressUpdated: () => void;
  onAddressDeleted: () => void;
}

export const AddressList = ({
  addresses,
  onAddressUpdated,
  onAddressDeleted
}: AddressListProps) => {
  const [deleteAddress, setDeleteAddress] = useState<Address | null>(null);

  const handleSetDefault = async (address: Address) => {
    try {
      await addressService.setDefaultAddress(address.id);
      onAddressUpdated();
      toast.success('Default address updated');
    } catch (error) {
      toast.error('Failed to update default address');
    }
  };

  const handleDelete = async (address: Address) => {
    try {
      await addressService.deleteAddress(address.id);
      onAddressDeleted();
      toast.success('Address deleted');
    } catch (error) {
      toast.error('Failed to delete address');
    }
    setDeleteAddress(null);
  };

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className={`p-4 rounded-lg border ${
            address.isDefault ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-teal-600 mt-1" />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{address.label}</h3>
                  {address.isDefault && (
                    <Star className="w-4 h-4 text-teal-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {address.street}
                  <br />
                  {address.city}, {address.state} {address.postalCode}
                  <br />
                  {address.country}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!address.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetDefault(address)}
                >
                  Set Default
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDeleteAddress(address)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <AlertDialog open={!!deleteAddress} onOpenChange={() => setDeleteAddress(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this address. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteAddress && handleDelete(deleteAddress)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

