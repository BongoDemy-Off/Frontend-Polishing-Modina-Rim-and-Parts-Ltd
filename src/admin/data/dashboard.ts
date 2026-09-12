import type { AdminStatus } from '../types';

export const dashboardMetrics = [
  { label: 'Products', value: '21', note: '3 highlighted on website', tone: 'red' as const },
  { label: 'Published Posts', value: '9', note: '2 drafts in review', tone: 'blue' as const },
  { label: 'New Messages', value: '7', note: 'Mock inbox count', tone: 'amber' as const },
  { label: 'Open Jobs', value: '3', note: '12 sample applications', tone: 'green' as const },
];

export const recentActivity = [
  { id: 1, action: 'Product updated', detail: 'Motor Cycle Center Stand — engineering image and dimensions reviewed', actor: 'Demo editor', time: '18 minutes ago' },
  { id: 2, action: 'Blog post published', detail: 'The Science Behind ISO 9001 and What It Means for Buyers', actor: 'Demo editor', time: '2 hours ago' },
  { id: 3, action: 'Hero slide changed', detail: 'Precision manufacturing for Bangladesh and beyond', actor: 'Demo administrator', time: 'Yesterday' },
  { id: 4, action: 'Gallery image added', detail: 'Final quality inspection — powder-coated CNG rim production line', actor: 'Demo editor', time: '2 days ago' },
];

export interface DraftRow {
  id: number;
  title: string;
  type: string;
  editor: string;
  updated: string;
  status: AdminStatus;
}

export const draftRows: DraftRow[] = [
  { id: 1, title: 'Expanded quality-control checklist for precision rim inspection and traceability', type: 'Blog', editor: 'Demo editor', updated: 'Today, 10:24', status: 'Draft' },
  { id: 2, title: 'মোটরসাইকেল সেন্টার স্ট্যান্ড — স্থায়িত্ব ও ভারসাম্যের বিস্তারিত বিবরণ', type: 'Product বাংলা', editor: 'Demo translator', updated: 'Yesterday', status: 'Draft' },
  { id: 3, title: 'National Manufacturing Excellence Expo — participation announcement', type: 'News & Event', editor: 'Demo editor', updated: '12 Sep 2026', status: 'Scheduled' },
];

export interface MessageRow {
  id: number;
  sender: string;
  subject: string;
  received: string;
  status: AdminStatus;
}

export const messageRows: MessageRow[] = [
  { id: 1, sender: 'Mahmudul Hasan, Eastern Mobility Components', subject: 'Request for technical specifications and dealership discussion for multiple rim categories', received: '24 min ago', status: 'New' },
  { id: 2, sender: 'Nusrat Jahan', subject: 'ISO certificate verification and factory visit availability', received: '3 hours ago', status: 'New' },
  { id: 3, sender: 'Rashed Auto Parts', subject: 'Product catalogue request for Jessore regional distribution', received: 'Yesterday', status: 'Reviewed' },
];

export const applicationRows = [
  { id: 1, applicant: 'Farzana Akter', role: 'Quality Assurance Executive', date: '13 Sep 2026', status: 'New' as AdminStatus },
  { id: 2, applicant: 'Md. Tanvir Hossain', role: 'CNC Machine Operator — experienced industrial manufacturing candidate', date: '12 Sep 2026', status: 'Reviewed' as AdminStatus },
  { id: 3, applicant: 'Sadia Rahman', role: 'Marketing & Communications Officer', date: '11 Sep 2026', status: 'Reviewed' as AdminStatus },
];

export const certificateRows = [
  { id: 1, name: 'ISO 9001:2015 — Quality Management System', expiry: '18 Dec 2026', remaining: '96 days', status: 'Expiring Soon' as AdminStatus },
  { id: 2, name: 'ISO 14001:2015 — Environmental Management System', expiry: '24 May 2027', remaining: '253 days', status: 'Valid' as AdminStatus },
];
