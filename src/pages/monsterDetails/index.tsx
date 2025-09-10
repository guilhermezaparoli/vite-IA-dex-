import { Link } from '@tanstack/react-router';
import { LabelType } from '../../components/LabelType';
import { useFetchMonsterById } from '../../api/queries/useFetchMonsterById';
import type { Monster } from '../../api/fetchAllMonsters';


interface MonsterDetailsProps {
    monsterId: string;
}

type MonsterType = "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";

interface ExtendedMonster extends Monster {
    types?: MonsterType[];
    stats?: Record<string, number>;
}

export function MonsterDetails({ monsterId }: MonsterDetailsProps) {
    const { data: monster } = useFetchMonsterById(monsterId);
    const extendedData: Pick<ExtendedMonster, 'types' | 'stats'> = {
        types: ["dragon", "fire"],
        stats: {
            hp: 85,
            attack: 120,
            defense: 78,
            speed: 95,
            special_attack: 110,
            special_defense: 85
        }
    };

    const extendedMonster: ExtendedMonster = {
        ...monster,
        ...extendedData
    };

    const maxStat = Math.max(...Object.values(extendedMonster.stats || {}));

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
                                src={extendedMonster.image} 
                                alt={extendedMonster.name}
                                className="w-full max-w-md mx-auto rounded-lg"
                            />
                        </div>

                        <div className="bg-container-modal rounded-2xl p-6">
                            <div className="text-center space-y-4">
                                <div className="text-gray-400 text-lg">#{extendedMonster.id}</div>
                                <h1 className="text-4xl font-bold text-white">{extendedMonster.name}</h1>
                                
                                <div className="flex justify-center gap-2">
                                    {extendedMonster.types?.map((type) => (
                                        <LabelType 
                                            key={type} 
                                            monsterType={type} 
                                            selected 
                                            className="!cursor-default" 
                                        />
                                    ))}
                                </div>

                                <div className="text-gray-400 text-sm">
                                    Criado em {new Date(extendedMonster.created_at).toLocaleDateString('pt-BR')} por {extendedMonster.user.name}
                                </div>
                            </div>
                        </div>
                    </div>

                 
                    <div className="space-y-6">
                       
                        <div className="bg-container-modal rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Descrição</h2>
                            <p className="text-gray-300 leading-relaxed">{extendedMonster.description}</p>
                        </div>

                       
                        <div className="bg-container-modal rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">História</h2>
                            <p className="text-gray-300 leading-relaxed">{extendedMonster.story}</p>
                        </div>

                      
                        <div className="bg-container-modal rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Estatísticas</h2>
                            <div className="space-y-4">
                                {Object.entries(extendedMonster.stats || {}).map(([statName, value]) => (
                                    <div key={statName} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300 capitalize">
                                                {statName.replace('_', ' ')}
                                            </span>
                                            <span className="text-white font-medium">{value as number}</span>
                                        </div>
                                        <div className="w-full bg-background rounded-full h-2">
                                            <div
                                                className="bg-input h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${((value as number) / maxStat) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
