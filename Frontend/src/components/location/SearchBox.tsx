import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  loading?: boolean;
}

export function SearchBox({ value, onChange, onSearch, loading }: SearchBoxProps) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search for a location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1"
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={onSearch}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className={cn("h-4 w-4", loading && "animate-spin")} />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}