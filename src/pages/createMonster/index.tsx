import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LabelType } from "../../components/LabelType";
import type { MonsterType } from "../../@types/monster";
import { useCreateMonster } from "../../api/mutations/useCreateMonster";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";

const monsterTypes: MonsterType[] = [
  "NORMAL",
  "FIRE",
  "WATER",
  "ELECTRIC",
  "GRASS",
  "ICE",
  "FIGHTING",
  "POISON",
  "GROUND",
  "FLYING",
  "PSYCHIC",
  "BUG",
  "ROCK",
  "GHOST",
  "DRAGON",
  "DARK",
  "STEEL",
  "FAIRY",
];

export function CreateMonster() {
  const { mutate: createMonster, isPending } = useCreateMonster();
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    story: z.string(),
    types: z
      .array(z.enum(monsterTypes))
      .max(2, "Selecione no máximo 2 tipos")
      .min(1, "Selecione pelo menos 1 tipo"),
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
      story: "",
    },
  });

  const selectedTypes = watch("types");

  const handleTypeToggle = (type: MonsterType) => {
    if (watch("types").includes(type)) {
      const newTypes = watch("types").filter((t) => t !== type);
      setValue("types", newTypes);
    } else if (watch("types").length < 2) {
      const newTypes = [...watch("types"), type];
      setValue("types", newTypes);
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
          toast.success("Monstro criado com sucesso!");
          navigate({
            to: `/monster/${id}`,
          });
        },
      },
    );
  };

  console.log(errors, selectedTypes);
  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-2">Criar Monstro</h1>
          <p className="text-gray-400">Use IA para gerar seu monstro único</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-[#24293f] border border-gray-600 rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Nome do Monstro *
                </label>
                <input
                  disabled={isPending}
                  className="w-full px-4 py-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                  placeholder="Ex: Flamezard, Aquatron..."
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Descrição *
                </label>
                <textarea
                  disabled={isPending}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Descreva a aparência e características do seu monstro..."
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="story"
                  className="block text-sm font-medium text-white mb-2"
                >
                  História
                </label>
                <textarea
                  disabled={isPending}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.types.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-input text-white py-3 px-4 rounded-lg cursor-pointer font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-input focus:ring-offset-2 focus:ring-offset-container-modal transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  "Criar Monstro"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
