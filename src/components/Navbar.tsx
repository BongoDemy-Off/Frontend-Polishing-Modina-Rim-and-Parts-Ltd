import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, X, Search, Globe, Package, FileText, Image, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import Logo from './Logo';
import { productsData, filesData, galleryItems, postsData } from '../lib/data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();

    const matchedProducts = productsData.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    const matchedCatalogs = filesData.filter(f => f.category === 'Catalogs' && (f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)));
    const matchedGallery = galleryItems.filter(g => g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q));
    const matchedPosts = postsData.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));

    return {
      products: matchedProducts,
      catalogs: matchedCatalogs,
      gallery: matchedGallery,
      posts: matchedPosts,
      total: matchedProducts.length + matchedCatalogs.length + matchedGallery.length + matchedPosts.length
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isOutsideDesktop = desktopSearchRef.current && !desktopSearchRef.current.contains(e.target as Node);
      const isOutsideMobile = mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node);
      
      if (isOutsideDesktop && isOutsideMobile) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const lang = i18n.language === 'bn' ? 'BN' : 'EN';

  const toggleLanguage = () => {
    i18n.changeLanguage(lang === 'EN' ? 'bn' : 'en');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setActiveMobileDropdown(null);
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.products'), path: '/products' },
    {
      name: t('nav.quality_dropdown'),
      dropdown: [
        { name: t('nav.quality_assurance'), path: '/quality' },
        { name: t('nav.certificates'), path: '/certificates' },
        { name: t('nav.sustainability'), path: '/sustainability' }
      ]
    },
    {
      name: t('nav.company'),
      dropdown: [
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.mission'), path: '/mission' },
        { name: t('nav.careers'), path: '/careers' },
        { name: t('nav.faq'), path: '/faq' },
        { name: t('nav.downloads'), path: '/downloads' }
      ]
    },
    {
      name: t('nav.media'),
      dropdown: [
        { name: t('nav.gallery'), path: '/gallery' },
        { name: t('nav.news'), path: '/news' },
        { name: t('nav.blog'), path: '/blog' }
      ]
    },
    { name: t('nav.contact'), path: '/contact', isButton: true }
  ];

  const renderSearchResults = () => {
    if (!searchResults) return null;

    if (searchResults.total === 0) {
      return (
        <div className="p-6 text-center text-modina-muted text-sm font-medium">
          No results found for "{searchQuery}"
        </div>
      );
    }

    return (
      <div className="py-2">
        {/* Products */}
        {searchResults.products.length > 0 && (
          <div className="px-3 pb-2 pt-1">
            <h4 className="text-xs font-bold tracking-widest text-modina-muted uppercase mb-2 px-2 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" /> Products ({searchResults.products.length})
            </h4>
            <div className="flex flex-col gap-1">
              {searchResults.products.map(p => (
                <Link
                  key={p.id}
                  to={`/products?category=${p.category}`}
                  className="group flex flex-col p-2 rounded-lg hover:bg-modina-bg-alt transition-colors duration-200"
                >
                  <span className="text-sm font-bold text-modina-heading group-hover:text-modina-red transition-colors">{p.name}</span>
                  <span className="text-xs text-modina-muted line-clamp-1">{p.description}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Catalogs */}
        {searchResults.catalogs.length > 0 && (
          <div className="px-3 pb-2 pt-1 border-t border-modina-divider">
            <h4 className="text-xs font-bold tracking-widest text-modina-muted uppercase mb-2 px-2 flex items-center gap-1.5 mt-2">
              <FileText className="w-3.5 h-3.5" /> Catalogs ({searchResults.catalogs.length})
            </h4>
            <div className="flex flex-col gap-1">
              {searchResults.catalogs.map(c => (
                <Link
                  key={c.id}
                  to="/downloads"
                  className="group flex flex-col p-2 rounded-lg hover:bg-modina-bg-alt transition-colors duration-200"
                >
                  <span className="text-sm font-bold text-modina-heading group-hover:text-modina-red transition-colors">{c.name}</span>
                  <span className="text-xs text-modina-muted">{c.size} • {c.format}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {searchResults.gallery.length > 0 && (
          <div className="px-3 pb-2 pt-1 border-t border-modina-divider">
            <h4 className="text-xs font-bold tracking-widest text-modina-muted uppercase mb-2 px-2 flex items-center gap-1.5 mt-2">
              <Image className="w-3.5 h-3.5" /> Gallery ({searchResults.gallery.length})
            </h4>
            <div className="flex flex-col gap-1">
              {searchResults.gallery.map(g => (
                <Link
                  key={g.id}
                  to="/gallery"
                  className="group flex flex-col p-2 rounded-lg hover:bg-modina-bg-alt transition-colors duration-200"
                >
                  <span className="text-sm font-bold text-modina-heading group-hover:text-modina-red transition-colors">{g.title}</span>
                  <span className="text-xs text-modina-muted">{g.category}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Blog */}
        {searchResults.posts.length > 0 && (
          <div className="px-3 pb-2 pt-1 border-t border-modina-divider">
            <h4 className="text-xs font-bold tracking-widest text-modina-muted uppercase mb-2 px-2 flex items-center gap-1.5 mt-2">
              <PenTool className="w-3.5 h-3.5" /> Blog ({searchResults.posts.length})
            </h4>
            <div className="flex flex-col gap-1">
              {searchResults.posts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group flex flex-col p-2 rounded-lg hover:bg-modina-bg-alt transition-colors duration-200"
                >
                  <span className="text-sm font-bold text-modina-heading group-hover:text-modina-red transition-colors">{post.title}</span>
                  <span className="text-xs text-modina-muted">{post.date}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300 border-b border-modina-border',
          isScrolled
            ? 'h-16 shadow-[var(--shadow-md)] bg-white/95 backdrop-blur-md'
            : 'h-[72px] bg-white'
        )}
      >
        <div className="container-premium h-full relative flex items-center justify-between gap-6">
          {/* Left: Logo + Wordmark */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-2.5 shrink-0"
          >
            <Link to="/" className="flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <Logo className="w-9 h-9 xl:w-11 xl:h-11 object-contain" />
            </Link>
            <Link to="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <span className="font-display font-extrabold text-modina-heading text-[14px] sm:text-[16.5px] tracking-tight">
                MODINA <span className="text-modina-red">RIM</span>
              </span>
              <span className="hidden min-[375px]:inline text-modina-heading text-[13px] sm:text-[15.5px] font-bold tracking-wide opacity-80">
                & Parts Ltd.
              </span>
            </Link>
          </motion.div>

          {/* Center: Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1 h-full">
            {navItems.filter(item => !item.isButton).map((item, idx) => {
              const isActive = location.pathname === item.path;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.05, ease: 'easeOut' }}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.dropdown ? (
                    <div
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer text-[15px] font-semibold transition-all duration-200',
                        activeDropdown === item.name || location.pathname.startsWith(item.path || '/*') 
                          ? 'text-modina-red'
                          : 'text-modina-muted hover:text-modina-heading'
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={cn('w-4 h-4 transition-transform duration-200', activeDropdown === item.name ? 'rotate-180 text-modina-red' : '')}
                      />
                    </div>
                  ) : (
                    <Link
                      to={item.path!}
                      className={cn(
                        'px-3 py-2 rounded-lg text-[15px] font-semibold transition-all duration-200 relative group',
                        isActive
                          ? 'text-modina-red'
                          : 'text-modina-muted hover:text-modina-heading'
                      )}
                    >
                      {item.name}
                      <span 
                        className={cn(
                          "absolute bottom-0 left-3 right-3 h-[2px] bg-modina-red rounded-full transition-all duration-300", 
                          isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50 group-hover:opacity-100 group-hover:scale-x-100'
                        )} 
                      />
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[220px]"
                        >
                          <div className="bg-white border border-modina-border rounded-[8px] shadow-design-lg p-2 flex flex-col gap-0.5">
                            {item.dropdown.map((subItem) => {
                              const isSubActive = location.pathname === subItem.path;
                              return (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  className={cn(
                                    'group flex items-center gap-3 px-4 py-2.5 rounded-[8px] text-[15px] font-medium transition-all duration-200',
                                    isSubActive
                                      ? 'text-modina-red bg-modina-red/5'
                                      : 'text-modina-text hover:text-modina-red hover:bg-modina-bg-alt'
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'w-1.5 h-1.5 rounded-full bg-modina-red transition-all duration-300',
                                      isSubActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100'
                                    )}
                                  />
                                  {subItem.name}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Right: Search + Language + Mobile Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="flex items-center gap-2 sm:gap-3 shrink-0"
          >
            {/* Desktop Search */}
            <div className="relative hidden md:block" ref={desktopSearchRef}>
              <div className="relative group">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-modina-subtle group-focus-within:text-modina-red transition-colors duration-200" />
                <input
                  type="text"
                  placeholder={lang === 'EN' ? 'Search...' : 'অনুসন্ধান...'}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  className="bg-modina-bg-section border border-transparent rounded-[8px] py-2 pl-10 pr-3 text-sm text-modina-text focus:outline-none focus:border-modina-red focus:bg-white focus:ring-2 focus:ring-modina-red/20 hover:border-modina-border transition-all duration-200 w-28 lg:w-36 xl:w-48 placeholder:text-modina-subtle"
                />
              </div>

              {/* Desktop Search Dropdown */}
              <AnimatePresence>
                {isSearchFocused && searchQuery.trim() && searchResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-[calc(100%+12px)] right-0 w-[420px] max-h-[60vh] overflow-y-auto bg-white border border-modina-border rounded-[12px] shadow-design-xl z-[60] flex flex-col no-scrollbar"
                  >
                    {renderSearchResults()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Toggle (Desktop) */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-2 bg-modina-bg-alt hover:bg-modina-bg-section border border-modina-border rounded-lg px-3 py-2.5 transition-all duration-200 hover:border-modina-red/40"
            >
              <Globe className="w-4 h-4 text-modina-muted" />
              <span className="text-xs font-bold tracking-wider text-modina-heading">{lang}</span>
            </button>

            {/* Contact Button (Desktop) */}
            <Link
              to="/contact"
              className="hidden xl:inline-flex items-center justify-center h-10 px-6 bg-modina-red hover:bg-modina-red-dark text-white text-[15px] font-semibold rounded-[8px] transition-all duration-250 shadow-design-sm hover:shadow-design-md hover:-translate-y-0.5 ml-1"
            >
              {t('nav.contact')}
            </Link>

            {/* Mobile Actions: Search Icon + Talk to Sales + Menu Toggle */}
            <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 ml-1">
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="flex md:hidden items-center justify-center w-9 h-9 text-modina-heading hover:text-modina-red transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <a
                href="tel:+8801234567890"
                className="inline-flex items-center justify-center h-9 px-3 sm:px-4 bg-modina-red hover:bg-modina-red-dark text-white text-[12px] sm:text-[13px] font-bold rounded-[6px] transition-all duration-250 shadow-design-sm hover:shadow-design-md"
              >
                {t('nav.talk_to_sales')}
              </a>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center h-9 px-3 sm:px-4 border border-modina-border rounded-[6px] text-[12px] sm:text-[13px] font-bold text-modina-heading hover:text-modina-red hover:border-modina-red/40 hover:bg-modina-bg-alt transition-all duration-200"
                aria-label="Open menu"
              >
                {t('nav.menu')}
              </button>
            </div>
          </motion.div>

          {/* Mobile Search Overlay */}
          <AnimatePresence>
            {isMobileSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-white z-[55] flex items-center px-4 sm:px-8 xl:hidden"
              >
                <div className="relative w-full flex items-center gap-3" ref={mobileSearchRef}>
                  <div className="relative flex-1 group">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-modina-subtle group-focus-within:text-modina-red transition-colors duration-200" />
                    <input
                      type="text"
                      autoFocus
                      placeholder={lang === 'EN' ? 'Search products, catalogs...' : 'অনুসন্ধান করুন...'}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsSearchFocused(true);
                      }}
                      onFocus={() => setIsSearchFocused(true)}
                      className="w-full bg-modina-bg-section border border-transparent rounded-[8px] py-2 pl-10 pr-3 text-sm text-modina-text focus:outline-none focus:border-modina-red focus:bg-white focus:ring-2 focus:ring-modina-red/20 hover:border-modina-border transition-all duration-200 placeholder:text-modina-subtle"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1.5 text-modina-muted hover:text-modina-red hover:bg-modina-bg-alt rounded-lg transition-colors duration-200"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Mobile Search Results Dropdown */}
                  <AnimatePresence>
                    {isSearchFocused && searchQuery.trim() && searchResults && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-[calc(100%+16px)] left-0 right-0 max-h-[60vh] overflow-y-auto bg-white border border-modina-border rounded-[12px] shadow-design-xl z-[60] flex flex-col no-scrollbar"
                      >
                        {renderSearchResults()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-[55] xl:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Partial Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[400px] bg-white z-[60] flex flex-col border-l border-modina-border shadow-design-lg xl:hidden"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center h-16 border-b border-modina-border px-4 sm:px-6 shrink-0">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Logo className="w-8 h-8 object-contain" />
                <div className="flex items-center gap-1">
                  <span className="font-display font-extrabold text-modina-heading text-[14px] tracking-tight">
                    MODINA <span className="text-modina-red">RIM</span>
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-modina-muted hover:text-modina-red hover:bg-modina-bg-alt rounded-lg transition-all duration-200"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Nav Items */}
            <div className="flex-1 flex flex-col px-4 sm:px-6 py-4 gap-1 overflow-y-auto scrollbar-hide">
              {navItems.map((link, idx) => {
                const isActive = location.pathname === link.path;
                const isDropdownActive = activeMobileDropdown === link.name;
                
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.04, duration: 0.3, ease: 'easeOut' }}
                  >
                    {link.dropdown ? (
                      <div className="flex flex-col border-b border-modina-divider/50">
                        <button 
                          onClick={() => setActiveMobileDropdown(isDropdownActive ? null : link.name)}
                          className="flex items-center justify-between py-3.5 w-full text-left"
                        >
                          <span className={cn("text-lg font-bold transition-colors duration-200", isDropdownActive ? "text-modina-red" : "text-modina-heading")}>
                            {link.name}
                          </span>
                          <ChevronDown className={cn("w-5 h-5 text-modina-muted transition-transform duration-300", isDropdownActive && "rotate-180 text-modina-red")} />
                        </button>
                        <AnimatePresence>
                          {isDropdownActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col pl-4 pb-3 gap-1.5">
                                {link.dropdown.map((subItem) => {
                                  const isSubActive = location.pathname === subItem.path;
                                  return (
                                    <Link
                                      key={subItem.name}
                                      to={subItem.path}
                                      onClick={() => setIsOpen(false)}
                                      className={cn(
                                        "flex items-center gap-2.5 py-2 px-2 rounded-lg font-medium transition-colors duration-200",
                                        isSubActive ? "text-modina-red bg-modina-red/5" : "text-modina-muted hover:text-modina-red hover:bg-modina-bg-alt"
                                      )}
                                    >
                                      <span className={cn("w-1.5 h-1.5 rounded-full transition-colors", isSubActive ? "bg-modina-red" : "bg-modina-border")} />
                                      {subItem.name}
                                    </Link>
                                  )
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : link.isButton ? null : (
                      <Link
                        to={link.path!}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'block py-3.5 text-lg font-bold border-b border-modina-divider/50 transition-colors duration-200',
                          isActive
                            ? 'text-modina-red'
                            : 'text-modina-heading hover:text-modina-red'
                        )}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 sm:p-6 border-t border-modina-border bg-modina-bg-alt mt-auto flex flex-col gap-4 shrink-0">
              <a
                href="tel:+8801234567890"
                className="btn-primary w-full justify-center text-base shadow-design-sm"
              >
                {t('nav.talk_to_sales')}
              </a>
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-modina-muted hover:text-modina-red transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-semibold">{lang === 'EN' ? 'বাংলা (BN)' : 'English (EN)'}</span>
                </button>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-modina-muted hover:text-modina-red transition-colors">
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
