import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useAuthenticateContext } from "../../context/authenticate";

export function Profile() {
    const { user } = useAuthenticateContext();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const profileSchema = z.object({
        name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres")
    });

    const passwordSchema = z.object({
        currentPassword: z.string().min(8, "Senha atual é obrigatória"),
        newPassword: z.string().min(8, "Nova senha deve ter pelo menos 8 caracteres"),
        confirmPassword: z.string().min(8, "Confirmação de senha é obrigatória")
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

    type ProfileFormData = z.infer<typeof profileSchema>;
    type PasswordFormData = z.infer<typeof passwordSchema>;

    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        formState: { errors: profileErrors },
        reset: resetProfile
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || ""
        }
    });


    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: passwordErrors },
        reset: resetPassword
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema)
    });

    const handleEditToggle = () => {
        if (isEditingProfile) {
            resetProfile({ name: user?.name || "" });
        }
        setIsEditingProfile(!isEditingProfile);
    };

    const onSubmitProfile = (data: ProfileFormData) => {
        // TODO: Implementar API call para atualizar perfil
        console.log("Profile data:", data);
        toast.success("Perfil atualizado com sucesso!");
        setIsEditingProfile(false);
    };

    const onSubmitPassword = (data: PasswordFormData) => {
        // TODO: Implementar API call para alterar senha
        console.log("Password data:", data);
        toast.success("Senha alterada com sucesso!");
        setShowChangePassword(false);
        resetPassword();
    };

    const formatDate = (date: Date | string) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };


    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-4xl space-y-6">

      
                <div className="bg-[#24293f] border border-gray-600 rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-white">Informações do Perfil</h1>
                                <p className="text-gray-400">Gerencie suas informações pessoais</p>
                            </div>
                        </div>
                        <button
                            onClick={handleEditToggle}
                            className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${isEditingProfile ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}  text-white rounded `}
                        >
                            {isEditingProfile ? (
                                <>
                                    <X className="w-4 h-4" />
                                    Cancelar
                                </>
                            ) : (
                                <>
                                    <Edit className="w-4 h-4" />
                                    Editar
                                </>
                            )}
                        </button>
                    </div>

                    <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Nome
                                </label>
                                {isEditingProfile ? (
                                    <input
                                        {...registerProfile("name")}
                                        type="text"
                                        className="w-full p-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                ) : (
                                    <div className="p-3 border border-gray-600 rounded-md bg-gray-800 text-white">
                                        {user?.name}
                                    </div>
                                )}
                                {profileErrors.name && (
                                    <p className="mt-1 text-sm text-red-400">{profileErrors.name.message}</p>
                                )}
                            </div>

                            {!isEditingProfile && (

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        E-mail
                                    </label>
                                    <div className="p-3 border border-gray-600 rounded-md bg-gray-800 text-white">
                                        {user?.email}
                                    </div>
                                </div>
                            )}

                
                            {!isEditingProfile && (
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Membro desde
                                    </label>
                                    <div className="p-3 border border-gray-600 rounded-md bg-gray-800 text-white">
                                        {user?.createdAt && formatDate(user?.createdAt)}
                                    </div>
                                </div>

                            )}
                        </div>

                        {isEditingProfile && (
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-2 cursor-pointer bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                                >
                                    <Save className="w-4 h-4" />
                                    Salvar Alterações
                                </button>
                            </div>
                        )}
                    </form>
                </div>


                <div className="bg-[#24293f] border border-gray-600 rounded-lg shadow-lg p-6">
                    <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Segurança</h2>
                            <p className="text-gray-400">Altere sua senha de acesso</p>
                        </div>
                        {!showChangePassword && (
                            <button
                                onClick={() => setShowChangePassword(!showChangePassword)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer hover:bg-yellow-600 transition-colors duration-200 max-w-96"
                            >
                                Alterar Senha
                            </button>

                        )}
                    </div>

                    {showChangePassword && (
                        <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Senha Atual
                                </label>
                                <div className="relative">
                                    <input
                                        {...registerPassword("currentPassword")}
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
                                {passwordErrors.currentPassword && (
                                    <p className="mt-1 text-sm text-red-400">{passwordErrors.currentPassword.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Nova Senha
                                </label>
                                <div className="relative">
                                    <input
                                        {...registerPassword("newPassword")}
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
                                {passwordErrors.newPassword && (
                                    <p className="mt-1 text-sm text-red-400">{passwordErrors.newPassword.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Confirmar Nova Senha
                                </label>
                                <div className="relative">
                                    <input
                                        {...registerPassword("confirmPassword")}
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
                                {passwordErrors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-400">{passwordErrors.confirmPassword.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 transition-colors duration-200"
                            >
                                Alterar Senha
                            </button>
                        </form>
                    )}
                </div>

            </div>
        </main>
    );
}