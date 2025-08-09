import bug from '../../assets/monsterTypes/bug.svg';
import fire from '../../assets/monsterTypes/fire.svg';
import water from '../../assets/monsterTypes/water.svg';
import grass from '../../assets/monsterTypes/grass.svg';
import electric from '../../assets/monsterTypes/electric.svg';
import ice from '../../assets/monsterTypes/ice.svg';
import dragon from '../../assets/monsterTypes/dragon.svg';
import dark from '../../assets/monsterTypes/dark.svg';
import fairy from '../../assets/monsterTypes/fairy.svg';
import normal from '../../assets/monsterTypes/normal.svg';
import fighting from '../../assets/monsterTypes/fighting.svg';
import poison from '../../assets/monsterTypes/poison.svg';
import ground from '../../assets/monsterTypes/ground.svg';
import flying from '../../assets/monsterTypes/flying.svg';
import psychic from '../../assets/monsterTypes/psychic.svg';
import rock from '../../assets/monsterTypes/rock.svg';
import ghost from '../../assets/monsterTypes/ghost.svg';
import steel from '../../assets/monsterTypes/steel.svg';

interface LabelTypeProps {
    type: "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";
    isSelected?: boolean;
    className?: string;
}

const typeIcons = {
    normal,
    bug,
    fire,
    water,
    grass,
    electric,
    ice,
    fighting,
    poison,
    ground,
    flying,
    psychic,
    rock,
    ghost,
    dragon,
    dark,
    steel,
    fairy
};

const typeStyles = {
    normal: {
        bg: 'bg-type-normal',
        hoverText: 'hover:border-type-normal'
    },
    bug: {
        bg: 'bg-type-bug',
        hoverText: 'hover:border-type-bug'
    },
    fire: {
        bg: 'bg-type-fire',
        hoverText: 'hover:border-type-fire'
    },
    water: {
        bg: 'bg-type-water',
        hoverText: 'hover:border-type-water'
    },
    grass: {
        bg: 'bg-type-grass',
        hoverText: 'hover:border-type-grass'
    },
    electric: {
        bg: 'bg-type-electric',
        hoverText: 'hover:border-type-electric'
    },
    ice: {
        bg: 'bg-type-ice',
        hoverText: 'hover:border-type-ice'
    },
    fighting: {
        bg: 'bg-type-fighting',
        hoverText: 'hover:border-type-fighting'
    },
    poison: {
        bg: 'bg-type-poison',
        hoverText: 'hover:border-type-poison'
    },
    ground: {
        bg: 'bg-type-ground',
        hoverText: 'hover:border-type-ground'
    },
    flying: {
        bg: 'bg-type-flying',
        hoverText: 'hover:border-type-flying'
    },
    psychic: {
        bg: 'bg-type-psychic',
        hoverText: 'hover:border-type-psychic'
    },
    rock: {
        bg: 'bg-type-rock',
        hoverText: 'hover:border-type-rock'
    },
    ghost: {
        bg: 'bg-type-ghost',
        hoverText: 'hover:border-type-ghost'
    },
    dragon: {
        bg: 'bg-type-dragon',
        hoverText: 'hover:border-type-dragon'
    },
    dark: {
        bg: 'bg-type-dark',
        hoverText: 'hover:border-type-dark'
    },
    steel: {
        bg: 'bg-type-steel',
        hoverText: 'hover:border-type-steel'
    },
    fairy: {
        bg: 'bg-type-fairy',
        hoverText: 'hover:border-type-fairy'
    }
};

export function LabelType({ type, isSelected = false, className }: LabelTypeProps) {

    return (
        <button className={`flex items-center justify-center gap-2 px-2 py-1 rounded-lg ${typeStyles[type].bg} text-white ${typeStyles[type].hoverText} ${isSelected ? 'brightness-100' : 'brightness-50'} cursor-pointer ${className}`}>
            <img src={typeIcons[type]} alt={type} className="w-4 h-4 " />
            <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
        </button>
    )
}