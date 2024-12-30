import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, Briefcase, Users } from 'lucide-react';
import { AddressType } from '@/types/address';
import { cn } from '@/lib/utils';

interface AddressFormProps {
  onSubmit: (data: {
    type: AddressType;
    houseNumber: string;
    street: string;
    area: string;
  }) => void;
}

export function AddressForm({ onSubmit }: AddressFormProps) {
  const [addressType, setAddressType] = useState<AddressType>('home');
  const [formData, setFormData] = useState({
    houseNumber: '',
    street: '',
    area: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: addressType,
      ...formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-4">
        {[
          { type: 'home', icon: Home, label: 'Home' },
          { type: 'office', icon: Briefcase, label: 'Office' },
          { type: 'friends', icon: Users, label: 'Friends & Family' },
        ].map(({ type, icon: Icon, label }) => (
          <Button
            key={type}
            type="button"
            variant={addressType === type ? 'default' : 'outline'}
            className={cn(
              'flex-1 flex flex-col items-center gap-2 py-4',
              addressType === type && 'border-primary'
            )}
            onClick={() => setAddressType(type as AddressType)}
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm">{label}</span>
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="houseNumber">House/Flat/Block No.</Label>
          <Input
            id="houseNumber"
            value={formData.houseNumber}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, houseNumber: e.target.value }))
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="street">Street</Label>
          <Input
            id="street"
            value={formData.street}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, street: e.target.value }))
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="area">Apartment/Road/Area</Label>
          <Input
            id="area"
            value={formData.area}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, area: e.target.value }))
            }
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Address
      </Button>
    </form>
  );
}