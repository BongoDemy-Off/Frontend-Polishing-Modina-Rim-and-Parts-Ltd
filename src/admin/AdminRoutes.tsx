import { Route, Routes } from 'react-router-dom';
import './admin.css';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import FoundationPreview from './pages/FoundationPreview';
import ModulePlaceholder from './pages/ModulePlaceholder';
import { adminRouteMeta } from './data/navigation';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="foundation" element={<FoundationPreview />} />
        {adminRouteMeta
          .filter((meta) => meta.path !== '/admin/dashboard')
          .map((meta) => (
            <Route key={meta.path} path={meta.path.replace('/admin/', '')} element={<ModulePlaceholder meta={meta} />} />
          ))}
        <Route path="*" element={<ModulePlaceholder meta={{ ...adminRouteMeta[0], title: 'Admin Page Not Found', description: 'The requested Admin route is not part of the current UI foundation.' }} />} />
      </Route>
    </Routes>
  );
}
