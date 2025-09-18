import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSeedling } from 'react-icons/fa';

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-md py-4">
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Website Name and Icon */}
        <div className="flex items-center space-x-2">
          <FaSeedling className="text-green-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">{t('krishi_mitra')}</h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><a href="/" className="hover:text-green-600 transition duration-300">{t('home')}</a></li>
          <li><a href="/profile" className="hover:text-green-600 transition duration-300">{t('profile')}</a></li>
          <li><a href="/faqs" className="hover:text-green-600 transition duration-300">{t('faqs')}</a></li>
          <li><a href="/crop-disease" className="hover:text-green-600 transition duration-300">{t('crop_disease')}</a></li>
          <li><a href="/predict-crop" className="hover:text-green-600 transition duration-300">{t('predict_crop')}</a></li>
        </ul>

        {/* Language Switcher */}
        <div className="flex space-x-4">
          <button onClick={() => changeLanguage('en')} className="font-medium text-gray-700 hover:text-green-600">English</button>
          <button onClick={() => changeLanguage('hi')} className="font-medium text-gray-700 hover:text-green-600">हिन्दी</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;