
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search games...', className, inputClassName }: SearchBarProps) {
  return (
    <div className={cn('relative group', className)}>
      <div className='absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10group-hover:bg-primary/20 group-hover:text-primary transition-all duration-200 z-10'>
        <Search className='h-5 w-5' aria-hidden='true' />
      </div>
      <Input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'pl-14 pr-6 py-4 md:text-lg border-2 bg-background/50 backdrop-blur-sm hover:border-primary/30 focus:border-primary transition-all duration-200 placeholder:text-muted-foreground/60',
          inputClassName
        )}
        autoComplete='off'
      />
    </div>
  );
}
