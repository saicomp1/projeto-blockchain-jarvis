import { useState, useEffect } from 'react';

/**
 * useCopyToClipboard - Copy text to clipboard
 * Returns [copiedText, copy function, isCopied state]
 */

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): [string | null, CopyFn, boolean] {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setIsCopied(true);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      setCopiedText(null);
      setIsCopied(false);
      return false;
    }
  };

  // Reset isCopied after 2 seconds
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isCopied]);

  return [copiedText, copy, isCopied];
}
