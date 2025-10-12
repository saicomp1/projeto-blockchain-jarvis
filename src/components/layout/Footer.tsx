import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { XIcon } from '@/components/icons/XIcon';

/**
 * Footer - Site footer with links and social
 * Accessibility: Proper heading structure, semantic HTML
 */

const footerLinks = {
  product: [
    { name: 'Recursos', href: '/#features' },
    { name: 'Carteira', href: '/wallet' },
    { name: 'Explorador', href: '/explorer' },
    { name: 'Serviços', href: '/services' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Documentação', href: '/docs' },
    { name: 'Referência API', href: '/api-docs' },
    { name: 'Segurança', href: '/security' },
  ],
  company: [
    { name: 'Sobre', href: '/about' },
    { name: 'Contato', href: '/contact' },
    { name: 'Carreiras', href: '/careers' },
    { name: 'Política de Privacidade', href: '/privacy' },
  ],
};

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'X', href: 'https://x.com', icon: XIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Email', href: 'mailto:contact@jarvis.com', icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold text-bitcoin mb-4">Jarvis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Seu portal seguro para o mundo blockchain. Construído com segurança e UX em mente.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-bitcoin dark:hover:text-bitcoin transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Produto</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitcoin dark:hover:text-bitcoin transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recursos</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitcoin dark:hover:text-bitcoin transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitcoin dark:hover:text-bitcoin transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
            © {currentYear} Jarvis. Construído com <Heart className="h-4 w-4 text-red-500" /> pela Equipe Jarvis.
          </p>
          <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-2">
            Auditado em segurança. Código aberto. Licença MIT.
          </p>
        </div>
      </div>
    </footer>
  );
}
