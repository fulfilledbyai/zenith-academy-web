import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
interface NavItem {
  label: string;
  path: string;
  submenu?: {
    label: string;
    path: string;
  }[];
}
const Header: React.FC = () => {
  const {
    t
  } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems: NavItem[] = [{
    label: t('nav.home'),
    path: '/'
  }, {
    label: t('nav.courses'),
    path: '/courses',
    submenu: [{
      label: t('courses.individual'),
      path: '/courses/individuals'
    }, {
      label: t('courses.organization'),
      path: '/courses/organizations'
    }, {
      label: t('courses.teachers'),
      path: '/courses/teachers'
    }, {
      label: t('courses.students'),
      path: '/courses/students'
    }]
  }, {
    label: t('nav.about'),
    path: '/about',
    submenu: [{
      label: t('about.foundation'),
      path: '/about/foundation'
    }, {
      label: t('about.sevan'),
      path: '/about/sevan-center'
    }]
  }, {
    label: t('nav.news'),
    path: '/news'
  }, {
    label: t('nav.contact'),
    path: '/contact'
  }];
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  return <header className={cn('fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300', scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4')}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="logo-container group relative z-20">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <img src="/lovable-uploads/4ffe75bd-c26d-4335-a7fd-5714846d2b91.png" alt="Zenith Logo Symbol" className="w-full h-full object-contain logo-animation" />
            </div>
            <div className="hidden md:block">
              
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map(item => <div key={item.path} className="relative group">
              <Link to={item.path} className={cn('nav-item', location.pathname === item.path && 'active')}>
                {item.label}
                {item.submenu && <ChevronDown className="inline-block ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />}
              </Link>
              
              {item.submenu && <div className="dropdown-menu">
                  <div className="py-2">
                    {item.submenu.map(subItem => <Link key={subItem.path} to={subItem.path} className="block px-4 py-2 hover:bg-muted transition-colors">
                        {subItem.label}
                      </Link>)}
                  </div>
                </div>}
            </div>)}
        </nav>

        {/* Language Selector and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
          
          <button className="lg:hidden relative z-20" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn("fixed inset-0 bg-white/95 backdrop-blur-md z-10 lg:hidden transition-transform duration-300 ease-in-out", isMenuOpen ? "translate-x-0" : "translate-x-full")}>
          <div className="container mx-auto px-4 pt-24 pb-8">
            <nav className="flex flex-col space-y-4">
              {navItems.map(item => <div key={item.path} className="border-b border-muted pb-2">
                  <Link to={item.path} className="block py-2 font-medium text-lg">
                    {item.label}
                  </Link>
                  
                  {item.submenu && <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map(subItem => <Link key={subItem.path} to={subItem.path} className="block py-1 text-muted-foreground">
                          {subItem.label}
                        </Link>)}
                    </div>}
                </div>)}
            </nav>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;