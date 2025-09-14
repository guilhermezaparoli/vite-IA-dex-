import { Link } from '@tanstack/react-router';
import { useFetchMonsterById } from '../../api/queries/useFetchMonsterById';
import { RarityIndicator } from '../../components/RarityIndicator';
import { getRarityConfig } from '../../utils/rarity';


interface MonsterDetailsProps {
    monsterId: string;
}

// type MonsterType = "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";


const MAX_STAT_VALUE = 255; 

export function MonsterDetails({ monsterId }: MonsterDetailsProps) {
    const { data: monster } = useFetchMonsterById(monsterId);
    const rarityConfig = getRarityConfig(monster);

    return (
        <main className="min-h-screen bg-background p-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 pt-8">
                    <Link 
                        to="/" 
                        className="inline-flex items-center text-input hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar para a lista
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   
                    <div className="space-y-6">
                      
                        <div className="bg-container-modal rounded-2xl p-6">
                            <img 
                                src={monster.image} 
                                alt={monster.name}
                                className="w-full max-w-md mx-auto rounded-lg"
                            />
                        </div>

                        <div className="bg-container-modal rounded-2xl p-6">
                            <div className="text-center space-y-4">
                                <div className="text-gray-400 text-lg">#{monster.id}</div>
                                <h1 className="text-4xl font-bold text-white">{monster.name}</h1>
                                
                                <div className="flex justify-center">
                                    <RarityIndicator monster={monster} size="large" />
                                </div>
                                
                                {/* <div className="flex justify-center gap-2">
                                    {monster.types?.map((type) => (
                                        <LabelType 
                                            key={type} 
                                            monsterType={type} 
                                            selected 
                                            className="!cursor-default" 
                                        />
                                    ))}
                                </div> */}

                                <div className="text-gray-400 text-sm">
                                    Criado em {new Date(monster.created_at).toLocaleDateString('pt-BR')} por {monster.user.name}
                                </div>
                            </div>
                        </div>
                    </div>

                 
                    <div className="space-y-6">
                       
                        <div className="bg-container-modal rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Descrição</h2>
                            <p className="text-gray-300 leading-relaxed">{monster.description}</p>
                        </div>

                       
                        <div className="bg-container-modal rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">História</h2>
                            <p className="text-gray-300 leading-relaxed">{monster.story}</p>
                        </div>

                      
                        <div className="bg-container-modal rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Estatísticas</h2>
                            <div className="space-y-4">
                                <div className="bg-background rounded-lg p-4 border-2" style={{ borderColor: rarityConfig.borderColor }}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300 font-semibold">Total das Estatísticas</span>
                                        <span 
                                            className="text-2xl font-bold"
                                            style={{ color: rarityConfig.color }}
                                        >
                                            {monster.hp + monster.attack + monster.defense + monster.speed + monster.special_attack + monster.special_defense}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Raridade: <span style={{ color: rarityConfig.color }}>{rarityConfig.label}</span>
                                    </div>
                                </div>
                                
                            
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300 capitalize">
                                                HP
                                            </span>
                                            <span className="text-white font-medium">{monster.hp}</span>
                                        </div>
                                        <div className="w-full bg-background rounded-full h-2">
                                            <div
                                                className="bg-input h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${((monster.hp) / MAX_STAT_VALUE) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300 capitalize">
                                                Ataque
                                            </span>
                                            <span className="text-white font-medium">{monster.attack}</span>
                                        </div>
                                        <div className="w-full bg-background rounded-full h-2">
                                            <div
                                                className="bg-input h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${((monster.attack) / MAX_STAT_VALUE) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300 capitalize">
                                                Defesa
                                            </span>
                                            <span className="text-white font-medium">{monster.defense}</span>
                                        </div>
                                        <div className="w-full bg-background rounded-full h-2">
                                            <div
                                                className="bg-input h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${((monster.defense) / MAX_STAT_VALUE) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300 capitalize">
                                                Velocidade
                                            </span>
                                            <span className="text-white font-medium">{monster.speed}</span>
                                        </div>
                                        <div className="w-full bg-background rounded-full h-2">
                                            <div
                                                className="bg-input h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${((monster.speed) / MAX_STAT_VALUE) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300 capitalize">
                                                Ataque especial
                                            </span>
                                            <span className="text-white font-medium">{monster.special_attack}</span>
                                        </div>
                                        <div className="w-full bg-background rounded-full h-2">
                                            <div
                                                className="bg-input h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${((monster.special_attack) / MAX_STAT_VALUE) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300 capitalize">
                                                Defesa especial
                                            </span>
                                            <span className="text-white font-medium">{monster.special_defense}</span>
                                        </div>
                                        <div className="w-full bg-background rounded-full h-2">
                                            <div
                                                className="bg-input h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${((monster.special_defense) / MAX_STAT_VALUE) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
