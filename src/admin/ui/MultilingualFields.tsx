import { useState } from 'react';
import { AlertCircle, CheckCircle2, Languages } from 'lucide-react';
import { AdminInput, AdminTextarea } from './FormControls';
import { cn } from '../../lib/utils';

type Language = 'en' | 'bn';

export function MultilingualFields() {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--admin-border)] bg-slate-50 p-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--admin-muted)]">Shared fields</p>
          <p className="mt-1 text-sm text-[var(--admin-text)]">SKU · status · category · media · sort order</p>
        </div>
        <div className="rounded-lg border border-[var(--admin-border)] bg-slate-50 p-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--admin-muted)]">Translated fields</p>
          <p className="mt-1 text-sm text-[var(--admin-text)]">Name · description · body · captions · SEO text</p>
        </div>
      </div>

      <div role="tablist" aria-label="Content language" className="inline-flex w-full rounded-lg border border-[var(--admin-border)] bg-slate-100 p-1 sm:w-auto">
        <button
          type="button"
          role="tab"
          aria-selected={language === 'en'}
          onClick={() => setLanguage('en')}
          className={cn('flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold sm:flex-none', language === 'en' ? 'bg-white text-[var(--admin-heading)] shadow-sm' : 'text-[var(--admin-muted)]')}
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" /> English <span className="hidden text-xs font-medium text-emerald-700 sm:inline">Complete</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={language === 'bn'}
          onClick={() => setLanguage('bn')}
          className={cn('admin-bn-text flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold sm:flex-none', language === 'bn' ? 'bg-white text-[var(--admin-heading)] shadow-sm' : 'text-[var(--admin-muted)]')}
        >
          <AlertCircle className="h-4 w-4 text-amber-600" aria-hidden="true" /> বাংলা <span className="hidden text-xs font-medium text-amber-700 sm:inline">২টি ঘর বাকি</span>
        </button>
      </div>

      <div role="tabpanel" className={cn('grid gap-4', language === 'bn' && 'admin-bn-text')}>
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--admin-muted)]"><Languages className="h-4 w-4" aria-hidden="true" /> {language === 'en' ? 'English content preview' : 'বাংলা কনটেন্ট প্রিভিউ'}</div>
        {language === 'en' ? (
          <>
            <AdminInput key="en-name" label="Product Name" defaultValue="Motor Cycle Center Stand" />
            <AdminTextarea key="en-description" label="Description" defaultValue="Heavy-duty centre stand engineered for dependable balance, stability, and long service life." />
          </>
        ) : (
          <>
            <AdminInput key="bn-name" className="admin-bn-text" label="পণ্যের নাম" defaultValue="মোটরসাইকেল সেন্টার স্ট্যান্ড" />
            <AdminTextarea key="bn-description" className="admin-bn-text" label="বিবরণ" placeholder="বাংলা বিবরণ এখনও লেখা হয়নি" error="এই অনুবাদটি সম্পূর্ণ করতে আরও ২টি ঘর পূরণ করুন।" />
          </>
        )}
      </div>
      <p className="text-xs text-[var(--admin-muted)]">Language switching is local UI state only. No translation is saved or submitted.</p>
    </div>
  );
}
