import { clsx } from 'clsx';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search games...', className, inputClassName }: SearchBarProps) {
  return (
    <div className={clsx('relative', className)}>
      <Search className='absolute left-6 top-3 h-fit w-6 text-muted-foreground' aria-hidden='true' />
      <Input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx('pl-16 py-6 md:text-lg', inputClassName)}
        autoComplete='off'
      />
    </div>
  );
}
