import { categoryColors } from '@/data/content';

interface CategoryBadgeProps {
  category: string;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const colors = categoryColors[category] || { bg: 'bg-ink-100', text: 'text-ink-700', border: 'border-ink-200', dot: 'bg-ink-500' };
  const sizeClass = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${colors.bg} ${colors.text} ${colors.border} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {category}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'upcoming' | 'ongoing' | 'completed';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    upcoming: { label: 'Upcoming', className: 'bg-brand-50 text-brand-700 border-brand-200', dot: 'bg-brand-500' },
    ongoing: { label: 'Ongoing', className: 'bg-success-50 text-success-700 border-success-200', dot: 'bg-success-500 animate-pulse' },
    completed: { label: 'Completed', className: 'bg-ink-100 text-ink-500 border-ink-200', dot: 'bg-ink-400' },
  };
  const c = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${c.className}`}>
      <span className={`w-2 h-2 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

interface TagBadgeProps {
  label: string;
}

export function TagBadge({ label }: TagBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-lg bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-600">
      {label}
    </span>
  );
}
