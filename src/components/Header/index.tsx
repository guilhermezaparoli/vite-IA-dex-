import { Link } from '@tanstack/react-router';
import { useAuthenticateContext } from '../../context/authenticate';
import { Avatar } from '../Avatar';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { isAuthenticate } = useAuthenticateContext();
  const { t } = useTranslation();

  return (
    <header className="flex w-full items-center justify-between p-4 text-white md:px-24">
      <Link to="/" className="text-2xl font-bold">
        {t('header.title')}
      </Link>
      <nav className="flex items-center gap-4">
        <LanguageSwitcher />
        <ul className="flex items-center justify-center gap-3">
          <Link to="/" className="hover:underline [&.active]:text-blue-500">
            {t('header.home')}
          </Link>

          {isAuthenticate ? (
            <Avatar />
          ) : (
            <>
              <Link to="/register" className="hover:underline [&.active]:text-blue-500">
                {t('header.createAccount')}
              </Link>
              <Link to="/login" className="hover:underline [&.active]:text-blue-500">
                {t('header.login')}
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
