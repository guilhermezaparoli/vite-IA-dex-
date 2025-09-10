import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { LabelType } from '../../components/LabelType';
import { useFetchAllTypes } from '../../api/queries/useFetchAllTypes';

type MonsterType = "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";

const monsterTypes: MonsterType[] = [
    "normal", "fire", "water", "electric", "grass", "ice",
    "fighting", "poison", "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

export function CreateMonster() {
    const [selectedTypes, setSelectedTypes] = useState<MonsterType[]>([]);
    const { data } = useFetchAllTypes()
    const handleTypeToggle = (type: MonsterType) => {
        setSelectedTypes(prev => {
            if (prev.includes(type)) {
                return prev.filter(t => t !== type);
            } else if (prev.length < 2) {
                return [...prev, type];
            }
            return prev;
        });
    };

    const formSchema = z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        description: z.string().min(1, "Descrição é obrigatória"),
        story: z.string().optional(),
        types: z.array(z.enum(monsterTypes)).max(2, "Selecione no máximo 2 tipos").min(1, "Selecione pelo menos 1 tipo")
    })
    type FormData = z.infer<typeof formSchema>;
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });


    const onHandleSubmit = (data: FormData) => {
        console.log(data);
    }
   
console.log(data, "data");

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
                        <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                    Nome do Monstro *
                                </label>
                                <input
                                    className="w-full px-4 py-3 bg-background border border-pokemon-card-border rounded-lg text-white placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-input focus:border-transparent transition-colors"
                                    placeholder="Ex: Flamezard, Aquatron..."
                                    {...register("name")}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Description Field */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                                    Descrição *
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-3 bg-background border border-pokemon-card-border rounded-lg text-white placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-input focus:border-transparent transition-colors resize-none"
                                    placeholder="Descreva a aparência e características do seu monstro..."
                                    {...register("description")}
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                            </div>

                            {/* Story Field */}
                            <div>
                                <label htmlFor="story" className="block text-sm font-medium text-white mb-2">
                                    História
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-pokemon-card-border rounded-lg text-white placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-input focus:border-transparent transition-colors resize-none"
                                    placeholder="Conte a origem e história do seu monstro..."
                                    {...register("story")}
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
                                            className={`cursor-pointer transition-all ${selectedTypes.includes(type)
                                                    ? 'ring-2 ring-input ring-offset-2 ring-offset-container-modal'
                                                    : 'opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <LabelType monsterType={type} />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                    Selecionados: {selectedTypes.length}/2
                                </p>
                            </div>


                            <button
                                type="submit"
                                // disabled={isLoading || !isFormValid}
                                className="w-full bg-input text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-input focus:ring-offset-2 focus:ring-offset-container-modal transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {/* {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Criando monstro...
                                    </div>
                                ) : (
                                    'Criar Monstro'
                                )} */}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}