import { clsx } from 'clsx';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search games...', className }: SearchBarProps) {
  return (
    <div className={clsx('relative', className)}>
      <Search className='absolute left-3 top-2 h-5 w-5 text-muted-foreground' aria-hidden='true' />
      <Input type='text' value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className='pl-10' />
    </div>
  );
}
