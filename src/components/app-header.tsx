'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { FileText, FileJson } from 'lucide-react';

interface AppHeaderProps {
  onPdfExport: () => void;
  onJsonExport: () => void;
}

export default function AppHeader({ onPdfExport, onJsonExport }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onJsonExport}>
            <FileJson />
            Export JSON
          </Button>
          <Button size="sm" onClick={onPdfExport}>
            <FileText />
            Export PDF
          </Button>
        </div>
      </div>
    </header>
  );
}
