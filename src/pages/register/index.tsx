import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useRegisterUser } from '../../api/mutations/useRegisterUser';

import { Link, useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';
import { useAuthenticateContext } from '../../context/authenticate';
import { handleApiError } from '../../utils/errors/handleApiError';

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: registerMutate, isPending } = useRegisterUser();
  const { setToken } = useAuthenticateContext();
  const navigate = useNavigate();

  const zodSchema = z
    .object({
      name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
      email: z.string().email('Informe um e-mail válido'),
      password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
      confirmPassword: z.string().min(8, 'Confirmação de senha é obrigatória'),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    });

  type FormType = z.infer<typeof zodSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(zodSchema),
  });

  const onHandleSubmit = async (data: FormType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data;

    registerMutate(registerData, {
      onSuccess: ({ token }) => {
        toast.success('Conta criada com sucesso!', {
          autoClose: 2000,
        });
        setToken(token);
        navigate({
          to: '/',
        });
      },
      onError: error => {
        handleApiError(error);
      },
    });
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">AI Dex</h1>
          <p className="text-gray-400">Crie sua conta e comece a explorar</p>
        </div>

        <div className="rounded-lg border border-gray-600 bg-[#24293f] p-6 shadow-lg">
          <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                Nome
              </label>
              <input
                className="w-full rounded-md border border-gray-600 bg-transparent p-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                autoComplete="off"
                type="text"
                placeholder="Seu nome"
                {...register('name')}
              />
              {errors.name && <p className="mt-2 text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                Email
              </label>
              <input
                className="w-full rounded-md border border-gray-600 bg-transparent p-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                autoComplete="off"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
              />
              {errors.email && <p className="mt-2 text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-white">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-md border border-gray-600 bg-transparent p-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Mínimo 8 caracteres"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-white"
              >
                Confirmar senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full rounded-md border border-gray-600 bg-transparent p-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Confirme sua senha"
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white"
                >
                  {showConfirmPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-red-500">{errors.confirmPassword.message}</p>
              )}
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
                  Criando conta...
                </div>
              ) : (
                'Criar conta'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Já tem uma conta?{' '}
              <Link
                to="/login"
                className="text-input font-medium transition-colors hover:text-white"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
