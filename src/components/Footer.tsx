
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleLanguageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuElement = document.querySelector('header [role="menu"]');
    if (menuElement instanceof HTMLElement) {
      menuElement.click();
    }
  };

  return <footer className="bg-jet text-whiteSmoke py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img alt="Zenith Academy" src="/lovable-uploads/475d22a5-af87-4d95-af83-8c0443421565.png" className="h-20 object-contain" />
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              ՏՈՒԿ-ՖԱԱՌԱԼՊ © {currentYear}
              <br />
              {t('footer.rights')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('nav.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about/foundation" className="text-gray-400 hover:text-selectiveYellow transition-colors">
                  {t('about.foundation')}
                </Link>
              </li>
              <li>
                <Link to="/about/sevan-center" className="text-gray-400 hover:text-selectiveYellow transition-colors">
                  {t('about.sevan')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-selectiveYellow transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-selectiveYellow transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-rustyRed shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Yerevan, Armenia
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-rustyRed shrink-0" />
                <span className="text-gray-400">+374 10 123456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-rustyRed shrink-0" />
                <span className="text-gray-400">info@zenith.am</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.follow')}</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-gray-700 hover:bg-rustyRed p-2 rounded-full transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-gray-700 hover:bg-rustyRed p-2 rounded-full transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-gray-700 hover:bg-rustyRed p-2 rounded-full transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">Zenith Academy by @tezzarida</p>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">{t('footer.language')}:</span>
            <Link to="#" className="text-sm hover:text-selectiveYellow" onClick={handleLanguageClick}>
              {t('lang.armenian')} | {t('lang.french')} | {t('lang.english')}
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};

export default Footer;
