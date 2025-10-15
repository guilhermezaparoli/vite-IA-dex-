import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { Eye, EyeOff, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useChangePassword } from '../../api/mutations/useChangePassword';
import { useAuthenticateContext } from '../../context/authenticate';
import { handleApiError } from '../../utils/errors/handleApiError';

export function Profile() {
  const { user } = useAuthenticateContext();
  const { t } = useTranslation();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: changePasswordMutate, isPending: isChangingPassword } = useChangePassword();

  const profileSchema = z.object({
    name: z.string().min(2, t('profile.nameMinError')),
  });

  const passwordSchema = z
    .object({
      currentPassword: z.string().min(8, t('profile.currentPasswordError')),
      newPassword: z.string().min(8, t('profile.newPasswordError')),
      confirmPassword: z.string().min(8, t('profile.confirmPasswordError')),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: t('profile.passwordMismatch'),
      path: ['confirmPassword'],
    });

  type ProfileFormData = z.infer<typeof profileSchema>;
  type PasswordFormData = z.infer<typeof passwordSchema>;

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmitProfile = () => {
    toast.success(t('profile.profileUpdateSuccess'));
    setIsEditingProfile(false);
  };

  const onSubmitPassword = (data: PasswordFormData) => {
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
          setShowChangePassword(false);
          resetPassword();
        },
        onError: error => {
          handleApiError(error, t);
        },
      }
    );
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-4xl space-y-6">
        <div className="rounded-lg border border-gray-600 bg-[#24293f] p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{t('profile.profileInfo')}</h1>
                <p className="text-gray-400">{t('profile.profileInfoSubtitle')}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  {t('profile.name')}
                </label>
                {isEditingProfile ? (
                  <input
                    {...registerProfile('name')}
                    type="text"
                    className="w-full rounded-md border border-gray-600 bg-transparent p-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                ) : (
                  <div className="rounded-md border border-gray-600 bg-gray-800 p-3 text-white">
                    {user?.name}
                  </div>
                )}
                {profileErrors.name && (
                  <p className="mt-1 text-sm text-red-400">{profileErrors.name.message}</p>
                )}
              </div>

              {!isEditingProfile && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    {t('profile.email')}
                  </label>
                  <div className="rounded-md border border-gray-600 bg-gray-800 p-3 text-white">
                    {user?.email}
                  </div>
                </div>
              )}

              {!isEditingProfile && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    {t('profile.memberSince')}
                  </label>
                  <div className="rounded-md border border-gray-600 bg-gray-800 p-3 text-white">
                    {user?.createdAt && formatDate(user?.createdAt)}
                  </div>
                </div>
              )}
            </div>

            {isEditingProfile && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex cursor-pointer items-center gap-2 rounded bg-green-500 px-6 py-2 text-white transition-colors duration-200 hover:bg-green-600"
                >
                  <Save className="h-4 w-4" />
                  {t('profile.saveChanges')}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="rounded-lg border border-gray-600 bg-[#24293f] p-6 shadow-lg">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{t('profile.security')}</h2>
              <p className="text-gray-400">{t('profile.securitySubtitle')}</p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/change-password"
                className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
              >
                {t('profile.changePassword')}
              </Link>
            </div>
          </div>

          {showChangePassword && (
            <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  {t('profile.currentPassword')}
                </label>
                <div className="relative">
                  <input
                    {...registerPassword('currentPassword')}
                    type={showCurrentPassword ? 'text' : 'password'}
                    className="w-full rounded-md border border-gray-600 bg-transparent p-3 pr-10 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={t('profile.currentPasswordPlaceholder')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-sm text-red-400">
                    {passwordErrors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  {t('profile.newPassword')}
                </label>
                <div className="relative">
                  <input
                    {...registerPassword('newPassword')}
                    type={showNewPassword ? 'text' : 'password'}
                    className="w-full rounded-md border border-gray-600 bg-transparent p-3 pr-10 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={t('profile.newPasswordPlaceholder')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-400">{passwordErrors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  {t('profile.confirmNewPassword')}
                </label>
                <div className="relative">
                  <input
                    {...registerPassword('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full rounded-md border border-gray-600 bg-transparent p-3 pr-10 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={t('profile.confirmNewPasswordPlaceholder')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">
                    {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full cursor-pointer rounded bg-green-500 py-3 text-white transition-colors duration-200 hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isChangingPassword ? (
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
                    {t('profile.changingPassword')}
                  </div>
                ) : (
                  t('profile.changePasswordButton')
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
