import type { GamePlatform } from '@/schemas/gachaGames';
import { cleanEnumForDisplay } from './cleanEnum';

export function formatGamePlatform(platform: GamePlatform) {
  if (platform === 'ios') return 'IOS';
  if (platform === 'pc') return 'PC';
  return cleanEnumForDisplay(platform);
}
