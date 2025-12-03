import { Facebook, Linkedin, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    services: [
      { label: 'Formations professionnelles', href: '#formations' },
      { label: 'Consulting', href: '#services' },
      { label: 'E-learning', href: '#elearning' },
      { label: 'Événements', href: '#services' },
    ],
    entreprise: [
      { label: 'À propos', href: '#about' },
      { label: 'Nos références', href: '#references' },
      { label: 'Blog', href: '#blog' },
      { label: 'Carrières', href: '#' },
    ],
    support: [
      { label: 'Contact', href: '#contact' },
      { label: 'FAQ', href: '#' },
      { label: 'Télécharger le catalogue', href: '#' },
      { label: 'Devenir formateur', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-bcos-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-bcos-lime/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-3xl font-heading font-bold gradient-primary bg-clip-text text-transparent mb-2">
                BCOS
              </h3>
              <p className="text-sm text-white/60">Formation & Conseil</p>
            </div>
            
            <p className="text-white/80 leading-relaxed max-w-md">
              Depuis 2006, BCOS accompagne les entreprises algériennes dans leur 
              développement à travers la formation, le conseil et l\'innovation.
            </p>

            <div className="space-y-3">
              <a href="tel:+213" className="flex items-center gap-3 text-white/80 hover:text-white transition-smooth">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+213 (0) 21 XX XX XX</span>
              </a>
              <a href="mailto:contact@bcos-dz.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-smooth">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span>contact@bcos-dz.com</span>
              </a>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-smooth hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg mb-4">Nos Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-smooth text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.entreprise.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-smooth text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-smooth text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© 2025 BCOS Formation & Conseil. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-smooth">
                Mentions légales
              </a>
              <a href="#" className="hover:text-white transition-smooth">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-white transition-smooth">
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
