import { getRarityConfig } from '../../utils/rarity';
import type { Monster } from '../../api/queries/useFetchAllMonsters';

interface RarityIndicatorProps {
  monster: Monster;
  size?: 'small' | 'medium' | 'large';
}

export function RarityIndicator({ monster, size = 'medium' }: RarityIndicatorProps) {
  const rarityConfig = getRarityConfig(monster);
  
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1.5',
    large: 'text-base px-4 py-2'
  };

  return (
    <div className="flex items-center gap-2">
      <div 
        className={`${sizeClasses[size]} font-bold rounded-lg bg-gradient-to-r ${rarityConfig.badgeGradient} text-white shadow-lg flex items-center gap-1`}
        style={{
          boxShadow: `0 4px 12px ${rarityConfig.glowColor}`
        }}
      >
        <span>{rarityConfig.label}</span>
      </div>
      
    </div>
  );
}
