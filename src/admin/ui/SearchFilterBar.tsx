import { Search, SlidersHorizontal, X } from 'lucide-react';
import { AdminButton } from './Button';

interface SearchFilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
  options: string[];
}

export function SearchFilterBar({ query, onQueryChange, filter, onFilterChange, options }: SearchFilterBarProps) {
  const active = Boolean(query || filter !== 'All');
  return (
    <div className="flex flex-col gap-3 rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface-subtle)] p-3 sm:flex-row sm:items-end">
      <label className="min-w-0 flex-1">
        <span className="mb-1.5 block text-xs font-bold text-[var(--admin-heading)]">Search content</span>
        <span className="relative block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" aria-hidden="true" />
          <input
            type="search"
            className="admin-control pl-10 pr-3.5"
            placeholder="Search by title, SKU, or keyword…"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </span>
      </label>
      <label className="sm:w-48">
        <span className="mb-1.5 block text-xs font-bold text-[var(--admin-heading)]">Status</span>
        <span className="relative block">
          <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" aria-hidden="true" />
          <select className="admin-control pl-10 pr-3" value={filter} onChange={(event) => onFilterChange(event.target.value)}>
            {options.map((option) => <option key={option}>{option}</option>)}
          </select>
        </span>
      </label>
      <AdminButton
        variant="ghost"
        disabled={!active}
        onClick={() => { onQueryChange(''); onFilterChange('All'); }}
        className="sm:mb-0"
      >
        <X className="h-4 w-4" aria-hidden="true" /> Clear
      </AdminButton>
    </div>
  );
}
