import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@components/ui';

/**
 * NotFound - 404 Page
 * Accessibility: Clear navigation, helpful message
 */

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-bitcoin">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Go back home
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline">Contact support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
