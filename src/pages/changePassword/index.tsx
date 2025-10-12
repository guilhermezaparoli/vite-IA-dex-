import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useChangePassword } from '../../api/mutations/useChangePassword';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from '@tanstack/react-router';

export function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: changePasswordMutate, isPending } = useChangePassword();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const zodSchema = z
    .object({
      currentPassword: z.string().min(8, t('changePassword.currentPasswordError')),
      newPassword: z.string().min(8, t('changePassword.newPasswordError')),
      confirmPassword: z.string().min(8, t('changePassword.confirmPasswordError')),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: t('changePassword.passwordMismatch'),
      path: ['confirmPassword'],
    });

  type FormType = z.infer<typeof zodSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(zodSchema),
  });

  const onHandleSubmit = async (data: FormType) => {
    changePasswordMutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          toast.success(t('changePassword.success'), {
            autoClose: 2000,
          });
          reset();
          navigate({ to: '/profile' });
        },
        onError: error => {
          if (isAxiosError(error)) {
            const message = error.response?.data.message;
            const errorTranslation: Record<string, string> = {
              'Current password is incorrect': t('changePassword.incorrectPassword'),
              'Invalid current password': t('changePassword.invalidPassword'),
            };

            if (typeof message === 'string') {
              const translated =
                (message && errorTranslation[message]) || t('changePassword.genericError');
              toast.error(translated);
            }
          }
        },
      }
    );
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">{t('changePassword.title')}</h1>
          <p className="text-gray-400">{t('changePassword.subtitle')}</p>
        </div>

        <div className="rounded-lg border border-gray-600 bg-[#24293f] p-6 shadow-lg">
          <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
            {/* Current Password Field */}
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-medium text-white"
              >
                {t('changePassword.currentPassword')}
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  className="w-full rounded-md border border-gray-600 bg-transparent p-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={t('changePassword.currentPasswordPlaceholder')}
                  {...register('currentPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white"
                >
                  {showCurrentPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="mt-2 text-red-500">{errors.currentPassword.message}</p>
              )}
            </div>

            {/* New Password Field */}
            <div>
              <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-white">
                {t('changePassword.newPassword')}
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="w-full rounded-md border border-gray-600 bg-transparent p-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={t('changePassword.newPasswordPlaceholder')}
                  {...register('newPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white"
                >
                  {showNewPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-2 text-red-500">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-white"
              >
                {t('changePassword.confirmPassword')}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full rounded-md border border-gray-600 bg-transparent p-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={t('changePassword.confirmPasswordPlaceholder')}
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
                  {t('changePassword.submitting')}
                </div>
              ) : (
                t('changePassword.submit')
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate({ to: '/profile' })}
              className="cursor-pointer text-gray-400 transition-colors hover:text-white"
            >
              {t('changePassword.backToProfile')}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
