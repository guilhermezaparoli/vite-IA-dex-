/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { api } from "../api/axios/api";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { refreshToken } from "../api/refreshToken";

interface AuthenticateContextType {
    // userId: string;
    // username: string;
    isAuthenticate?: boolean
    token: string | null;
    setToken: (token: string | null) => void;
}

interface AuthenticateProviderParams {
    children: ReactNode
}


const AuthenticateContext = createContext<AuthenticateContextType | undefined>(undefined)


const AuthenticateProvider = ({ children }: AuthenticateProviderParams) => {

    const [token, setToken] = useState<string | null>(null)
    const isAuthenticate = !!token

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

        initializeAuth()
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
            isAuthenticate
        }}>
            {children}
        </AuthenticateContext.Provider>
    )
}

export default AuthenticateProvider

export const useAuthenticateContext = () => {
    const context = useContext(AuthenticateContext)

    if (context == undefined) {
        throw new Error("useAuthenticate must be used within an AuthenticateProvider");
    }
    
    return context
}



