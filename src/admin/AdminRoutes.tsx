import { Route, Routes } from 'react-router-dom';
import './admin.css';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import FoundationPreview from './pages/FoundationPreview';
import ModulePlaceholder from './pages/ModulePlaceholder';
import ProductEditor from './pages/products/ProductEditor';
import ProductList from './pages/products/ProductList';
import BlogEditor from './pages/blog/BlogEditor';
import BlogList from './pages/blog/BlogList';
import NewsEditor from './pages/news/NewsEditor';
import NewsList from './pages/news/NewsList';
import GalleryEditor from './pages/gallery/GalleryEditor';
import GalleryList from './pages/gallery/GalleryList';
import DownloadEditor from './pages/downloads/DownloadEditor';
import DownloadsList from './pages/downloads/DownloadsList';
import FaqEditor from './pages/faq/FaqEditor';
import FaqList from './pages/faq/FaqList';
import { adminRouteMeta } from './data/navigation';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="foundation" element={<FoundationPreview />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductEditor mode="create" />} />
        <Route path="products/:id" element={<ProductEditor mode="edit" />} />
        <Route path="blog" element={<BlogList />} />
        <Route path="blog/new" element={<BlogEditor mode="create" />} />
        <Route path="blog/:id" element={<BlogEditor mode="edit" />} />
        <Route path="news" element={<NewsList />} />
        <Route path="news/new" element={<NewsEditor mode="create" />} />
        <Route path="news/:id" element={<NewsEditor mode="edit" />} />
        <Route path="gallery" element={<GalleryList />} />
        <Route path="gallery/new" element={<GalleryEditor mode="create" />} />
        <Route path="gallery/:id" element={<GalleryEditor mode="edit" />} />
        <Route path="downloads" element={<DownloadsList />} />
        <Route path="downloads/new" element={<DownloadEditor mode="create" />} />
        <Route path="downloads/:id" element={<DownloadEditor mode="edit" />} />
        <Route path="faq" element={<FaqList />} />
        <Route path="faq/new" element={<FaqEditor mode="create" />} />
        <Route path="faq/:id" element={<FaqEditor mode="edit" />} />
        {adminRouteMeta
          .filter((meta) => !['/admin/dashboard', '/admin/products', '/admin/blog', '/admin/news', '/admin/gallery', '/admin/downloads', '/admin/faq'].includes(meta.path))
          .map((meta) => (
            <Route key={meta.path} path={meta.path.replace('/admin/', '')} element={<ModulePlaceholder meta={meta} />} />
          ))}
        <Route path="*" element={<ModulePlaceholder meta={{ ...adminRouteMeta[0], title: 'Admin Page Not Found', description: 'The requested Admin route is not part of the current UI foundation.' }} />} />
      </Route>
    </Routes>
  );
}
