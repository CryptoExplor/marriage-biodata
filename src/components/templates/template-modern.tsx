import type { Biodata } from '@/lib/schema';
import { format } from 'date-fns';
import Image from 'next/image';
import { User, CakeSlice, Ruler, BookOpen, Briefcase, Users, Phone, Home, Landmark } from 'lucide-react';

const InfoPill = ({ label, value }: { label: string, value?: string | null }) => {
    if (!value) return null;
    return (
        <div className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs">
            <strong>{label}:</strong> {value}
        </div>
    )
}

export default function TemplateModern(props: Biodata) {
  const { dob, ...rest } = props;
  const formattedDob = dob ? format(dob, 'do MMMM yyyy') : '';

  return (
    <div className="font-body rounded-lg overflow-hidden border border-border shadow-lg bg-card text-card-foreground">
        <div className="h-32 bg-gradient-to-r from-accent to-primary"></div>
        <div className="p-6">
            <div className="flex items-end -mt-20">
                <Image 
                    src={props.profileImage || 'https://placehold.co/128x128.png'}
                    alt={props.fullName || 'Profile'}
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-background bg-background object-cover"
                    data-ai-hint="portrait person"
                />
                <div className="ml-4">
                    <h1 className="font-headline text-3xl font-bold text-primary">{props.fullName || 'Your Name'}</h1>
                    <p className="text-muted-foreground">{props.occupation || 'Occupation'}</p>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                <InfoPill label="Born" value={formattedDob} />
                <InfoPill label="Height" value={props.height} />
                <InfoPill label="Religion" value={props.religion} />
                <InfoPill label="Caste" value={props.caste} />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="font-headline text-lg font-semibold text-primary flex items-center gap-2"><BookOpen size={20}/> Education</h2>
                    <p className="text-foreground">{props.education || 'Your education details here.'}</p>
                </div>
                 <div className="space-y-4">
                    <h2 className="font-headline text-lg font-semibold text-primary flex items-center gap-2"><Users size={20}/> Family</h2>
                    <ul className="list-disc list-inside text-foreground space-y-1">
                        <li><strong>Father:</strong> {props.fatherName || 'Not specified'}</li>
                        <li><strong>Mother:</strong> {props.motherName || 'Not specified'}</li>
                        {props.siblings && <li><strong>Siblings:</strong> {props.siblings}</li>}
                    </ul>
                </div>
                 <div className="space-y-4">
                    <h2 className="font-headline text-lg font-semibold text-primary flex items-center gap-2"><Phone size={20}/> Contact</h2>
                    <p className="text-foreground">{props.contact || 'Your contact number.'}</p>
                </div>
                 <div className="space-y-4">
                    <h2 className="font-headline text-lg font-semibold text-primary flex items-center gap-2"><Home size={20}/> Address</h2>
                    <p className="text-foreground">{props.address || 'Your current address.'}</p>
                </div>
            </div>
        </div>
    </div>
  );
}
