import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useAuthenticateContext } from "../../context/authenticate";

export function Profile() {
    const { user } = useAuthenticateContext();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const profileSchema = z.object({
        name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
        email: z.email("Informe um e-mail válido"),
         currentPassword: z.string().min(8, "Senha atual é obrigatória"),
        newPassword: z.string().min(8, "Nova senha deve ter pelo menos 8 caracteres"),
        confirmPassword: z.string().min(8, "Confirmação de senha é obrigatória")
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });;



    type ProfileFormData = z.infer<typeof profileSchema>;


    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        formState: { errors: profileErrors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || ""
        }
    });

    const onSubmitProfile = (data: ProfileFormData) => {
        // TODO: Implementar API call para atualizar perfil
        console.log("Profile data:", data);
        toast.success("Perfil atualizado com sucesso!");
    };



    return (
        <main className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-2xl bg-[#24293f] border border-gray-600 rounded-lg shadow-lg p-6">

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Meu Perfil</h1>
                            <p className="text-gray-400">Gerencie suas informações pessoais</p>
                        </div>
                    </div>
                </div>


                <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Nome
                            </label>

                            <input
                                {...registerProfile("name")}
                                type="text"
                                className="w-full p-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            {profileErrors.name && (
                                <p className="mt-1 text-sm text-red-400">{profileErrors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Senha Atual
                            </label>
                            <div className="relative">
                                <input
                                    {...registerProfile("currentPassword")}
                                    type={showCurrentPassword ? "text" : "password"}
                                    className="w-full p-3 pr-10 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Digite sua senha atual"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                                >
                                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {profileErrors.currentPassword && (
                                <p className="mt-1 text-sm text-red-400">{profileErrors.currentPassword.message}</p>
                            )}
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Nova Senha
                            </label>
                            <div className="relative">
                                <input
                                    {...registerProfile("newPassword")}
                                    type={showNewPassword ? "text" : "password"}
                                    className="w-full p-3 pr-10 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Digite sua nova senha"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                                >
                                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {profileErrors.newPassword && (
                                <p className="mt-1 text-sm text-red-400">{profileErrors.newPassword.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Confirmar Nova Senha
                            </label>
                            <div className="relative">
                                <input
                                    {...registerProfile("confirmPassword")}
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full p-3 pr-10 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Confirme sua nova senha"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {profileErrors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-400">{profileErrors.confirmPassword.message}</p>
                            )}
                        </div>


                    </div>

                <div className="flex justify-end mt-8 pt-6 border-t border-gray-600">
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                    >
                        Alterar Senha
                    </button>

                </div>

                </form>
            </div>
        </main>
    );
}