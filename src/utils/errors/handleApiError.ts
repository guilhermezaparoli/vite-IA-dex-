import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ApiError {
  message: string;
  code?: number;
  status?: number;
}

const ERROR_MESSAGES: Record<string, string> = {
  'Invalid credentials': 'Credenciais inválidas',
  'E-mail already exists!': 'Este e-mail já está cadastrado',
  'User already exists': 'Este usuário já existe',
  'Email already in use': 'Este e-mail já está em uso',
  'Validation failed': 'Dados inválidos',
  'Network Error': 'Erro de conexão. Verifique sua internet',
};

export const handleApiError = (error: unknown): string => {
  let errorMessage = 'Ocorreu um erro inesperado';

  if (isAxiosError(error)) {
    const responseMessage = error.response?.data?.message || error.message;
    errorMessage = ERROR_MESSAGES[responseMessage] || responseMessage;

    // if (process.env.NODE_ENV === 'development') {
    //     console.error('API Error:', {
    //         status: error.response?.status,
    //         message: responseMessage,
    //         data: error.response?.data
    //     });
    // }
  } else if (error instanceof Error) {
    errorMessage = ERROR_MESSAGES[error.message] || error.message;
  } else if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;
    errorMessage = ERROR_MESSAGES[apiError.message] || apiError.message;

    // if (apiError.status && process.env.NODE_ENV === 'development') {
    //     console.error('Status Code:', apiError.status);
    // }
  }

  toast.error(errorMessage);

  return errorMessage;
};
