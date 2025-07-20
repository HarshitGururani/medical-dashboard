"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiChevronRight, FiFileText, FiHome, FiSettings, FiSidebar, FiUsers, FiX } from 'react-icons/fi';
import { RiMedicineBottleFill } from 'react-icons/ri';

export default function Sidebar({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: { 
  isMobileMenuOpen: boolean; 
  setIsMobileMenuOpen: (open: boolean) => void; 
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile and set initial state
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true); // Collapsed by default on mobile
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, setIsMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isMobileMenuOpen) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileMenuOpen, setIsMobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname === '';
    }
    return pathname === path;
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const menuItems = [
    { href: '/', icon: FiHome, label: 'Dashboard', title: 'Dashboard Overview' },
    { href: '/patients', icon: FiUsers, label: 'Patients', title: 'Patient Management' },
    { href: '/appointments', icon: FiCalendar, label: 'Appointments', title: 'Appointment' },
    { href: '/lab-results', icon: FiFileText, label: 'Lab Results', title: 'Laboratory Results' },
    { href: '/settings', icon: FiSettings, label: 'Settings', title: 'Settings' },
  ];

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const mobileSidebarVariants = {
    hidden: { x: '-100%' },
    visible: { 
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      x: '-100%',
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };

  const desktopSidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 80 }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };

  const iconVariants = {
    tap: { scale: 0.95 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  // Mobile overlay
  if (isMobile && isMobileMenuOpen) {
    return (
      <AnimatePresence>
        {/* Backdrop */}
        <motion.div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Sidebar */}
        <motion.aside 
          id="sidebar"
          className="fixed left-0 top-0 h-full w-80 bg-sidebar border-sidebar-border border-r-2 z-50 md:hidden shadow-2xl"
          variants={mobileSidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Mobile Header */}
          <motion.div 
            className="p-4 border-b border-sidebar-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, type: "spring" as const, stiffness: 300, damping: 30 }}
          >
            <div className='flex justify-between items-center'> 
              <div className="flex items-center gap-3">
                <motion.div 
                  className="p-2 bg-primary/10 rounded-lg"
                  variants={iconVariants}
                  whileTap="tap"
                >
                  <RiMedicineBottleFill className="w-6 h-6 text-primary" />
                </motion.div>
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h1 className="text-xl text-sidebar-foreground font-bold">Medidash</h1>
                </motion.div>
              </div>
              <motion.button 
                className="p-2 hover:bg-sidebar-accent rounded-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiX className="w-5 h-5 text-sidebar-foreground" />
              </motion.button>
            </div>
          </motion.div>

          {/* Mobile Navigation */}
          <nav className="p-4">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link 
                    href={item.href} 
                    className={`flex items-center p-4 rounded-xl group ${
                      isActive(item.href)
                        ? 'bg-primary text-white shadow-lg' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`}
                    title={item.title}
                  >
                    <motion.div 
                      className="flex items-center gap-4 flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className={`p-2 rounded-lg ${
                          isActive(item.href) 
                            ? 'bg-white/20' 
                            : 'bg-primary/10 group-hover:bg-primary/20'
                        }`}
                        variants={iconVariants}
                        whileTap="tap"
                      >
                        <item.icon className="w-5 h-5" />
                      </motion.div>
                      <span className="font-medium text-[16px]">{item.label}</span>
                    </motion.div>
                    <AnimatePresence>
                      {isActive(item.href) && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                        >
                          <FiChevronRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>
        </motion.aside>
      </AnimatePresence>
    );
  }

  // Desktop Sidebar
  return (
    <motion.aside 
      id="sidebar"
      className="hidden md:flex h-screen bg-sidebar border-sidebar-border border-r-2"
      variants={desktopSidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
    >
      <div className="flex flex-col w-full">
        {/* Desktop Header */}
        <motion.div 
          className="p-4 border-b border-sidebar-border"
          layout
        >
          <div className='flex justify-between items-center'> 
            <div className="flex items-center gap-2">
              <motion.div 
                className={`p-0 bg-primary/10 rounded-lg ${
                  isCollapsed ? 'mx-auto p-2' : ''
                }`}
                variants={iconVariants}
                whileTap="tap"
              >
                <RiMedicineBottleFill className="w-6 h-6 text-primary flex-shrink-0" />
              </motion.div>
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    key="title"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout
                  >
                    <h1 className="text-xl text-sidebar-foreground font-bold">Medidash</h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <button 
                  key="collapse-btn"
                  className="p-2 hover:bg-sidebar-accent rounded-lg"
                  onClick={toggleSidebar}
                  title="Collapse sidebar"
                >
                  <FiSidebar className="w-5 h-5 text-sidebar-foreground" />
                </button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="p-4 flex-1">
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                custom={index}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href={item.href} 
                  className={`flex items-center p-3 rounded-xl group relative ${
                    isCollapsed ? 'justify-center' : 'justify-between'
                  } ${
                    isActive(item.href)
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                  title={item.title}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className={`p-2 rounded-lg ${
                        isActive(item.href) 
                          ? 'bg-white/20' 
                          : 'bg-primary/10 group-hover:bg-primary/20'
                      }`}
                      variants={iconVariants}
                      whileTap="tap"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                    </motion.div>
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.span 
                          key={`label-${item.href}`}
                          className="font-medium text-[16px]"
                          variants={textVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          layout
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence mode="wait">
                    {isActive(item.href) && !isCollapsed && (
                      <motion.div
                        key={`chevron-${item.href}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                      >
                        <FiChevronRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <motion.div 
                      className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded pointer-events-none whitespace-nowrap z-50"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                    >
                      {item.label}
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Expand button when collapsed */}
        <AnimatePresence mode="wait">
          {isCollapsed && (
            <motion.div 
              key="expand-section"
              className="p-4 border-t border-sidebar-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
            >
              <button 
                className="w-full p-3 hover:bg-sidebar-accent rounded-xl group relative"
                onClick={toggleSidebar}
                title="Expand sidebar"
              >
                <FiSidebar className="w-5 h-5 text-sidebar-foreground mx-auto" />
                <motion.div 
                  className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded pointer-events-none whitespace-nowrap z-50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                >
                  Expand
                </motion.div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}

// Mobile Menu Button Component (to be used in your header/navbar)
export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
      onClick={onClick}
      title="Open menu"
    >
      <FiSidebar className="w-6 h-6 text-gray-600" />
    </button>
  );
}