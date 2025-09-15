import BUG from '../../assets/monsterTypes/bug.svg';
import FIRE from '../../assets/monsterTypes/fire.svg';
import WATER from '../../assets/monsterTypes/water.svg';
import GRASS from '../../assets/monsterTypes/grass.svg';
import ELECTRIC from '../../assets/monsterTypes/electric.svg';
import ICE from '../../assets/monsterTypes/ice.svg';
import DRAGON from '../../assets/monsterTypes/dragon.svg';
import DARK from '../../assets/monsterTypes/dark.svg';
import FAIRY from '../../assets/monsterTypes/fairy.svg';
import NORMAL from '../../assets/monsterTypes/normal.svg';
import FIGHTING from '../../assets/monsterTypes/fighting.svg';
import POISON from '../../assets/monsterTypes/poison.svg';
import GROUND from '../../assets/monsterTypes/ground.svg';
import FLYING from '../../assets/monsterTypes/flying.svg';
import PSYCHIC from '../../assets/monsterTypes/psychic.svg';
import ROCK from '../../assets/monsterTypes/rock.svg';
import GHOST from '../../assets/monsterTypes/ghost.svg';
import STEEL from '../../assets/monsterTypes/steel.svg';
import type { MonsterType } from '../../@types/monster';

interface LabelTypeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    monsterType:  MonsterType;
    selected?: boolean;
    className?: string;
}

const typeIcons = {
    NORMAL: NORMAL,
    BUG: BUG,
    FIRE: FIRE,
    WATER: WATER,
    GRASS: GRASS,
    ELECTRIC: ELECTRIC,
    ICE: ICE,
    FIGHTING: FIGHTING,
    POISON: POISON,
    GROUND: GROUND,
    FLYING: FLYING,
    PSYCHIC: PSYCHIC,
    ROCK: ROCK,
    GHOST: GHOST,
    DRAGON: DRAGON,
    DARK: DARK,
    STEEL: STEEL,
    FAIRY: FAIRY
};

const typeStyles = {
    NORMAL: {
        bg: 'bg-type-normal',
        hoverText: 'hover:border-type-normal'
    },
    BUG: {
        bg: 'bg-type-bug',
        hoverText: 'hover:border-type-bug'
    },
    FIRE: {
        bg: 'bg-type-fire',
        hoverText: 'hover:border-type-fire'
    },
    WATER: {
        bg: 'bg-type-water',
        hoverText: 'hover:border-type-water'
    },
    GRASS: {
        bg: 'bg-type-grass',
        hoverText: 'hover:border-type-grass'
    },
    ELECTRIC: {
        bg: 'bg-type-electric',
        hoverText: 'hover:border-type-electric'
    },
    ICE: {
        bg: 'bg-type-ice',
        hoverText: 'hover:border-type-ice'
    },
    FIGHTING: {
        bg: 'bg-type-fighting',
        hoverText: 'hover:border-type-fighting'
    },
    POISON: {
        bg: 'bg-type-poison',
        hoverText: 'hover:border-type-poison'
    },
    GROUND: {
        bg: 'bg-type-ground',
        hoverText: 'hover:border-type-ground'
    },
    FLYING: {
        bg: 'bg-type-flying',
        hoverText: 'hover:border-type-flying'
    },
    PSYCHIC: {
        bg: 'bg-type-psychic',
        hoverText: 'hover:border-type-psychic'
    },
    ROCK: {
        bg: 'bg-type-rock',
        hoverText: 'hover:border-type-rock'
    },
    GHOST: {
        bg: 'bg-type-ghost',
        hoverText: 'hover:border-type-ghost'
    },
    DRAGON: {
        bg: 'bg-type-dragon',
        hoverText: 'hover:border-type-dragon'
    },
    DARK: {
        bg: 'bg-type-dark',
        hoverText: 'hover:border-type-dark'
    },
    STEEL: {
        bg: 'bg-type-steel',
        hoverText: 'hover:border-type-steel'
    },
    FAIRY: {
        bg: 'bg-type-fairy',
        hoverText: 'hover:border-type-fairy'
    }
};

export function LabelType({ monsterType, className, selected = false, ...rest }: LabelTypeProps) {

    return (
        <button type='button' className={`flex items-center justify-center gap-2 px-2 py-1 rounded-lg ${typeStyles[monsterType].bg} text-white ${typeStyles[monsterType].hoverText} ${selected ? 'brightness-100' : 'brightness-50'} cursor-pointer ${className}`} {...rest}>
            <img src={typeIcons[monsterType]} alt={monsterType} className="w-4 h-4 " />
            <p>{monsterType.charAt(0).toUpperCase() + monsterType.toLowerCase().slice(1)}</p>
        </button>
    )
}