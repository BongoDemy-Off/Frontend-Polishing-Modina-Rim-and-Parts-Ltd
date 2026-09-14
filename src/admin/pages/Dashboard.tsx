import { Link } from 'react-router-dom';
import { Activity, ArrowRight, BriefcaseBusiness, FileText, ImagePlus, Mail, Newspaper, Package, Plus, ShieldCheck } from 'lucide-react';
import { dashboardMetrics, recentActivity, draftRows, messageRows, applicationRows, certificateRows, type DraftRow, type MessageRow } from '../data/dashboard';
import { adminButtonClass } from '../ui/Button';
import { MetricCard, SectionCard } from '../ui/Card';
import { PageHeader } from '../ui/PageHeader';
import { ResponsiveDataList, type DataColumn } from '../ui/ResponsiveDataList';
import { StatusBadge } from '../ui/StatusBadge';

const metricIcons = [Package, FileText, Mail, BriefcaseBusiness];

const draftColumns: DataColumn<DraftRow>[] = [
  { key: 'title', label: 'Content', width: '44%', render: (row) => <><p className={`font-bold leading-5 text-[var(--admin-heading)] ${row.type.includes('বাংলা') ? 'admin-bn-text' : ''}`}>{row.title}</p><p className="mt-1 text-xs text-[var(--admin-muted)]">{row.type}</p></> },
  { key: 'editor', label: 'Editor', width: '20%', render: (row) => row.editor },
  { key: 'updated', label: 'Updated', width: '18%', render: (row) => row.updated },
  { key: 'status', label: 'Status', width: '18%', render: (row) => <StatusBadge status={row.status} /> },
];

const messageColumns: DataColumn<MessageRow>[] = [
  { key: 'sender', label: 'Sender', width: '28%', render: (row) => <p className="font-bold text-[var(--admin-heading)]">{row.sender}</p> },
  { key: 'subject', label: 'Subject', width: '44%', render: (row) => row.subject },
  { key: 'received', label: 'Received', width: '15%', render: (row) => row.received },
  { key: 'status', label: 'Status', width: '13%', render: (row) => <StatusBadge status={row.status} /> },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader
        eyebrow="Operational overview"
        title="Dashboard"
        description="A focused preview of the content and communication information future administrators will manage."
        actions={<Link to="/admin/foundation" className={adminButtonClass('secondary')}>Review UI patterns <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
      />

      <div className="flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-950">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-extrabold">Demo data — Admin UI foundation only</p>
          <p className="mt-0.5 text-xs leading-5 text-sky-800">Nothing on this dashboard is live, persisted, authenticated, published, uploaded, or connected to a backend.</p>
        </div>
      </div>

      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">Content summary</h2>
        <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {dashboardMetrics.map((metric, index) => <MetricCard key={metric.label} {...metric} icon={metricIcons[index]} />)}
        </div>
      </section>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
        <div className="min-w-0 space-y-6">
          <SectionCard title="Recent Activity" description="Illustrative content operations from the mock workspace">
            <ol className="divide-y divide-[var(--admin-border)]">
              {recentActivity.map((item) => (
                <li key={item.id} className="flex gap-3 px-4 py-4 sm:px-5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600"><Activity className="h-4 w-4" aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <p className="font-extrabold text-[var(--admin-heading)]">{item.action}</p>
                      <time className="shrink-0 text-xs font-semibold text-[var(--admin-muted)]">{item.time}</time>
                    </div>
                    <p className="mt-1 break-words text-sm leading-5 text-[var(--admin-text)]">{item.detail}</p>
                    <p className="mt-1 text-xs text-[var(--admin-muted)]">By {item.actor}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionCard>

          <SectionCard title="Drafts Awaiting Publication" description="Mock drafts and scheduled content; no publishing action is connected">
            <ResponsiveDataList rows={draftRows} columns={draftColumns} getPrimaryLabel={(row) => row.title} />
          </SectionCard>

          <SectionCard title="Recent Contact Messages" description="Sample enquiries for future inbox workflow">
            <ResponsiveDataList rows={messageRows} columns={messageColumns} getPrimaryLabel={(row) => row.subject} />
          </SectionCard>
        </div>

        <aside className="min-w-0 space-y-6">
          <SectionCard title="Quick Actions" description="Links open planned module placeholders">
            <div className="grid grid-cols-1 gap-2 p-4 min-[420px]:grid-cols-2 xl:grid-cols-1">
              {[
                { label: 'Add Product', path: '/admin/products/new', icon: Plus },
                { label: 'New Blog Post', path: '/admin/blog/new', icon: FileText },
                { label: 'New News Article', path: '/admin/news/new', icon: Newspaper },
                { label: 'Upload Media', path: '/admin/media', icon: ImagePlus },
              ].map((action) => {
                const Icon = action.icon;
                return <Link key={action.label} to={action.path} className={adminButtonClass(action.label === 'Add Product' ? 'primary' : 'secondary', 'justify-start')}><Icon className="h-4 w-4" aria-hidden="true" /> {action.label}</Link>;
              })}
            </div>
          </SectionCard>

          <SectionCard title="Certificate Expiry" description="Example renewal visibility">
            <div className="divide-y divide-[var(--admin-border)]">
              {certificateRows.map((item) => (
                <article key={item.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--admin-muted)]" aria-hidden="true" />
                    <div className="min-w-0"><p className="break-words text-sm font-extrabold leading-5 text-[var(--admin-heading)]">{item.name}</p><p className="mt-1 text-xs text-[var(--admin-muted)]">Expires {item.expiry} · {item.remaining}</p><div className="mt-2"><StatusBadge status={item.status} /></div></div>
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Recent Job Applications" description="Synthetic candidate review status — no real submissions" action={<Link to="/admin/job-applications" className={adminButtonClass('ghost', 'px-3')}>View all <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}>
            <div className="divide-y divide-[var(--admin-border)]">
              {applicationRows.map((item) => (
                <Link key={item.id} to={`/admin/job-applications/${item.id}`} className="block p-4 no-underline hover:bg-slate-50" aria-label={`View synthetic application from ${item.applicant}`}>
                  <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="font-extrabold text-[var(--admin-heading)]">{item.applicant}</p><p className="mt-1 break-words text-sm text-[var(--admin-text)]">{item.role}</p><p className="mt-1 text-xs text-[var(--admin-muted)]">{item.date}</p></div><StatusBadge status={item.status} /></div>
                </Link>
              ))}
            </div>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
