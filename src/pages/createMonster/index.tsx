import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LabelType } from '../../components/LabelType';
import type { MonsterType } from '../../@types/monster';
import { useCreateMonster } from '../../api/mutations/useCreateMonster';
import { toast } from 'react-toastify';
import { useNavigate } from '@tanstack/react-router';

const monsterTypes: MonsterType[] = [
  'NORMAL',
  'FIRE',
  'WATER',
  'ELECTRIC',
  'GRASS',
  'ICE',
  'FIGHTING',
  'POISON',
  'GROUND',
  'FLYING',
  'PSYCHIC',
  'BUG',
  'ROCK',
  'GHOST',
  'DRAGON',
  'DARK',
  'STEEL',
  'FAIRY',
];

export function CreateMonster() {
  const { mutate: createMonster, isPending } = useCreateMonster();
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    story: z.string(),
    types: z
      .array(z.enum(monsterTypes))
      .max(2, 'Selecione no máximo 2 tipos')
      .min(1, 'Selecione pelo menos 1 tipo'),
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      types: [],
      story: '',
    },
  });

  const selectedTypes = watch('types');

  const handleTypeToggle = (type: MonsterType) => {
    if (watch('types').includes(type)) {
      const newTypes = watch('types').filter(t => t !== type);
      setValue('types', newTypes);
    } else if (watch('types').length < 2) {
      const newTypes = [...watch('types'), type];
      setValue('types', newTypes);
    }
  };

  const onHandleSubmit = (data: FormData) => {
    console.log(data);

    createMonster(
      {
        description: data.description,
        name: data.name,
        story: data.story,
        types: selectedTypes,
      },
      {
        onSuccess: ({ id }) => {
          toast.success('Monstro criado com sucesso!');
          navigate({
            to: `/monster/${id}`,
          });
        },
      }
    );
  };

  console.log(errors, selectedTypes);
  return (
    <main className="bg-background min-h-screen p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 pt-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">Criar Monstro</h1>
          <p className="text-gray-400">Use IA para gerar seu monstro único</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-lg border border-gray-600 bg-[#24293f] p-6 shadow-lg">
            <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                  Nome do Monstro *
                </label>
                <input
                  disabled={isPending}
                  className="w-full rounded-md border border-gray-600 bg-transparent px-4 py-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ex: Flamezard, Aquatron..."
                  {...register('name')}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-medium text-white">
                  Descrição *
                </label>
                <textarea
                  disabled={isPending}
                  rows={3}
                  className="w-full resize-none rounded-md border border-gray-600 bg-transparent px-4 py-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Descreva a aparência e características do seu monstro..."
                  {...register('description')}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="story" className="mb-2 block text-sm font-medium text-white">
                  História
                </label>
                <textarea
                  disabled={isPending}
                  rows={4}
                  className="w-full resize-none rounded-md border border-gray-600 bg-transparent px-4 py-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Conte a origem e história do seu monstro..."
                  {...register('story')}
                />
              </div>

              {/* Types Selection */}
              <div>
                <label className="mb-3 block text-sm font-medium text-white">
                  Tipos * (máximo 2)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {monsterTypes.map(type => (
                    <div key={type}>
                      <LabelType
                        monsterType={type}
                        selected={selectedTypes.includes(type)}
                        onClick={() => handleTypeToggle(type)}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  {errors.types && (
                    <p className="mt-1 text-sm text-red-500">{errors.types.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="bg-input hover:bg-opacity-90 focus:ring-input focus:ring-offset-container-modal w-full cursor-pointer rounded-lg px-4 py-3 font-medium text-white transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Criando monstro...
                  </div>
                ) : (
                  'Criar Monstro'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
