import type { Biodata } from '@/lib/schema';
import { format } from 'date-fns';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User, CakeSlice, Ruler, BookOpen, Briefcase, Users, Phone, Home, Landmark } from 'lucide-react';

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | null }) => {
  if (!value) return null;
  return (
    <div className="flex items-start text-sm">
      <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-primary">{icon}</div>
      <div className="ml-3">
        <p className="font-semibold text-muted-foreground">{label}</p>
        <p className="text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default function TemplateClassic(props: Biodata) {
  const { dob, ...rest } = props;
  const formattedDob = dob ? format(dob, 'PPP') : 'Not specified';
  
  return (
    <div className="font-body p-6 rounded-lg border border-border shadow-sm bg-card text-card-foreground">
      <header className="text-center mb-6">
        <h1 className="font-headline text-3xl font-bold text-primary">{props.fullName || 'Full Name'}</h1>
        <p className="text-muted-foreground">Marriage Biodata</p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center">
            <Avatar className="w-40 h-40 border-4 border-primary shadow-lg">
                <AvatarImage src={props.profileImage || `https://placehold.co/200x200.png`} data-ai-hint="profile person" alt={props.fullName || 'Profile'} />
                <AvatarFallback>
                    <User className="w-16 h-16" />
                </AvatarFallback>
            </Avatar>
        </div>

        <div className="md:w-2/3 space-y-4">
          <h2 className="font-headline text-xl font-semibold text-primary border-b pb-2">Personal Details</h2>
          <DetailItem icon={<CakeSlice size={18}/>} label="Date of Birth" value={formattedDob} />
          <DetailItem icon={<Ruler size={18}/>} label="Height" value={props.height} />
          <DetailItem icon={<Landmark size={18}/>} label="Religion / Caste" value={`${props.religion || ''} / ${props.caste || ''}`} />
          <DetailItem icon={<BookOpen size={18}/>} label="Education" value={props.education} />
          <DetailItem icon={<Briefcase size={18}/>} label="Occupation" value={props.occupation} />
        </div>
      </div>
      
      <Separator className="my-6" />

      <div>
        <h2 className="font-headline text-xl font-semibold text-primary border-b pb-2 mb-4">Family & Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <DetailItem icon={<Users size={18}/>} label="Father's Name" value={props.fatherName} />
          <DetailItem icon={<Users size={18}/>} label="Mother's Name" value={props.motherName} />
          <DetailItem icon={<Users size={18}/>} label="Siblings" value={props.siblings} />
          <DetailItem icon={<Phone size={18}/>} label="Contact" value={props.contact} />
          <div className="md:col-span-2">
            <DetailItem icon={<Home size={18}/>} label="Address" value={props.address} />
          </div>
        </div>
      </div>
    </div>
  );
}
