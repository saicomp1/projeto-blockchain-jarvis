import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { Button, Input, Textarea } from '@components/ui';
import { useToast } from '@contexts';
import { sanitizeInput } from '@utils';
import { apiClient } from '@api';

/**
 * ContactForm - Contact form with Zod validation
 * Security: All inputs sanitized before submission
 * Validation: Email format, required fields, max lengths
 */

// Zod validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome não pode exceder 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome pode conter apenas letras, espaços, hífens e apóstrofos'),
  email: z
    .string()
    .email('Endereço de email inválido')
    .max(255, 'Email não pode exceder 255 caracteres'),
  subject: z
    .string()
    .min(5, 'Assunto deve ter pelo menos 5 caracteres')
    .max(200, 'Assunto não pode exceder 200 caracteres'),
  message: z
    .string()
    .min(20, 'Mensagem deve ter pelo menos 20 caracteres')
    .max(2000, 'Mensagem não pode exceder 2000 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { success, error: showError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Security: Sanitize all inputs before sending
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message),
      };

      // Send to API (assuming /api/contact endpoint exists)
      await apiClient.post('/contact', sanitizedData);

      success('Mensagem enviada com sucesso! Retornaremos em breve.');
      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      showError('Falha ao enviar mensagem. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
          Nome <span className="text-red-500">*</span>
        </label>
        <Input
          id="contact-name"
          type="text"
          placeholder="João Silva"
          {...register('name')}
          className={errors.name ? 'border-red-500 focus:ring-red-500' : ''}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="contact-email"
          type="email"
          placeholder="john@example.com"
          {...register('email')}
          className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium mb-2">
          Assunto <span className="text-red-500">*</span>
        </label>
        <Input
          id="contact-subject"
          type="text"
          placeholder="Sobre o que é?"
          {...register('subject')}
          className={errors.subject ? 'border-red-500 focus:ring-red-500' : ''}
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
          Mensagem <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="contact-message"
          rows={6}
          placeholder="Conte-nos mais sobre sua solicitação..."
          {...register('message')}
          className={errors.message ? 'border-red-500 focus:ring-red-500' : ''}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {register('message').name && 'Mínimo de 20 caracteres'}
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="w-full"
      >
        <Send className="mr-2 h-4 w-4" />
        {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
      </Button>

      {/* Security Note */}
      <p className="text-xs text-center text-gray-600 dark:text-gray-400">
        Suas informações estão seguras. Nunca compartilhamos seus dados com terceiros.
      </p>
    </form>
  );
}
