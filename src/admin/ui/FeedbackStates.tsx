import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Inbox, LoaderCircle, X } from 'lucide-react';
import { AdminButton } from './Button';

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-5 py-10 text-center">
      <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600"><Inbox className="h-5 w-5" aria-hidden="true" /></span>
      <h3 className="font-extrabold text-[var(--admin-heading)]">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-[var(--admin-muted)]">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = 'Loading preview…' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center gap-3 rounded-lg border border-[var(--admin-border)] bg-slate-50 p-4 text-sm font-semibold text-[var(--admin-muted)]">
      <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> {label}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h3 className="font-extrabold text-red-900">Content could not be loaded</h3>
          <p className="mt-1 text-sm text-red-800">This is a recoverable visual pattern. No request was sent in this UI preview.</p>
          {onRetry && <AdminButton variant="secondary" className="mt-3" onClick={onRetry}>Try again</AdminButton>}
        </div>
      </div>
    </div>
  );
}

export function DemoToast({ onClose }: { onClose: () => void }) {
  return (
    <div role="status" className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="font-extrabold text-emerald-900">Local UI feedback example</p>
        <p className="mt-0.5 text-sm text-emerald-800">Nothing was saved or sent to a backend.</p>
      </div>
      <button type="button" aria-label="Dismiss feedback example" onClick={onClose} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-emerald-800 hover:bg-emerald-100">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
