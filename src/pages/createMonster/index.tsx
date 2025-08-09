import { useState } from 'react';
import { LabelType } from '../../components/LabelType';

type MonsterType = "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";

const monsterTypes: MonsterType[] = [
    "normal", "fire", "water", "electric", "grass", "ice", 
    "fighting", "poison", "ground", "flying", "psychic", "bug", 
    "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

export function CreateMonster() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        story: ''
    });
    const [selectedTypes, setSelectedTypes] = useState<MonsterType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTypeToggle = (type: MonsterType) => {
        setSelectedTypes(prev => {
            if (prev.includes(type)) {
                return prev.filter(t => t !== type);
            } else if (prev.length < 2) { // Máximo 2 tipos
                return [...prev, type];
            }
            return prev;
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (selectedTypes.length === 0) {
            alert('Por favor, selecione pelo menos um tipo para o monstro!');
            return;
        }

        setIsLoading(true);
        
        const monsterData = {
            ...formData,
            types: selectedTypes
        };

        // Simular criação do monstro
        setTimeout(() => {
            setIsLoading(false);
            console.log('Monster created:', monsterData);
            alert('Monstro criado com sucesso!');
        }, 2000);
    };

    const isFormValid = formData.name && formData.description && formData.story && selectedTypes.length > 0;

    return (
        <main className="min-h-screen bg-background p-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 pt-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Criar Monstro</h1>
                    <p className="text-gray-400">Use IA para gerar seu monstro único</p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Form Section */}
                    <div className="bg-container-modal rounded-2xl p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                    Nome do Monstro *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-background border border-pokemon-card-border rounded-lg text-white placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-input focus:border-transparent transition-colors"
                                    placeholder="Ex: Flamezard, Aquatron..."
                                />
                            </div>

                            {/* Description Field */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                                    Descrição *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-3 bg-background border border-pokemon-card-border rounded-lg text-white placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-input focus:border-transparent transition-colors resize-none"
                                    placeholder="Descreva a aparência e características do seu monstro..."
                                />
                            </div>

                            {/* Story Field */}
                            <div>
                                <label htmlFor="story" className="block text-sm font-medium text-white mb-2">
                                    História *
                                </label>
                                <textarea
                                    id="story"
                                    name="story"
                                    value={formData.story}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-pokemon-card-border rounded-lg text-white placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-input focus:border-transparent transition-colors resize-none"
                                    placeholder="Conte a origem e história do seu monstro..."
                                />
                            </div>

                            {/* Types Selection */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-3">
                                    Tipos * (máximo 2)
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {monsterTypes.map((type) => (
                                        <div 
                                            key={type}
                                            onClick={() => handleTypeToggle(type)}
                                            className={`cursor-pointer transition-all ${
                                                selectedTypes.includes(type)
                                                    ? 'ring-2 ring-input ring-offset-2 ring-offset-container-modal' 
                                                    : 'opacity-70 hover:opacity-100'
                                            }`}
                                        >
                                            <LabelType type={type} />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                    Selecionados: {selectedTypes.length}/2
                                </p>
                            </div>

                        

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !isFormValid}
                                className="w-full bg-input text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-input focus:ring-offset-2 focus:ring-offset-container-modal transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Criando monstro...
                                    </div>
                                ) : (
                                    '⚡ Criar Monstro'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}