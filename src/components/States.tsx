import { Loader2, AlertTriangle } from 'lucide-react';
import { SectionWrapper } from '@/components/SectionHeader';
import { Button } from '@/components/Button';
import { ArrowLeft } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto mb-3" />
        <p className="text-sm text-ink-400 font-medium">Loading…</p>
      </div>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <SectionWrapper className="min-h-[50vh] flex items-center justify-center text-center">
      <div>
        <div className="w-14 h-14 rounded-xl bg-error-50 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-7 h-7 text-error-500" />
        </div>
        <h1 className="font-display font-bold text-xl text-ink-900 mb-2">Something went wrong</h1>
        <p className="text-sm text-ink-500 mb-6">{message}</p>
        <Button to={{ name: 'home' }} icon={<ArrowLeft className="w-4 h-4" />}>Back to Home</Button>
      </div>
    </SectionWrapper>
  );
}

export function NotFound({ title, message, backTo }: { title: string; message: string; backTo: 'societies' | 'events-upcoming' }) {
  return (
    <SectionWrapper className="min-h-[60vh] flex items-center justify-center text-center">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink-900 mb-3">{title}</h1>
        <p className="text-ink-500 mb-6">{message}</p>
        <Button to={{ name: backTo }} icon={<ArrowLeft className="w-4 h-4" />}>
          {backTo === 'societies' ? 'Back to Societies' : 'Browse Events'}
        </Button>
      </div>
    </SectionWrapper>
  );
}
