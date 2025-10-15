import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import type { TFunction } from 'i18next';

interface ApiError {
  message: string;
  code?: number;
  status?: number;
}

// Mapeamento de mensagens de erro da API para chaves de tradução
const ERROR_KEY_MAP: Record<string, string> = {
  'Invalid credentials': 'errors.api.invalidCredentials',
  'E-mail already exists!': 'errors.api.emailAlreadyExists',
  'User already exists': 'errors.api.userAlreadyExists',
  'Email already in use': 'errors.api.emailAlreadyInUse',
  'Validation failed': 'errors.api.validationFailed',
  'Network Error': 'errors.api.networkError',
  'Your request violated our content policy.': 'errors.api.contentPolicyViolation',
  'Username already exists': 'errors.api.usernameAlreadyExists',
};

export const handleApiError = (error: unknown, t: TFunction): string => {
  let errorMessage = t('errors.api.unknownError');

  if (isAxiosError(error)) {
    const responseMessage = error.response?.data?.message || error.message;
    const translationKey = ERROR_KEY_MAP[responseMessage];

    errorMessage = translationKey ? t(translationKey) : responseMessage;

    // if (process.env.NODE_ENV === 'development') {
    //     console.error('API Error:', {
    //         status: error.response?.status,
    //         message: responseMessage,
    //         data: error.response?.data
    //     });
    // }
  } else if (error instanceof Error) {
    const translationKey = ERROR_KEY_MAP[error.message];
    errorMessage = translationKey ? t(translationKey) : error.message;
  } else if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;
    const translationKey = ERROR_KEY_MAP[apiError.message];
    errorMessage = translationKey ? t(translationKey) : apiError.message;

    // if (apiError.status && process.env.NODE_ENV === 'development') {
    //     console.error('Status Code:', apiError.status);
    // }
  }

  toast.error(errorMessage);

  return errorMessage;
};
