import { Link } from "@tanstack/react-router";
import { useAuthenticateContext } from "../../context/authenticate";
import { Avatar } from "../Avatar";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

export function Header() {
  const { isAuthenticate } = useAuthenticateContext();
  const { t } = useTranslation();

  return (
    <header className="w-full flex justify-between items-center text-white p-4">
      <Link to="/" className="text-2xl font-bold">
        {t("header.title")}
      </Link>
      <nav className="flex items-center gap-4">
        <LanguageSwitcher />
        <ul className="flex gap-3 justify-center items-center">
          {isAuthenticate ? (
            <Avatar />
          ) : (
            <>
              <Link
                to="/register"
                className="[&.active]:text-blue-500 hover:underline"
              >
                {t("header.createAccount")}
              </Link>
              <Link
                to="/login"
                className="[&.active]:text-blue-500 hover:underline"
              >
                {t("header.login")}
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
