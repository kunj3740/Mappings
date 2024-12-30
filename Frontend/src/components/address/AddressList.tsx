import { Address } from '@/types/address';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Briefcase, Users, MapPin, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddressListProps {
  addresses: Address[];
  onSelect: (address: Address) => void;
  onEdit: (address: Address) => void;
  onDelete: (addressId: string) => void;
}

export function AddressList({
  addresses,
  onSelect,
  onEdit,
  onDelete,
}: AddressListProps) {
  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'home':
        return Home;
      case 'office':
        return Briefcase;
      default:
        return Users;
    }
  };

  return (
    <div className="space-y-4">
      {addresses.map((address) => {
        const Icon = getIcon(address.label);
        return (
          <Card
            key={address.id}
            className={cn(
              'cursor-pointer hover:border-primary transition-colors',
              address.isDefault && 'border-primary'
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-1" />
                  <div>
                    <h3 className="font-medium">{address.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {address.street}, {address.city}
                    </p>
                    {address.state && (
                      <p className="text-sm text-muted-foreground">
                        {address.state}, {address.country}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(address)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(address.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => onSelect(address)}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Deliver Here
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}