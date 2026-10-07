import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, Code, Globe, Zap, GraduationCap, ChevronRight, Mail, 
  Github, Twitter, Linkedin, ArrowUpRight, Sparkles, Layers, 
  ShieldCheck, Users, Lightbulb, CheckCircle2, ArrowRight, ExternalLink, Menu, X, Calendar, Clock
} from "lucide-react";
import { PRODUCTS, ARTICLES, Product, Article } from "./data/content";

const EASE = [0.16, 1, 0.3, 1];

// --- Assets ---
const LOGO_ICON = "/logo.png";
const LOGO_LANDSCAPE = "https://i.postimg.cc/wv7whkHB/56388593474.png";
const LOGO_TEXT = "https://i.postimg.cc/gkRBS4hh/image-(4).png";

// Route definitions & URL path helpers
export const NAV_ROUTES = [
  { id: "home", label: "Home", path: "/" },
  { id: "products", label: "Products", path: "/product" },
  { id: "about", label: "About", path: "/about" },
  { id: "articles", label: "Articles", path: "/articles" },
  { id: "contact", label: "Contact", path: "/contact" },
];

export const idToPath = (id: string): string => {
  switch (id) {
    case "products":
      return "/product";
    case "about":
      return "/about";
    case "articles":
      return "/articles";
    case "contact":
      return "/contact";
    case "home":
    default:
      return "/";
  }
};

export const pathToRoute = (pathname: string) => {
  const clean = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  if (clean.startsWith("/article/")) {
    const articleId = clean.replace("/article/", "");
    return { type: "article" as const, articleId };
  }
  if (clean === "/product" || clean === "/products") {
    return { type: "section" as const, id: "products" };
  }
  if (clean === "/about") {
    return { type: "section" as const, id: "about" };
  }
  if (clean === "/articles") {
    return { type: "section" as const, id: "articles" };
  }
  if (clean === "/contact") {
    return { type: "section" as const, id: "contact" };
  }
  return { type: "section" as const, id: "home" };
};

// Animation Variants
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.25,
    },
  },
};

const maskLineVariants = {
  hidden: { y: "120%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: EASE,
    },
  },
};

const heroSoftRevealVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: EASE,
    },
  },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 35, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};

const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: -8, 
    scale: 1.01,
    transition: { duration: 0.35, ease: EASE } 
  },
};

