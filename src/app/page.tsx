'use client';

import { useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { biodataSchema, type Biodata } from '@/lib/schema';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import AppHeader from '@/components/app-header';
import BiodataForm from '@/components/biodata-form';
import BiodataPreview from '@/components/biodata-preview';
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const { toast } = useToast()
  const [template, setTemplate] = useState('classic');
  const previewRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<Biodata>({
    resolver: zodResolver(biodataSchema),
    defaultValues: {
      fullName: '',
      height: '',
      religion: '',
      caste: '',
      education: '',
      occupation: '',
      fatherName: '',
      motherName: '',
      siblings: '',
      contact: '',
      address: '',
      profileImage: '',
    },
  });

  const formData = form.watch();

  const handleJsonExport = () => {
    const data = JSON.stringify(form.getValues(), (key, value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    }, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'biodata.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Export Successful",
      description: "Your biodata has been exported to JSON.",
    })
  };

  const handlePdfExport = async () => {
    const previewElement = previewRef.current;
    if (!previewElement) return;

    const { dismiss } = toast({
      title: "Exporting PDF...",
      description: "Please wait while we generate your PDF.",
    })

    try {
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true, 
        backgroundColor: '#F5F5DC'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('biodata.pdf');
      
      dismiss();
      toast({
        title: "Export Successful",
        description: "Your biodata has been exported to PDF.",
      });

    } catch (error) {
      console.error("Failed to export PDF", error)
      dismiss();
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Something went wrong while exporting to PDF.",
      })
    }
  };

  return (
    <FormProvider {...form}>
      <div className="min-h-screen w-full bg-background">
        <AppHeader onPdfExport={handlePdfExport} onJsonExport={handleJsonExport} />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <BiodataForm />
            </div>
            <div className="lg:col-span-3">
              <BiodataPreview
                ref={previewRef}
                formData={formData}
                template={template}
                setTemplate={setTemplate}
              />
            </div>
          </div>
        </main>
      </div>
    </FormProvider>
  );
}
