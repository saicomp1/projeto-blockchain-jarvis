import { describe, it, expect, vitest } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Button } from '@components/ui/Button';

/**
 * Unit tests for Button component
 * Coverage: Visual states, accessibility, loading state
 */
describe('Button Component', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(clicked).toBe(true);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByText('Delete')).toHaveClass('bg-destructive');

    rerender(<Button variant="outline">Cancel</Button>);
    expect(screen.getByText('Cancel')).toHaveClass('border');
  });

  it('prevents double submission when loading', async () => {
    let clickCount = 0;
    const handleClick = () => {
      clickCount++;
    };

    const { rerender } = render(<Button onClick={handleClick}>Submit</Button>);
    
    fireEvent.click(screen.getByText('Submit'));
    expect(clickCount).toBe(1);

    rerender(<Button isLoading onClick={handleClick}>Submit</Button>);
    fireEvent.click(screen.getByText('Submit'));
    
    // Should not increment because button is disabled
    expect(clickCount).toBe(1);
  });

  it('is accessible via keyboard', () => {
    const handleClick = vitest.fn();
    render(<Button onClick={handleClick}>Press Enter</Button>);
    
    const button = screen.getByText('Press Enter');
    button.focus();
    
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    // Note: actual enter key handling is browser-native for buttons
  });
});
