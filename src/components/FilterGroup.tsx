import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  initiallyOpen?: boolean;
  className?: string;
}

export function FilterGroup({ title, options, selectedValues, onChange, className, initiallyOpen = true }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const handleToggle = (value: string) => {
    const newValues = selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <Card className={cn('border-0 bg-linear-to-br from-card to-card/50 backdrop-blur-sm', className)}>
      <CardHeader
        className='cursor-pointer flex items-center justify-between px-4 hover:bg-muted/30 transition-all duration-200 rounded-t-lg group'
        onClick={() => setIsOpen(!isOpen)}>
        <CardTitle className='md:text-lg font-semibold group-hover:text-primary transition-colors duration-200'>{title}</CardTitle>
        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-200'>
          {isOpen ? (
            <ChevronUp className='h-4 w-4 transition-transform duration-300 ease-in-out' />
          ) : (
            <ChevronDown className='h-4 w-4 transition-transform duration-300 ease-in-out' />
          )}
        </div>
      </CardHeader>
      <div
        className='transition-all duration-300 ease-in-out overflow-hidden'
        style={{
          maxHeight: isOpen ? '500px' : '0',
          opacity: isOpen ? 1 : 0,
        }}>
        <CardContent className='pt-0'>
          <fieldset>
            <legend className='sr-only'>{title}</legend>
            <div className='space-y-1'>
              {options.map((option, index) => (
                <label
                  key={option.value}
                  htmlFor={`filter-${option.value}`}
                  className='flex items-center cursor-pointer hover:bg-muted/50 p-3 rounded-md transition-all duration-200 hover:translate-x-1 group opacity-0'
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                    transition: `all 0.2s ease-out ${index * 0.05}s`,
                  }}>
                  <Checkbox
                    id={`filter-${option.value}`}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={() => handleToggle(option.value)}
                    className='mr-3 data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                  />
                  <span className='flex-1 font-medium group-hover:text-foreground transition-colors duration-200'>{option.label}</span>
                  {option.count !== undefined && (
                    <span className='text-muted-foreground text-sm bg-muted/50 px-2 py-1 rounded-full group-hover:bg-muted/70 transition-colors duration-200'>
                      {option.count}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </fieldset>
        </CardContent>
      </div>
    </Card>
  );
}
