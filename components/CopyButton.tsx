'use client';

import { useState } from 'react';
import Button from './Button';

interface CopyButtonProps {
  text: string;
  copied?: boolean;
  className?: string;
}

export default function CopyButton({
  text,
  copied: externalCopied = false,
  className = '',
}: CopyButtonProps) {
  const [internalCopied, setInternalCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setInternalCopied(true);
      setTimeout(() => setInternalCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const isCopied = externalCopied || internalCopied;

  return (
    <Button
      onClick={handleCopy}
      variant="secondary"
      className={className}
    >
      {isCopied ? '✓ Copiado!' : '📋 Copiar'}
    </Button>
  );
}
