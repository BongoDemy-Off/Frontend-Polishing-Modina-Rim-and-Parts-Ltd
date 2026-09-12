import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Menu, ShieldAlert, UserRound, X } from 'lucide-react';
import type { AdminRouteMeta } from '../types';

export function AdminTopbar({ meta, onOpenSidebar }: { meta: AdminRouteMeta; onOpenSidebar: () => void }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setProfileOpen(false);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setProfileOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', escape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between gap-3 border-b border-[var(--admin-border)] bg-white/95 px-3 backdrop-blur-sm sm:px-5 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" onClick={onOpenSidebar} aria-label="Open Admin navigation" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[var(--admin-heading)] hover:bg-slate-100 lg:hidden">
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="min-w-0">
          <p className="truncate text-[11px] font-extrabold uppercase tracking-[0.09em] text-[var(--admin-muted)]">{meta.section} <span aria-hidden="true">/</span></p>
          <p className="truncate text-sm font-extrabold text-[var(--admin-heading)] sm:text-base">{meta.title}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <a href="/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--admin-border-strong)] bg-white px-3 text-sm font-bold text-[var(--admin-heading)] no-underline hover:bg-slate-50 sm:px-4">
          <span className="hidden sm:inline">View Website</span><ExternalLink className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only sm:hidden">View Website</span>
        </a>
        <div ref={profileRef} className="relative">
          <button type="button" aria-haspopup="menu" aria-expanded={profileOpen} onClick={() => setProfileOpen((value) => !value)} className="flex min-h-11 items-center gap-2 rounded-lg border border-transparent px-2 text-left hover:border-[var(--admin-border)] hover:bg-slate-50 sm:px-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-700"><UserRound className="h-4 w-4" aria-hidden="true" /></span>
            <span className="hidden lg:block">
              <span className="block text-xs font-extrabold text-[var(--admin-heading)]">Demo administrator</span>
              <span className="block text-[10px] font-semibold text-[var(--admin-muted)]">Layout preview</span>
            </span>
          </button>
          {profileOpen && (
            <div role="menu" className="absolute right-0 top-[calc(100%+8px)] w-[min(280px,calc(100vw-24px))] rounded-xl border border-[var(--admin-border)] bg-white p-3 shadow-xl">
              <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-3 text-amber-900">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div className="min-w-0"><p className="text-sm font-extrabold">Prototype profile only</p><p className="mt-1 text-xs leading-5">No account, session, permissions, or authentication exists in Task 4A.</p></div>
              </div>
              <button type="button" role="menuitem" onClick={() => setProfileOpen(false)} className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-bold text-[var(--admin-muted)] hover:bg-slate-100">
                <X className="h-4 w-4" aria-hidden="true" /> Close
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
