import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthenticate } from '../../api/mutations/useAuthenticate';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAuthenticateContext } from '../../context/authenticate';
import { useNavigate, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useAuthenticateContext();
  const { mutate: authenticateMutate, isPending } = useAuthenticate();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const zodSchema = z.object({
    email: z.email({ message: t('auth.login.emailError') }),
    password: z.string().min(8, { message: t('auth.login.passwordError') }),
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
    authenticateMutate(data, {
      onSuccess: ({ data }) => {
        setToken(data.token);
        navigate({ to: '/' });
        toast.success(t('auth.login.success'), {
          autoClose: 1000,
        });
      },
      onError: error => {
        if (isAxiosError(error)) {
          const message = error.response?.data.message;
          const errorTranslation: Record<string, string> = {
            'Invalid credentials': t('auth.login.invalidCredentials'),
          };

          if (typeof message === 'string') {
            const translated = (message && errorTranslation[message]) || t('errors.generic');
            toast.error(translated);
          }
        }
      },
    });
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">{t('header.title')}</h1>
          <p className="text-gray-400">{t('auth.login.subtitle')}</p>
        </div>

        <div className="rounded-lg border border-gray-600 bg-[#24293f] p-6 shadow-lg">
          <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                {t('auth.login.email')}
              </label>
              <input
                className="w-full rounded-md border border-gray-600 bg-transparent p-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                autoComplete="off"
                type="email"
                placeholder={t('auth.login.emailPlaceholder')}
                {...register('email')}
              />
              {errors.email && <p className="mt-2 text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-white">
                {t('auth.login.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-md border border-gray-600 bg-transparent p-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={t('auth.login.passwordPlaceholder')}
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

            {/* <div className="flex items-center justify-end">
              <a href="#" className="text-input text-sm transition-colors hover:text-white">
                {t('auth.login.forgotPassword')}
              </a>
            </div> */}

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
                  {t('auth.login.submitting')}
                </div>
              ) : (
                t('auth.login.submit')
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {t('auth.login.noAccount')}{' '}
              <Link
                to="/register"
                className="text-input font-medium transition-colors hover:text-white"
              >
                {t('auth.login.register')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
