import { useState, useCallback } from 'react';
import { searchPlaces } from '@/lib/maps';
import { useToast } from '@/hooks/use-toast';

export function usePlacesSearch() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
  const { toast } = useToast();

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const places = await searchPlaces(query);
      setResults(places);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to search locations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return { search, loading, results };
}