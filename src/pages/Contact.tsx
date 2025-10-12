import { Mail, Github, Linkedin } from 'lucide-react';
import { Card } from '@components/ui';
import { ContactForm } from '@components/forms';
import { XIcon } from '@/components/icons/XIcon';

/**
 * Contact - Contact information and form page
 */

export default function Contact() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Tem dúvidas? Adoraríamos ouvir você. Envie-nos uma mensagem e responderemos o mais rápido possível.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-bitcoin/10">
                  <Mail className="h-6 w-6 text-bitcoin" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a
                    href="mailto:contact@jarvis.com"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-bitcoin"
                  >
                    contact@jarvis.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-ethereum/10">
                  <Github className="h-6 w-6 text-ethereum" />
                </div>
                <div>
                  <h3 className="font-semibold">GitHub</h3>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-ethereum"
                  >
                    github.com/jarvis
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gray-900/10 dark:bg-gray-100/10">
                  <XIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                </div>
                <div>
                  <h3 className="font-semibold">X</h3>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    @jarvis_crypto
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-600/10">
                  <Linkedin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">LinkedIn</h3>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600"
                  >
                    linkedin.com/company/jarvis
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Envie-nos uma mensagem</h2>
            <ContactForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
