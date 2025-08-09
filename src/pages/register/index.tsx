import { useState } from 'react';

export function Register(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        if (!acceptTerms) {
            alert('Você deve aceitar os termos e condições!');
            return;
        }

        setIsLoading(true);
        
        // Simular uma requisição de cadastro
        setTimeout(() => {
            setIsLoading(false);
            console.log('Register attempt:', formData);
        }, 2000);
    };

    const passwordsMatch = formData.password === formData.confirmPassword;
    const isPasswordValid = formData.password.length >= 6;

    return (
        <main className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">AI Dex</h1>
                    <p className="text-gray-400">Crie sua conta e comece a explorar</p>
                </div>

                {/* Register Form */}
                <div className="bg-container-modal rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                Nome completo
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-background border border-pokemon-card-border rounded-lg text-white placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-input focus:border-transparent transition-colors"
                                placeholder="Seu nome completo"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-background border border-pokemon-card-border rounded-lg text-white placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-input focus:border-transparent transition-colors"
                                placeholder="seu@email.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-input focus:border-transparent transition-colors pr-12 ${
                                        formData.password && !isPasswordValid 
                                            ? 'border-red-500' 
                                            : 'border-pokemon-card-border'
                                    }`}
                                    placeholder="Mínimo 6 caracteres"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.05 6.05M9.878 9.878a3 3 0 00-.878 2.122m10.95-10.95L21 3M16.05 6.05L21 3" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {formData.password && !isPasswordValid && (
                                <p className="mt-1 text-sm text-red-500">A senha deve ter pelo menos 6 caracteres</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                                Confirmar senha
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full px-4 py-3 bg-background border rounded-lg text-white placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-input focus:border-transparent transition-colors pr-12 ${
                                        formData.confirmPassword && !passwordsMatch 
                                            ? 'border-red-500' 
                                            : 'border-pokemon-card-border'
                                    }`}
                                    placeholder="Confirme sua senha"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.05 6.05M9.878 9.878a3 3 0 00-.878 2.122m10.95-10.95L21 3M16.05 6.05L21 3" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {formData.confirmPassword && !passwordsMatch && (
                                <p className="mt-1 text-sm text-red-500">As senhas não coincidem</p>
                            )}
                            {formData.confirmPassword && passwordsMatch && formData.password && (
                                <p className="mt-1 text-sm text-green-500">✓ Senhas coincidem</p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <input
                                id="acceptTerms"
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="w-4 h-4 mt-1 text-input bg-background border-pokemon-card-border rounded focus:ring-input focus:ring-2"
                            />
                            <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-400">
                                Eu aceito os{' '}
                                <a href="#" className="text-input hover:text-white transition-colors">
                                    termos e condições
                                </a>{' '}
                                e a{' '}
                                <a href="#" className="text-input hover:text-white transition-colors">
                                    política de privacidade
                                </a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !acceptTerms || !passwordsMatch || !isPasswordValid}
                            className="w-full bg-input text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-input focus:ring-offset-2 focus:ring-offset-container-modal transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Criando conta...
                                </div>
                            ) : (
                                'Criar conta'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-pokemon-card-border"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-container-modal text-gray-400">ou</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Register */}
                    <div className="mt-6 space-y-3">
                        <button className="w-full flex items-center justify-center px-4 py-3 border border-pokemon-card-border rounded-lg text-white hover:bg-background transition-colors">
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Cadastrar com Google
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Já tem uma conta?{' '}
                            <a href="#" className="text-input hover:text-white transition-colors font-medium">
                                Faça login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
