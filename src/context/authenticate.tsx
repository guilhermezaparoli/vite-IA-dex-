/* eslint-disable react-refresh/only-export-components */
import { useRouter } from "@tanstack/react-router";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import { api } from "../api/axios/api";
import { useLogoutUser } from "../api/mutations/useLogoutUser";
import { refreshToken } from "../api/refreshToken";
import { useFetchUser } from "../api/queries/users/useFetchUser";
import type { User } from "../api/fetchUser";

interface AuthenticateContextType {
    // username: string;
    isAuthenticate?: boolean
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
    user?: User 
}

interface AuthenticateProviderParams {
    children: ReactNode
}


const AuthenticateContext = createContext<AuthenticateContextType | undefined>(undefined)


const AuthenticateProvider = ({ children }: AuthenticateProviderParams) => {

    const [token, setToken] = useState<string | null>(null)
    const isAuthenticate = !!token
    const { mutate: logoutUser } = useLogoutUser()
    const { navigate } = useRouter()
    const { data: user } = useFetchUser(token)


    function logout() {
        logoutUser(undefined, {
            onSuccess: () => {
                setToken(null)
                navigate({
                    to: "/"
                })
            },
            onError: () => {
                toast.error("Houve um erro ao tentar deslogar o usuário")
            }
        })
    }

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await refreshToken()
                const newToken = response.data.token
                setToken(newToken)
            } catch {
                setToken(null)
            }
        }

        if(token){
            initializeAuth()
        }
    }, [])

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            config.headers.Authorization = token ? `Bearer ${token}` : config.headers.Authorization

            return config
        })


        return () => {
            api.interceptors.request.eject(authInterceptor)
        }
    }, [token])

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use((response) => response, async (error: AxiosError) => {
            const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true

                try {
                    const response = await refreshToken(token || undefined)

                    const newToken = response.data.token
                    setToken(newToken)

                    originalRequest.headers = originalRequest.headers ?? {}
                    originalRequest.headers.Authorization = `Bearer ${newToken}`

                    return api(originalRequest)
                } catch (err) {
                    setToken(null)
                    return Promise.reject(err)
                }
            }

            return Promise.reject(error)

        })
        return () => {
            api.interceptors.response.eject(refreshInterceptor)
        }

    }, [])

    return (
        <AuthenticateContext.Provider value={{
            token,
            setToken,
            isAuthenticate,
            logout,
            user
        }}>
            {children}
        </AuthenticateContext.Provider>
    )
}

export default AuthenticateProvider

export const useAuthenticateContext = () => {
    const context = useContext(AuthenticateContext)

    if (context == undefined) {
        throw new Error("useAuthenticateContext must be used within an AuthenticateProvider");
    }

    return context
}



