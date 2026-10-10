import type { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';
import { LinkButton } from '@/components/Button';
import type { Route } from '@/router';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  linkLabel?: string;
  linkTo?: Route;
  align?: 'left' | 'center';
}

export function SectionHeader({ eyebrow, title, description, linkLabel, linkTo, align = 'left' }: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <Reveal>
      <div className={`flex flex-col gap-4 mb-8 ${isCenter ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
        <div className={isCenter ? 'max-w-2xl' : 'max-w-xl'}>
          {eyebrow && (
            <span className="inline-block text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-ink-500 mt-2 leading-relaxed">{description}</p>
          )}
        </div>
        {linkLabel && linkTo && !isCenter && (
          <div className="flex-shrink-0">
            <LinkButton to={linkTo}>{linkLabel}</LinkButton>
          </div>
        )}
        {linkLabel && linkTo && isCenter && (
          <div className="mt-2">
            <LinkButton to={linkTo}>{linkLabel}</LinkButton>
          </div>
        )}
      </div>
    </Reveal>
  );
}

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 lg:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
