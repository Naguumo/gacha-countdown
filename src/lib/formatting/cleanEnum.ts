interface CleanEnumOptions {
  strategy: 'capitalize' | 'lowercase' | 'uppercase';
  replaceUnderscores: boolean;
}

export function cleanEnumForDisplay(e: string, options?: Partial<CleanEnumOptions>): string {
  const mergedOptions: CleanEnumOptions = {
    strategy: 'capitalize',
    replaceUnderscores: true,
    ...options,
  };

  let result = e;

  if (mergedOptions.replaceUnderscores) {
    result = result.replace(/_/g, ' ');
  }

  switch (mergedOptions.strategy) {
    case 'capitalize':
      result = result.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
      break;
    case 'lowercase':
      result = result.toLowerCase();
      break;
    case 'uppercase':
      result = result.toUpperCase();
      break;
  }

  return result;
}
