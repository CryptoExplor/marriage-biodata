'use client';

import React from 'react';
import type { Biodata } from '@/lib/schema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TemplateClassic from '@/components/templates/template-classic';
import TemplateModern from '@/components/templates/template-modern';

interface BiodataPreviewProps {
  formData: Biodata;
  template: string;
  setTemplate: (template: string) => void;
}

const BiodataPreview = React.forwardRef<HTMLDivElement, BiodataPreviewProps>(
  ({ formData, template, setTemplate }, ref) => {
    return (
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>Your biodata will update here in real-time.</CardDescription>
          <Tabs value={template} onValueChange={setTemplate} className="w-full pt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="classic">Classic</TabsTrigger>
              <TabsTrigger value="modern">Modern</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div ref={ref} className="bg-background rounded-lg p-2 md:p-4 min-h-[500px]">
            {template === 'classic' && <TemplateClassic {...formData} />}
            {template === 'modern' && <TemplateModern {...formData} />}
          </div>
        </CardContent>
      </Card>
    );
  }
);

BiodataPreview.displayName = 'BiodataPreview';
export default BiodataPreview;
