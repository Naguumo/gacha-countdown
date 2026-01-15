import { ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface FilterOption<V extends string> {
  label: string;
  value: V;
  count?: number;
}

interface FilterGroupProps<V extends string> {
  title: string;
  options: FilterOption<V>[];
  selectedValues: V[];
  onChange: (values: V[]) => void;
  initiallyOpen?: boolean;
  className?: string;
}

export function FilterGroup<V extends string>({ title, options, selectedValues, onChange, className, initiallyOpen = true }: FilterGroupProps<V>) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const handleToggle = (value: V) => {
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
      <AnimatePresence initial={false} propagate presenceAffectsLayout mode='wait'>
        {isOpen && (
          <motion.div
            className='overflow-hidden'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={{
              hidden: {
                maxHeight: '0',
                opacity: 0,
              },
              visible: {
                maxHeight: '500px',
                opacity: 1,
              },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            layout>
            <CardContent className='pt-0'>
              <fieldset>
                <legend className='sr-only'>{title}</legend>
                <div className='space-y-1'>
                  {options.map((option, index) => (
                    <motion.label
                      key={option.value}
                      htmlFor={`filter-${option.value}`}
                      className='flex items-center cursor-pointer hover:bg-muted/50 p-3 rounded-md duration-200 hover:translate-x-1 group'
                      variants={{
                        hidden: { opacity: 0, translateY: -10 },
                        visible: { opacity: 1, translateY: 0 },
                      }}
                      transition={{
                        duration: 0.2,
                        ease: 'easeOut',
                        delay: index * 0.05,
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
                    </motion.label>
                  ))}
                </div>
              </fieldset>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
