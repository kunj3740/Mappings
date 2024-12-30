import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface MapErrorBoundaryProps {
  error?: string;
}

export function MapErrorBoundary({ error }: MapErrorBoundaryProps) {
  const getErrorMessage = () => {
    if (error?.includes('BillingNotEnabled')) {
      return 'Google Maps billing is not enabled. Please enable billing in your Google Cloud Console.';
    }
    if (error?.includes('InvalidKey')) {
      return 'Invalid Google Maps API key. Please check your API key configuration.';
    }
    return 'An error occurred while loading the map. Please try again later.';
  };

  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>{getErrorMessage()}</AlertDescription>
    </Alert>
  );
}