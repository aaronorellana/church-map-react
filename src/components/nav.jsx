import React from "react";
import useLanguageStore from "../store/useLanguageStore";

export default function Nav() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "es" : "en"));
  };

  return (
    <nav className="bg-white mb-8 pb-1 border-b-[1px] border-gray-200">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              {language === "en" ? (
                <a href="/en">
                  <img
                    className="block h-12 w-auto lg:hidden"
                    src="/logo-vertical-en-flat.svg"
                    alt="ULPC"
                  />
                  <img
                    className="hidden h-12 w-auto lg:block"
                    src="/logo-horizontal-en-flat.svg"
                    alt="ULPC"
                  />
                </a>
              ) : (
                <a href="/">
                  <img
                    className="block h-12 w-auto lg:hidden"
                    src="/logo-vertical-flat.svg"
                    alt="IPUL"
                  />
                  <img
                    className="hidden h-12 w-auto lg:block"
                    src="/logo-horizontal-flat.svg"
                    alt="IPUL"
                  />
                </a>
              )}
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {language === "en" ? (
                <>
                  <a
                    href="https://ipul.us/en/home/"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-primary hover:border-gray-300 hover:text-gray-700 uppercase"
                  >
                    Home
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="https://ipul.us"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-primary hover:border-gray-300 hover:text-gray-700 uppercase"
                  >
                    Inicio
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              className="button-language py-6 px-8"
              onClick={toggleLanguage}
            >
              {language === "en" ? "ESPAÑOL" : "ENGLISH"}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden sm:hidden" id="mobile-menu">
        <div className="space-y-1 pb-4 pt-2">
          {language === "en" ? (
            <>
              <a
                href="/home"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-primary hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 uppercase"
              >
                Home
              </a>
            </>
          ) : (
            <>
              <a
                href="/inicio"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-primary hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 uppercase"
              >
                Inicio
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
