import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const servicesItems = [
    { label: 'Consultation et accompagnement sur le terrain', href: '/consultation' },
    { label: 'Formations Intra-entreprises', href: '/formations-intra' },
    { label: 'Nos formations', href: '/formations' },
    { label: "Organisation d'événements et de démonstrations", href: '#evenements' },
  ];

  const menuItems = [
    { label: 'Accueil', href: '/' },
    { label: 'BCOS ONLINE', href: '#bcos-online' },
    { label: 'Blog', href: '/blog' },
    { label: 'Qui sommes-nous', href: '#about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full py-6 z-50">
      {/* Navigation bar container */}
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-full px-8 py-3.5 shadow-lg flex items-center justify-between gap-4 max-w-6xl mx-auto">
          {/* Logo */}
          <a href="#" className="flex items-center z-50 flex-shrink-0">
            <Logo className="h-10 w-auto" />
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            <a
              href="/"
              className="text-sm font-medium text-gray-800 hover:text-primary transition-colors whitespace-nowrap"
            >
              Accueil
            </a>
            
            {/* Nos services dropdown */}
            <DropdownMenu onOpenChange={setIsServicesOpen}>
              <DropdownMenuTrigger className="text-sm font-medium text-gray-800 hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1 outline-none">
                Nos services
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[280px]">
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <a href={item.href} className="cursor-pointer">
                      {item.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {menuItems.slice(1).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-800 hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Button 
              size="sm" 
              className="rounded-full bg-primary hover:bg-primary-hover text-white shadow-md px-6 py-2.5 font-medium"
            >
              Book Audit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden z-50 p-2 text-gray-800 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden relative mt-4">
          <div className="bg-white rounded-2xl shadow-lg mx-4 border border-gray-100">
            <nav className="px-6 py-6 flex flex-col space-y-4">
              <a
                href="/"
                className="text-base font-medium text-gray-800 hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accueil
              </a>
              
              {/* Mobile Services Dropdown */}
              <div className="flex flex-col">
                <button
                  className="text-base font-medium text-gray-800 hover:text-primary transition-colors py-2 text-left flex items-center justify-between"
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                >
                  Nos services
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileServicesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {servicesItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-primary transition-colors py-1 block"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileServicesOpen(false);
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              {menuItems.slice(1).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-base font-medium text-gray-800 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
              </a>
            ))}
              <div className="pt-4 border-t border-gray-200">
                <Button className="rounded-full gradient-primary w-full shadow-md">
                  Book Audit
              </Button>
            </div>
          </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
