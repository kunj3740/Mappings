import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface SearchResultsProps {
  results: google.maps.places.PlaceResult[];
  onSelect: (place: google.maps.places.PlaceResult) => void;
}

export function SearchResults({ results, onSelect }: SearchResultsProps) {
  if (!results.length) return null;

  return (
    <Card className="absolute top-full left-0 right-0 z-10 mt-1">
      <CardContent className="p-2">
        <div className="space-y-1">
          {results.map((place) => (
            <button
              key={place.place_id}
              className="w-full flex items-center gap-2 p-2 hover:bg-accent rounded-md text-left"
              onClick={() => onSelect(place)}
            >
              <MapPin className="h-4 w-4 shrink-0" />
              <div className="truncate">
                <div className="font-medium">{place.name}</div>
                <div className="text-sm text-muted-foreground truncate">
                  {place.formatted_address}
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}