const SpotlightCard: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = "", onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !spotRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotRef.current.style.background = `radial-gradient(650px circle at ${x}px ${y}px, rgba(255,255,255,0.07), transparent 40%)`;
  };

  const handleMouseEnter = () => {
    if (spotRef.current) spotRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-[32px] glass glass-hover premium-border transition-all duration-300 ${className}`}
    >
      <div
        ref={spotRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

const MagneticButton = ({ children, className = "", onClick, href, external }: { children: React.ReactNode, className?: string, onClick?: () => void, href?: string, external?: boolean }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      onMouseMove={handleMouse as any}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 180, damping: 16, mass: 0.1 }}
      className={className}
      onClick={onClick}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </Component>
  );
};

const Navbar = ({ onNavigate, hasLoadedInitial }: { onNavigate: (id: string) => void, hasLoadedInitial: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={hasLoadedInitial ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay: hasLoadedInitial ? 0 : 0.15 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-[#030303]/80 backdrop-blur-2xl py-4 border-b border-white/5 shadow-2xl" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={(e) => handleNavClick(e, "home")}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/50 transition-all duration-500" />
            <img src={LOGO_ICON} alt="Unfoundid" className="w-9 h-9 object-contain relative z-10 transition-transform duration-500 group-hover:rotate-6" />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter text-white">Unfoundid</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400 uppercase tracking-widest">
          {NAV_ROUTES.map((route, index) => (
            <motion.a 
              key={route.id} 
              href={route.path} 
              onClick={(e) => handleNavClick(e, route.id)}
              initial={hasLoadedInitial ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasLoadedInitial ? 0 : (0.12 * index + 0.2), duration: 0.7, ease: EASE }}
              className="hover:text-white transition-colors duration-300 relative group py-1"
            >
              {route.label}
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
          ))}
        </div>

        <button 
          className="md:hidden text-white p-2 rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-all" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="md:hidden bg-[#050505]/98 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-5 text-xs font-medium text-gray-400 uppercase tracking-widest">
              {NAV_ROUTES.map((route, i) => (
                <motion.a 
                  key={route.id} 
                  href={route.path} 
                  onClick={(e) => handleNavClick(e, route.id)} 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="hover:text-white py-2 border-b border-white/5 last:border-none flex items-center justify-between"
                >
                  <span>{route.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = ({ onNavigate, hasLoadedInitial }: { onNavigate: (id: string) => void, hasLoadedInitial: boolean }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Background glow arriving with silky transition */}
      <motion.div 
        initial={hasLoadedInitial ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        className="absolute inset-0 hero-glow pointer-events-none" 
      />
      <motion.div 
        initial={hasLoadedInitial ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: hasLoadedInitial ? 0 : 0.1, ease: EASE }}
        className="hero-grid" 
      />
      
      {/* Animated ambient orbs - GPU accelerated */}
      <motion.div 
        initial={hasLoadedInitial ? { opacity: 0.14 } : { opacity: 0 }}
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.18, 0.1],
          x: [0, 15, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          opacity: { duration: hasLoadedInitial ? 0 : 1.5 },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/12 blur-[90px] rounded-full pointer-events-none transform-gpu will-change-transform" 
      />
      <motion.div 
        initial={hasLoadedInitial ? { opacity: 0.12 } : { opacity: 0 }}
        animate={{ 
          scale: [1, 1.18, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{ 
          opacity: { duration: hasLoadedInitial ? 0 : 1.5, delay: hasLoadedInitial ? 0 : 0.2 },
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 },
          x: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 },
          y: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
        className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-accent/12 blur-[90px] rounded-full pointer-events-none transform-gpu will-change-transform" 
      />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={hasLoadedInitial ? "visible" : "hidden"}
          animate="visible"
          variants={heroContainerVariants}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={heroSoftRevealVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 premium-border relative overflow-hidden group animate-float shadow-lg hover:border-white/20 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase relative z-10">Independent Technology Brand</span>
            </div>
          </motion.div>
          
          {/* Main Headline with Masked Kinetic Typography Reveal */}
          <h1 className="text-6xl md:text-8xl lg:text-[104px] font-display font-bold mb-6 leading-[1.04] tracking-tighter">
            <span className="block overflow-hidden py-1">
              <motion.span variants={maskLineVariants} className="block">
                Building Things
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span 
                variants={maskLineVariants}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent animate-gradient-x drop-shadow-sm"
              >
                Worth Using
              </motion.span>
            </span>
          </h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={heroSoftRevealVariants}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            Unfoundid is an independent technology brand building useful products, tools, and systems for real-world problems.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={heroSoftRevealVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
          >
            <MagneticButton 
              onClick={() => onNavigate("products")}
              className="group relative px-8 py-4 bg-white text-dark rounded-full font-bold overflow-hidden shadow-xl hover:shadow-primary/20 transition-all duration-300 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </MagneticButton>
            
            <MagneticButton 
              onClick={() => onNavigate("about")}
              className="px-8 py-4 glass text-white rounded-full font-bold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-auto"
            >
              About Unfoundid
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ProductSection = ({ hasLoadedInitial }: { hasLoadedInitial: boolean }) => {
  return (
    <section id="products" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={hasLoadedInitial ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              Our Ecosystem
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Products</h2>
            <p className="text-gray-400 max-w-md">A growing collection of intelligent software and tools built under Unfoundid.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={hasLoadedInitial ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUpVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div variants={cardHoverVariants}>
                <SpotlightCard className="p-8 flex flex-col h-full min-h-[420px] group border-white/5 hover:border-white/20">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                      <Layers className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-2.5 py-1 glass rounded-md border border-white/10">
                      {product.status}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="pt-4 border-t border-white/5">
                    <MagneticButton 
                      href={product.url}
                      external
                      className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors"
                    >
                      Visit {product.name} 
                      <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </MagneticButton>
                  </div>
                </SpotlightCard>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = ({ hasLoadedInitial }: { hasLoadedInitial: boolean }) => {
  return (
    <section id="about" className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={hasLoadedInitial ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerVariants}
          >
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Philosophy & Origins
            </motion.div>
            <motion.h2 variants={fadeUpVariants} className="text-4xl md:text-6xl font-bold mb-8">
              About Unfoundid
            </motion.h2>
            
            <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
              <motion.p variants={fadeUpVariants}>
                Unfoundid is an independent technology brand focused on building useful software, tools, and experimental products. Unfoundid is a brand of Developair and Founded By Asraful Islam Redwan .
              </motion.p>
              <motion.p variants={fadeUpVariants}>
                The goal is simple: create things that are genuinely worth using. Unfoundid is not limited to one category. Products may explore AI, developer tools, productivity, research, automation, and other areas where technology can solve meaningful problems.
              </motion.p>
              
              <motion.div variants={fadeUpVariants} className="pt-6 border-t border-white/5 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Why "Unfoundid"?</h3>
                  <p className="text-base italic text-gray-300 bg-white/5 p-5 rounded-2xl border border-white/5">
                    "The name came from the search itself. While looking for the right name, no name felt right. After searching and finding nothing suitable, the idea became the name: <strong className="text-white not-italic">Unfoundid</strong>."
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={hasLoadedInitial ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerVariants}
            className="grid grid-cols-1 gap-6"
          >
            <motion.h3 variants={fadeUpVariants} className="text-2xl font-bold mb-2 text-center lg:text-left">
              The way we build
            </motion.h3>
            {[
              { title: "Useful over unnecessary", desc: "We build products because they solve problems—not simply because they can be built.", icon: Lightbulb },
              { title: "Experiment, then improve", desc: "Ideas evolve through building, testing, feedback, and iteration.", icon: Zap },
              { title: "Long-term thinking", desc: "Unfoundid is being built with a long-term perspective rather than chasing short-term attention.", icon: Globe }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeUpVariants}
                whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.25 } }}
              >
                <SpotlightCard className="p-6">
                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 text-primary mt-0.5">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ArticlesSection = ({ onArticleClick, hasLoadedInitial }: { onArticleClick: (a: Article) => void, hasLoadedInitial: boolean }) => {
  return (
    <section id="articles" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={hasLoadedInitial ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Thoughts & Dispatches
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Articles</h2>
          <p className="text-gray-400 max-w-md">Perspectives on design, engineering, and independent software craftsmanship.</p>
        </motion.div>

        <motion.div 
          initial={hasLoadedInitial ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {ARTICLES.map((article) => (
            <motion.div 
              key={article.id} 
              variants={fadeUpVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div variants={cardHoverVariants}>
                <SpotlightCard className="p-8 group cursor-pointer border-white/5 hover:border-white/20" onClick={() => onArticleClick(article)}>
                  <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-6">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> {article.publishDate}</span>
                    <span className="text-gray-600">/</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-accent" /> {article.readTime}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors mt-auto">
                    Read Article 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </SpotlightCard>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ArticleDetail = ({ article, onBack }: { article: Article, onBack: () => void }) => (
  <div className="pt-36 pb-32 min-h-screen">
    <div className="max-w-3xl mx-auto px-6">
      <motion.button 
        onClick={onBack} 
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.96 }}
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white mb-12 transition-colors group cursor-pointer px-4 py-2 rounded-full glass border border-white/5 hover:border-white/20"
      >
        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> 
        Back to Articles
      </motion.button>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-5">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> {article.publishDate}</span>
          <span className="text-gray-600">/</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-accent" /> {article.readTime}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">{article.title}</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
      </motion.div>

      <motion.article 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
        className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  </div>
);

const ContactSection = ({ hasLoadedInitial }: { hasLoadedInitial: boolean }) => {
  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={hasLoadedInitial ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariants}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Collaborate & Inquire
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Get in touch</h2>
          <p className="text-xl text-gray-400 mb-12 font-light">Have a question, idea, or something worth building?</p>
          
          <SpotlightCard className="p-10 md:p-14 text-left border-white/10 hover:border-white/20">
            <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Send us a message</h3>
                <p className="text-gray-400">We'll get back to you as soon as possible.</p>
              </div>
              <MagneticButton 
                href="mailto:inbox.unfoundid@gmail.com"
                className="px-10 py-5 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center gap-3 w-full md:w-auto justify-center"
              >
                <Mail className="w-5 h-5" /> inbox.unfoundid@gmail.com
              </MagneticButton>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (id: string) => void }) => (
  <footer className="py-20 border-t border-white/5 bg-black/60 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <img src={LOGO_ICON} alt="Unfoundid" className="w-8 h-8" />
        <span className="text-xl font-display font-bold tracking-tighter text-white">Unfoundid</span>
      </motion.div>
      <p className="text-gray-400 text-sm mb-2">Building things worth using.</p>
      <p className="text-gray-500 text-xs mb-10">Unfoundid is a brand of Developair</p>
      <div className="flex justify-center flex-wrap gap-8 text-xs font-medium text-gray-500 uppercase tracking-widest mb-12">
        {NAV_ROUTES.map((route) => (
          <a 
            key={route.id}
            href={route.path}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(route.id);
            }} 
            className="hover:text-white transition-colors"
          >
            {route.label}
          </a>
        ))}
      </div>
      <p className="text-gray-600 text-[10px] tracking-widest uppercase">© 2026 Unfoundid · A brand of Developair · All rights reserved.</p>
    </div>
  </footer>
);

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);
  const isProgrammaticNav = useRef(false);

  // Lock animations after initial page load arrival finishes (plays only once until page refresh)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoadedInitial(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Handle URL navigation and smooth scrolling
  const navigateTo = (id: string, updateHistory = true) => {
    isProgrammaticNav.current = true;
    setSelectedArticle(null);

    const targetPath = idToPath(id);
    if (updateHistory && window.location.pathname !== targetPath) {
      window.history.pushState(null, "", targetPath);
    }

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    setTimeout(() => {
      isProgrammaticNav.current = false;
    }, 900);
  };

  const handleArticleClick = (article: Article) => {
    isProgrammaticNav.current = true;
    setSelectedArticle(article);
    window.history.pushState(null, "", `/article/${article.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      isProgrammaticNav.current = false;
    }, 500);
  };

  const handleBackFromArticle = () => {
    isProgrammaticNav.current = true;
    setSelectedArticle(null);
    window.history.pushState(null, "", "/articles");
    setTimeout(() => {
      const element = document.getElementById("articles");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      isProgrammaticNav.current = false;
    }, 100);
  };

  // Synchronize on initial mount (direct URL support like /product, /about, /article/xxx)
  useEffect(() => {
    const route = pathToRoute(window.location.pathname);
    if (route.type === "article" && route.articleId) {
      const found = ARTICLES.find((a) => a.id === route.articleId);
      if (found) {
        setSelectedArticle(found);
      }
    } else if (route.type === "section" && route.id !== "home") {
      setTimeout(() => {
        const el = document.getElementById(route.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }

    // Handle Browser Back / Forward buttons (popstate)
    const handlePopState = () => {
      const currentRoute = pathToRoute(window.location.pathname);
      if (currentRoute.type === "article" && currentRoute.articleId) {
        const found = ARTICLES.find((a) => a.id === currentRoute.articleId);
        if (found) {
          setSelectedArticle(found);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        setSelectedArticle(null);
        if (currentRoute.id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(currentRoute.id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Scroll Spy to keep the URL path updated as user scrolls through sections
  useEffect(() => {
    if (selectedArticle) return;

    let ticking = false;
    const sections = ["home", "products", "about", "articles", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticNav.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting && !ticking) {
            ticking = true;
            window.requestAnimationFrame(() => {
              const sectionId = entry.target.id;
              const targetPath = idToPath(sectionId);
              if (window.location.pathname !== targetPath) {
                window.history.replaceState(null, "", targetPath);
              }
              ticking = false;
            });
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedArticle]);

  return (
    <div className="bg-dark min-h-screen selection:bg-primary/30 text-gray-200 relative">
      {/* Silky arrival dissipation curtain - only plays on fresh page load */}
      {!hasLoadedInitial && (
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="pointer-events-none fixed inset-0 z-[100] bg-[#030303]"
        />
      )}

      <Navbar onNavigate={navigateTo} hasLoadedInitial={hasLoadedInitial} />
      
      <main>
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            <motion.div
              key={`article-${selectedArticle.id}`}
              initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -25, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <ArticleDetail article={selectedArticle} onBack={handleBackFromArticle} />
            </motion.div>
          ) : (
            <motion.div
              key="main-portal"
              initial={hasLoadedInitial ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: hasLoadedInitial ? 0 : 0.8, ease: EASE }}
            >
              <Hero onNavigate={navigateTo} hasLoadedInitial={hasLoadedInitial} />
              <ProductSection hasLoadedInitial={hasLoadedInitial} />
              <AboutSection hasLoadedInitial={hasLoadedInitial} />
              <ArticlesSection onArticleClick={handleArticleClick} hasLoadedInitial={hasLoadedInitial} />
              <ContactSection hasLoadedInitial={hasLoadedInitial} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
