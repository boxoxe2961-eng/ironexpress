import React, { useState, useMemo } from 'react';
import {
  Truck,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Search,
  Award,
  Navigation,
  MessageCircle,
  CheckSquare,
  Sparkles,
  Shield,
  CheckCircle2,
  Send,
  Check,
  ChevronRight,
  HelpCircle,
  ThumbsUp,
  Map,
  Home
} from 'lucide-react';

// Structured list of all requested Georgian cities with region and type
const CITIES_DATA = [
  // დიდი ქალაქები
  { id: 'Tbilisi', ge: 'თბილისი', type: 'large', region: 'აღმოსავლეთი' },
  { id: 'Batumi', ge: 'ბათუმი', type: 'large', region: 'აჭარა' },
  { id: 'Kutaisi', ge: 'ქუთაისი', type: 'large', region: 'იმერეთი' },
  { id: 'Rustavi', ge: 'რუსთავი', type: 'large', region: 'ქვემო ქართლი' },
  { id: 'Gori', ge: 'გორი', type: 'large', region: 'შიდა ქართლი' },
  { id: 'Poti', ge: 'ფოთი', type: 'large', region: 'სამეგრელო' },
  { id: 'Zugdidi', ge: 'ზუგდიდი', type: 'large', region: 'სამეგრელო' },

  // ქალაქები
  { id: 'Telavi', ge: 'თელავი', type: 'normal', region: 'კახეთი' },
  { id: 'Mtskheta', ge: 'მცხეთა', type: 'normal', region: 'აღმოსავლეთი' },
  { id: 'Bolnisi', ge: 'ბოლნისი', type: 'normal', region: 'ქვემო ქართლი' },
  { id: 'Marneuli', ge: 'მარნეული', type: 'normal', region: 'ქვემო ქართლი' },
  { id: 'Gardabani', ge: 'გარდაბანი', type: 'normal', region: 'ქვემო ქართლი' },
  { id: 'Dusheti', ge: 'დუშეთი', type: 'normal', region: 'აღმოსავლეთი' },
  { id: 'Akhaltsikhe', ge: 'ახალციხე', type: 'normal', region: 'სამცხე-ჯავახეთი' },
  { id: 'Borjomi', ge: 'ბორჯომი', type: 'normal', region: 'სამცხე-ჯავახეთი' },
  { id: 'Bakuriani', ge: 'ბაკურიანი', type: 'normal', region: 'სამცხე-ჯავახეთი' },
  { id: 'Zestaponi', ge: 'ზესტაფონი', type: 'normal', region: 'იმერეთი' },
  { id: 'Khashuri', ge: 'ხაშური', type: 'normal', region: 'შიდა ქართლი' },
  { id: 'Kareli', ge: 'ყარელი', type: 'normal', region: 'შიდა ქართლი' },
  { id: 'Kaspi', ge: 'კასპი', type: 'normal', region: 'შიდა ქართლი' },
  { id: 'Chiatura', ge: 'ჭიათურა', type: 'normal', region: 'იმერეთი' },
  { id: 'Sachkhere', ge: 'საჩხერე', type: 'normal', region: 'იმერეთი' },
  { id: 'Terjola', ge: 'თერჯოლა', type: 'normal', region: 'იმერეთი' },
  { id: 'Ozurgeti', ge: 'ოზურგეთი', type: 'normal', region: 'გურია' },
  { id: 'Kobuleti', ge: 'ქობულეთი', type: 'normal', region: 'აჭარა' },
  { id: 'Samtredia', ge: 'სამტრედია', type: 'normal', region: 'იმერეთი' },
  { id: 'Senaki', ge: 'სენაკი', type: 'normal', region: 'სამეგრელო' },
  { id: 'Martvili', ge: 'მარტვილი', type: 'normal', region: 'სამეგრელო' },
  { id: 'Khobi', ge: 'ხობი', type: 'normal', region: 'სამეგრელო' },
  { id: 'Abasha', ge: 'აბაშა', type: 'normal', region: 'იმერეთი' },
  { id: 'Tskaltubo', ge: 'წყალტუბო', type: 'normal', region: 'იმერეთი' },
  { id: 'Khoni', ge: 'ხონი', type: 'normal', region: 'იმერეთი' },
  { id: 'Signagi', ge: 'სიღნაღი', type: 'normal', region: 'კახეთი' },
  { id: 'Gurjaani', ge: 'გურჯაანი', type: 'normal', region: 'კახეთი' },
  { id: 'Lagodekhi', ge: 'ლაგოდეხი', type: 'normal', region: 'კახეთი' },
  { id: 'Ambrolauri', ge: 'ამბროლაური', type: 'normal', region: 'რაჭა-ლეჩხუმი' },
  { id: 'Oni', ge: 'ონი', type: 'normal', region: 'რაჭა-ლეჩხუმი' },
  { id: 'Lentekhi', ge: 'ლენტეხი', type: 'normal', region: 'რაჭა-ლეჩხუმი' },
  { id: 'Mestia', ge: 'მესტია', type: 'normal', region: 'სამეგრელო-ზემო სვანეთი' }
];

// Reusable image loader with stylized skeleton and fallback state
function SecureImage({ 
  src, 
  alt, 
  fallbackIcon: FallbackIcon, 
  className = "w-full h-full", 
  imgClassName = "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
}: { 
  src: string; 
  alt: string; 
  fallbackIcon: React.ComponentType<any>; 
  className?: string; 
  imgClassName?: string;
}) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden bg-[#161616] ${className}`}>
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1C1C1C]">
          <div className="w-8 h-8 rounded-full border-2 border-[#C41E24]/30 border-t-[#C41E24] animate-spin"></div>
        </div>
      )}
      
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          className={`${imgClassName} ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#1A1A1A] text-[#C41E24] p-6 text-center shadow-inner">
          <FallbackIcon className="w-12 h-12 mb-3 stroke-[1.2] text-[#C41E24] animate-pulse" />
          <span className="text-xs text-gray-300 font-extrabold uppercase tracking-wider">{alt}</span>
          <span className="text-[10px] text-gray-500 mt-1 uppercase font-bold">გამოსახულება მიუწვდომელია</span>
        </div>
      )}
    </div>
  );
}

function SecureLogo() {
  const [error, setError] = useState(false);
  const logoUrl = "https://cdn.discordapp.com/attachments/1457400050148839616/1529525703891095826/content.png?ex=6a624151&is=6a60efd1&hm=9d3488d2133dc8b746f668276df6403c170a82a917cb28f8a81e7ad872a199e2&";

  if (error) {
    return (
      <div className="relative w-11 h-11 bg-[#C41E24] rounded-xl flex items-center justify-center text-white font-black shadow-[0_0_15px_rgba(196,30,36,0.5)] border border-white/10 transition-transform group-hover:scale-105">
        <Truck className="w-6 h-6 transform -skew-x-6" />
        <span className="absolute -bottom-1 -right-1 bg-[#FFD700] text-black text-[7px] px-1 font-extrabold rounded-xs uppercase tracking-tight">
          PRO
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(196,30,36,0.35)] border border-[#C41E24]/40 overflow-hidden transition-all duration-300 group-hover:border-[#C41E24] group-hover:scale-105 group-hover:shadow-[#C41E24]/40 shrink-0">
      <img 
        src={logoUrl} 
        alt="GAATANE" 
        className="w-full h-full object-cover scale-125 transition-transform duration-300 group-hover:scale-135"
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function SecureFooterLogo() {
  const [error, setError] = useState(false);
  const logoUrl = "https://cdn.discordapp.com/attachments/1457400050148839616/1529525703891095826/content.png?ex=6a624151&is=6a60efd1&hm=9d3488d2133dc8b746f668276df6403c170a82a917cb28f8a81e7ad872a199e2&";

  if (error) {
    return (
      <div className="w-12 h-12 rounded-xl bg-[#C41E24] flex items-center justify-center text-white font-black text-lg shadow-md">
        G
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-xl bg-[#161616] border border-[#C41E24]/40 overflow-hidden flex items-center justify-center shadow-lg shrink-0">
      <img 
        src={logoUrl} 
        alt="GAATANE" 
        className="w-full h-full object-cover scale-125"
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionTab, setSelectedRegionTab] = useState('ყველა');

  // FAQ open state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filtered Regions based on our database
  const regions = useMemo(() => {
    const raw = CITIES_DATA.map(c => c.region);
    return ['ყველა', ...Array.from(new Set(raw))];
  }, []);

  // Filtering cities by search query and selected region tab
  const filteredCities = useMemo(() => {
    let result = CITIES_DATA;
    
    if (selectedRegionTab !== 'ყველა') {
      result = result.filter(c => c.region === selectedRegionTab);
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.ge.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
      );
    }
    
    return result;
  }, [searchQuery, selectedRegionTab]);

  // Large vs Normal cities
  const largeCities = useMemo(() => CITIES_DATA.filter(c => c.type === 'large'), []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col font-sans text-gray-100 antialiased selection:bg-[#C41E24] selection:text-white pb-20 lg:pb-0">
      
      {/* 1. TOP STATUS HIGHWAY INDICATOR BAR */}
      <div className="relative bg-[#0E0E0E] text-gray-400 text-[10px] sm:text-[11px] py-2 px-4 border-b border-white/5 font-semibold tracking-wider z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="hidden md:flex items-center space-x-6 text-gray-400">
            <span className="text-[#FFD700] font-black uppercase tracking-widest text-[10px] flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#FFD700]" /> 
              100% სრული ფინანსური გარანტია დაზღვევით
            </span>
            <span>•</span>
            <span>მიწოდების რეჟიმი: 24/7 ოპერირება</span>
          </div>

          <div className="flex items-center justify-center sm:justify-end space-x-1.5 text-xs w-full sm:w-auto">
            <span className="text-gray-400 font-bold">გამოიძახეთ კურიერი დღესვე:</span>
            <a href="tel:+511303050" className="text-[#FFD700] hover:text-[#C41E24] font-black transition-colors font-mono">+511 30 30 50</a>
          </div>

        </div>
      </div>

      {/* 2. GLASSMORPHIC INDUSTRIAL HEADER */}
      <header className="sticky top-0 z-50 bg-[#0E0E0E]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-22">
            
            {/* Logo Brand Frame */}
            <a 
              href="#hero"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center space-x-2 sm:space-x-3.5 group"
              id="brand-logo"
            >
              <SecureLogo />
              <div className="flex flex-col">
                <span className="text-lg xs:text-xl sm:text-2xl font-black text-white tracking-tighter leading-none group-hover:text-[#C41E24] transition-colors uppercase">
                  GAAT<span className="text-[#C41E24]">ANE</span>
                </span>
                <span className="text-[8px] sm:text-[9px] text-[#FFD700] font-black tracking-widest uppercase mt-0.5 sm:mt-1">
                  საკურიერო სერვისი
                </span>
              </div>
            </a>

            {/* Premium Navigation anchor links */}
            <nav className="hidden lg:flex items-center space-x-10">
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                className="text-xs font-black tracking-widest uppercase text-gray-300 hover:text-[#C41E24] transition-all relative py-1 group"
              >
                ჩვენ შესახებ
              </a>
              <a
                href="#coverage"
                onClick={(e) => { e.preventDefault(); scrollToSection('coverage'); }}
                className="text-xs font-black tracking-widest uppercase text-gray-300 hover:text-[#C41E24] transition-all relative py-1 group"
              >
                დაფარვის ზონა
              </a>
              <a
                href="#insurance"
                onClick={(e) => { e.preventDefault(); scrollToSection('insurance'); }}
                className="text-xs font-black tracking-widest uppercase text-gray-300 hover:text-[#C41E24] transition-all relative py-1 group"
              >
                სრული დაზღვევა
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="text-xs font-black tracking-widest uppercase text-gray-300 hover:text-[#C41E24] transition-all relative py-1 group"
              >
                კონტაქტი
              </a>
            </nav>

            {/* Call Action Link on Right */}
            <div className="flex items-center space-x-3">
              <a 
                href="tel:+511303050"
                id="header-phone-cta"
                className="inline-flex items-center justify-center p-3 sm:px-4.5 sm:py-3 bg-[#161616] hover:bg-black border border-[#C41E24]/40 hover:border-[#C41E24] rounded-xl text-xs sm:text-sm font-black text-white hover:text-[#C41E24] shadow-[0_0_15px_rgba(196,30,36,0.1)] transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-[#FFD700]" />
                <span className="hidden xs:inline tracking-tight font-mono ml-2 text-xs sm:text-sm font-black">+511 30 30 50</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* 3. MAIN APP SECTION CONTAINER */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section id="hero" className="relative bg-[#0A0A0A] py-12 sm:py-28 overflow-hidden border-b border-white/5">
          
          {/* Neon Gradients and Ambient Grids */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <pattern id="hero-grid" width="45" height="45" patternUnits="userSpaceOnUse">
                <path d="M 45 0 L 0 0 0 45" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>
          </div>

          {/* Large Crimson Radial Glow */}
          <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#C41E24]/8 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#FFD700]/3 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Left Column Text block */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
                
                {/* Upper Status Badges */}
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2.5">
                  <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#C41E24]/10 text-[#FFC4C4] border border-[#C41E24]/30 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
                    <span>100% ფინანსური პასუხისმგებლობა</span>
                  </span>
                </div>

                {/* Main Headline */}
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-5xl lg:text-6.5xl font-black text-white tracking-tight leading-none uppercase">
                    ტვირთების საიმედო <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-[#C41E24] drop-shadow-[0_4px_15px_rgba(196,30,36,0.4)]">
                      ტრანსპორტირება
                    </span>
                  </h1>

                  <p className="text-base sm:text-2xl font-black text-[#FFD700] tracking-wide uppercase leading-relaxed">
                    🚚 მიტანა მაქსიმუმ <span className="bg-[#C41E24] text-white text-xl sm:text-3xl px-2.5 py-0.5 rounded-lg font-black inline-block mx-1">4</span> დღეში მთელ საქართველოში!
                  </p>
                  
                  <p className="text-gray-400 text-xs sm:text-base max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                    GAATANE გთავაზობთ პროფესიონალურ, დაზღვეულ საკურიერო სერვისს. ჩვენი საკუთარი საიმედო ავტოპარკი ყოველდღიურად აკავშირებს ქალაქებსა და რეგიონებს.
                  </p>
                </div>

                {/* Large call-center block */}
                <div className="p-4 sm:p-6 bg-[#121212]/90 border border-white/5 rounded-2xl border-l-4 sm:border-l-8 border-l-[#C41E24] shadow-2xl max-w-xl mx-auto lg:mx-0 space-y-2">
                  <span className="text-[9px] text-gray-400 font-black tracking-widest uppercase block">გამოიძახეთ კურიერი დღესვე:</span>
                  <div className="flex items-center justify-center lg:justify-start">
                    <a 
                      href="tel:+511303050" 
                      className="text-2xl sm:text-4xl font-mono font-black text-white hover:text-[#C41E24] transition-colors tracking-tight flex items-center space-x-3"
                    >
                      <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFD700] animate-bounce" />
                      <span>+511 30 30 50</span>
                    </a>
                  </div>
                </div>

                {/* Standardized WhatsApp Link */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 pt-1">
                  <a
                    href="https://wa.me/511303050"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="hero-whatsapp-link"
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-black rounded-xl shadow-lg hover:shadow-[#25D366]/20 transition-all flex items-center justify-center space-x-3 text-xs sm:text-sm tracking-wider uppercase"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>WhatsApp სწრაფი ჩატი</span>
                  </a>

                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black rounded-xl transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm tracking-wider uppercase"
                  >
                    <Mail className="w-4 h-4 text-[#FFD700]" />
                    <span>კურიერის გამოძახება</span>
                  </a>
                </div>

              </div>

              {/* Right Column Truck visual Frame with Live Duty details */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md bg-gradient-to-br from-[#161616] to-[#0E0E0E] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
                  
                  {/* Hexagon metal style rivet indicators */}
                  <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-white/10"></span>
                  <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-white/10"></span>
                  <span className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-white/10"></span>
                  <span className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-white/10"></span>

                  {/* High Tech Screen containing vector illustration */}
                  <div className="w-full h-48 bg-black rounded-2xl p-4 flex flex-col justify-center items-center relative overflow-hidden border border-white/5 shadow-inner">
                    
                    {/* Branded heavy container truck illustration */}
                    <svg viewBox="0 0 220 110" className="w-full h-full max-h-[145px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="10" y1="85" x2="210" y2="85" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="4 4" />
                      <circle cx="170" cy="35" r="14" fill="rgba(196,30,36,0.12)" />
                      
                      {/* Asphalt Road */}
                      <path d="M 5 85 L 215 85 L 205 102 L 15 102 Z" fill="#181818" opacity="0.9" />
                      <line x1="20" y1="94" x2="200" y2="94" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="8 6" />

                      {/* TRUCK CONTAINER VECTOR */}
                      <g id="truck-body" transform="translate(10, 10)">
                        {/* Main Container */}
                        <rect x="25" y="15" width="115" height="48" fill="#8B1C1F" rx="3" stroke="#C41E24" strokeWidth="2" />
                        <rect x="27" y="17" width="111" height="44" fill="#a3181d" rx="2" />
                        
                        <line x1="40" y1="18" x2="40" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="55" y1="18" x2="55" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="70" y1="18" x2="70" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="85" y1="18" x2="85" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="100" y1="18" x2="100" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="115" y1="18" x2="115" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="130" y1="18" x2="130" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />

                        {/* Bold Logo Title */}
                        <text x="32" y="44" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">
                          GAATANE
                        </text>
                        
                        {/* Hinge */}
                        <rect x="138" y="52" width="12" height="6" fill="#222" />

                        {/* Driver Front Cabin */}
                        <path d="M 148 28 L 172 28 C 178 28 181 33 183 38 L 188 50 C 189 54 189 63 184 63 L 148 63 Z" fill="#C41E24" stroke="#8B1C1F" strokeWidth="1" />
                        <path d="M 150 30 L 170 30 C 175 30 178 33 180 38 L 184 48 C 185 51 183 55 180 55 L 150 55 Z" fill="#000" />
                        <rect x="152" y="56" width="14" height="6" fill="#333" />
                        <circle cx="186" cy="51" r="2.5" fill="#FFD700" />

                        {/* Truck Wheels */}
                        <circle cx="45" cy="67" r="10" fill="#111" stroke="#333" strokeWidth="2.5" />
                        <circle cx="45" cy="67" r="3" fill="#FFF" />
                        <circle cx="68" cy="67" r="10" fill="#111" stroke="#333" strokeWidth="2.5" />
                        <circle cx="68" cy="67" r="3" fill="#FFF" />
                        
                        <circle cx="118" cy="67" r="10" fill="#111" stroke="#333" strokeWidth="2.5" />
                        <circle cx="118" cy="67" r="3" fill="#FFF" />
                        <circle cx="138" cy="67" r="10" fill="#111" stroke="#333" strokeWidth="2.5" />
                        <circle cx="138" cy="67" r="3" fill="#FFF" />

                        {/* Cabin Wheels */}
                        <circle cx="170" cy="67" r="10" fill="#111" stroke="#333" strokeWidth="2.5" />
                        <circle cx="170" cy="67" r="3" fill="#FFF" />
                      </g>
                    </svg>

                    <div className="absolute top-2 right-2 px-2.5 py-0.5 bg-[#C41E24] text-white text-[8px] font-black uppercase rounded tracking-wider shadow">
                      M1 ტრასა • LIVE
                    </div>
                  </div>

                  {/* Logistics Status specs */}
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs text-gray-400 font-bold uppercase">გარანტირებული ვადა</span>
                      <span className="text-xs font-black text-[#FFD700] uppercase">მაქსიმუმ 4 დღე</span>
                    </div>

                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex items-start space-x-2">
                        <CheckSquare className="w-4 h-4 text-[#C41E24] shrink-0 mt-0.5" />
                        <span><strong>24/7 საწყობები</strong>: უწყვეტი მიღება-დახარისხება</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckSquare className="w-4 h-4 text-[#C41E24] shrink-0 mt-0.5" />
                        <span><strong>პასუხისმგებლობა</strong>: ფინანსური გარანტიის ხელშეკრულებით</span>
                      </div>
                    </div>

                    {/* Shield insurance banner */}
                    <div className="bg-[#C41E24]/10 border border-[#C41E24]/30 rounded-xl p-3 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C41E24] flex items-center justify-center text-[#FFD700] shrink-0 shadow-lg">
                        <Shield className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#FFD700] uppercase tracking-wide">100% დაზღვეული ტრანსპორტირება</p>
                        <p className="text-[9px] text-gray-400">თითოეული ამანათი დაზღვეულია ჩაბარებისთანავე</p>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: ABOUT US & MISSIO */}
        <section id="about" className="py-24 bg-[#0E0E0E] border-b border-white/5 relative">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C41E24]/3 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Mission Section */}
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-20">
              <div className="inline-flex items-center space-x-2">
                <span className="h-0.5 w-8 bg-[#C41E24]"></span>
                <span className="text-[#C41E24] text-xs font-black tracking-widest uppercase">კომპანიის მისია / MISSION</span>
                <span className="h-0.5 w-8 bg-[#C41E24]"></span>
              </div>
              
              <h2 className="text-3xl sm:text-4.5xl font-black text-white tracking-tight uppercase leading-snug">
                „ჩვენი მისიაა – უზრუნველვყოთ სწრაფი, უსაფრთხო და საიმედო მიწოდება საქართველოს ნებისმიერ წერტილში.“
              </h2>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-white/5 shadow-2xl relative overflow-hidden max-w-3xl mx-auto">
                <span className="absolute top-0 left-0 w-24 h-0.5 bg-gradient-to-r from-[#C41E24] to-transparent"></span>
                <p className="text-base sm:text-lg text-gray-300 font-medium leading-relaxed">
                  „მიტანა ხდება მაქსიმუმ <span className="text-[#FFD700] font-black text-xl">4</span> დღეში. თქვენ აბარებთ კურიერს თქვენს ამანათს, იგი შემდეგ გადაადგილდება საწყობში და გაგზავნა მოხდება მაქსიმუმ <span className="text-[#FFD700] font-black text-xl">4</span> დღეში.“
                </p>
              </div>
            </div>

            {/* მიტანა ხდება GALLERY Section */}
            <div className="mb-24 space-y-12">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-[#C41E24] text-xs font-black tracking-widest uppercase block">ჩვენი ტრანსპორტი / OUR FLEET</span>
                <h3 className="text-3xl sm:text-4xl font-black text-white mt-2 uppercase">მიტანა ხდება:</h3>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  ავტოპარკი აღჭურვილია ნებისმიერი ტიპისა და მოცულობის ტვირთის გადასაადგილებლად
                </p>
              </div>

              {/* Two Column Visual Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                
                {/* Visual Option 1: მარშუტკით */}
                <div className="bg-[#121212] border border-white/10 hover:border-[#C41E24]/40 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group flex flex-col relative">
                  <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-black/60 shrink-0">
                    <SecureImage 
                      src="https://media.discordapp.net/attachments/1457400050148839616/1529523978333458531/content.png?ex=6a623fb5&is=6a60ee35&hm=773962012cabe806d23cb1328cff3aa62a520f972a7dfc6693836cdd21d9d80b&=&format=webp&quality=lossless&width=768&height=512"
                      alt="მიტანა მარშუტკით"
                      fallbackIcon={Truck}
                      className="w-full h-full"
                    />
                    
                    {/* Bottom overlay glass indicator */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-16">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[#C41E24] text-[10px] font-black tracking-widest uppercase block mb-1">საქალაქთაშორისო რეისები</span>
                          <h4 className="text-2xl font-black text-white uppercase tracking-tight">01 / მარშუტკით</h4>
                        </div>
                        <span className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#FFD700]">
                          <Truck className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Option 2: მანქანით */}
                <div className="bg-[#121212] border border-white/10 hover:border-[#C41E24]/40 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group flex flex-col relative">
                  <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-black/60 shrink-0">
                    <SecureImage 
                      src="https://media.discordapp.net/attachments/1457400050148839616/1529524319338758274/content.png?ex=6a624006&is=6a60ee86&hm=2f99905bc7e24717be0ce4efb34a5c8d38638461e7406ebceb0ff019f0328608&=&format=webp&quality=lossless&width=768&height=512"
                      alt="მიტანა მანქანით"
                      fallbackIcon={Navigation}
                      className="w-full h-full"
                    />
                    
                    {/* Bottom overlay glass indicator */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-16">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[#FFD700] text-[10px] font-black tracking-widest uppercase block mb-1">კარამდე მიწოდება / ექსპრესი</span>
                          <h4 className="text-2xl font-black text-white uppercase tracking-tight">02 / მანქანით</h4>
                        </div>
                        <span className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#C41E24]">
                          <Navigation className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Why Choose Us Redesigned Bento-style Grid */}
            <div className="space-y-12">
              
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-[#C41E24] text-xs font-black tracking-widest uppercase block">უპირატესობები</span>
                <h3 className="text-3xl sm:text-4xl font-black text-white mt-2 uppercase">რატომ GAATANE?</h3>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                  ჩვენ გვაქვს მრავალწლიანი ლოჯისტიკური ინფრასტრუქტურა და პასუხისმგებლობა
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                
                {/* Bento Card 1 */}
                <div className="bg-[#121212] border border-white/5 hover:border-[#C41E24]/30 rounded-2xl p-8 shadow-2xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5">
                  <div className="space-y-5">
                    <div className="w-12 h-12 rounded-xl bg-[#C41E24]/10 border border-[#C41E24]/30 text-[#C41E24] flex items-center justify-center transition-all group-hover:bg-[#C41E24] group-hover:text-white shadow-md">
                      <Truck className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black text-white tracking-tight uppercase">🚚 საკუთარი ავტოპარკი</h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                      ჩვენი სატვირთო მანქანები და მიკროავტობუსები ყოველდღიურად გადიან მარშრუტებზე. ტვირთის გადაზიდვა ხდება უშუალოდ ჩვენი მძღოლების მიერ.
                    </p>
                  </div>
                  <span className="text-[10px] font-black text-[#FFD700] tracking-wider uppercase mt-8 block border-t border-white/5 pt-4">
                    სისტემატური რეისები
                  </span>
                </div>

                {/* Bento Card 2 */}
                <div className="bg-[#121212] border border-white/5 hover:border-[#C41E24]/30 rounded-2xl p-8 shadow-2xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5">
                  <div className="space-y-5">
                    <div className="w-12 h-12 rounded-xl bg-[#C41E24]/10 border border-[#C41E24]/30 text-[#C41E24] flex items-center justify-center transition-all group-hover:bg-[#C41E24] group-hover:text-white shadow-md">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black text-white tracking-tight uppercase">🛡️ 100% ფინანსური გარანტია</h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                      ჩაბარებისთანავე, თითოეულ ამანათზე ავტომატურად იწყება დაზღვევის პოლისის მოქმედება. ნებისმიერი ზარალი ანაზღაურდება სრულად, დაუყოვნებლივ.
                    </p>
                  </div>
                  <span className="text-[10px] font-black text-[#FFD700] tracking-wider uppercase mt-8 block border-t border-white/5 pt-4">
                    სრული გარანტია
                  </span>
                </div>

                {/* Bento Card 3 */}
                <div className="bg-[#121212] border border-white/5 hover:border-[#C41E24]/30 rounded-2xl p-8 shadow-2xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5">
                  <div className="space-y-5">
                    <div className="w-12 h-12 rounded-xl bg-[#C41E24]/10 border border-[#C41E24]/30 text-[#C41E24] flex items-center justify-center transition-all group-hover:bg-[#C41E24] group-hover:text-white shadow-md">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black text-white tracking-tight uppercase">⏱️ მაქსიმუმ 4 დღე</h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                      ოპერატიული დახარისხება და სწრაფი მაგისტრალური ლოჯისტიკა გვაძლევს საშუალებას, საქართველოს ნებისმიერ ქალაქში ჩავაბაროთ ტვირთი 4 დღის ვადაში.
                    </p>
                  </div>
                  <span className="text-[10px] font-black text-[#FFD700] tracking-wider uppercase mt-8 block border-t border-white/5 pt-4">
                    ვადების მკაცრი კონტროლი
                  </span>
                </div>

              </div>

            </div>

          </div>
        </section>



        {/* SECTION: COVERAGE & CITIES SEARCH */}
        <section id="coverage" className="py-24 bg-[#0E0E0E] border-b border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#C41E24] text-xs font-black tracking-widest uppercase block">გეოგრაფია და რუკა / NETWORK HUB</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 uppercase">დაფარვის ზონა საქართველოში</h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                მოძებნეთ თქვენი ქალაქი. ჩვენ ვოპერირებთ საქართველოს ყველა დიდ რეგიონულ ფილიალში.
              </p>
            </div>

            {/* City Live Search with custom red glow effect when active */}
            <div className="max-w-xl mx-auto mb-10 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="მოძებნე ნებისმიერი ქალაქი... (მაგ: თბილისი, მესტია, ბათუმი)"
                className="w-full px-5 py-4 pl-12 bg-[#161616] border border-white/10 hover:border-[#C41E24]/40 focus:border-[#C41E24] rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#C41E24] transition-all placeholder:text-gray-500 font-bold shadow-lg"
              />
              <Search className="w-5 h-5 text-gray-500 absolute left-4 top-4.5" />
            </div>

            {/* Regions Tab Selector */}
            <div className="flex overflow-x-auto pb-3 mb-12 max-w-4xl mx-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center gap-2 scrollbar-none snap-x">
              {regions.map((tab) => (
                <button
                  key={`tab-${tab}`}
                  type="button"
                  onClick={() => {
                    setSelectedRegionTab(tab);
                    // Clear search to avoid double filtering confusion
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer snap-start ${selectedRegionTab === tab ? 'bg-[#C41E24] text-white shadow-lg shadow-[#C41E24]/20' : 'bg-[#161616] text-gray-400 hover:text-white border border-white/5'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Structured Results Display */}
            <div className="space-y-12 max-w-6xl mx-auto">
              
              {/* Central Hubs (Only visible when searching generally or when 'ყველა' is active) */}
              {(selectedRegionTab === 'ყველა' || selectedRegionTab === 'იმერეთი' || selectedRegionTab === 'აჭარა' || selectedRegionTab === 'აღმოსავლეთი' || selectedRegionTab === 'სამეგრელო' || selectedRegionTab === 'ქვემო ქართლი' || selectedRegionTab === 'შიდა ქართლი') && filteredCities.length > 0 && (
                <div className="space-y-5">
                  <div className="flex items-center space-x-2 border-b border-white/5 pb-2">
                    <Award className="w-4 h-4 text-[#FFD700]" />
                    <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest">ცენტრალური ფილიალები & ჰაბები</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {filteredCities.filter(c => c.type === 'large').map((city) => (
                      <div 
                        key={`large-hub-${city.id}`}
                        className="bg-gradient-to-b from-[#161616] to-[#0F0F0F] border border-white/5 p-5 rounded-xl text-center group transition-all duration-300 hover:border-[#C41E24]/30 hover:shadow-xl border-b-2 hover:border-b-[#C41E24]"
                      >
                        <MapPin className="w-6 h-6 text-[#C41E24] mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
                        <span className="font-bold text-white text-sm block truncate">{city.ge}</span>
                        <span className="text-[8px] text-[#FFD700] uppercase font-black tracking-widest mt-1 block">ცენტრალი</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Regional Branches */}
              <div className="space-y-5">
                <div className="flex items-center space-x-2 border-b border-white/5 pb-2">
                  <Navigation className="w-4 h-4 text-gray-500" />
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">რეგიონალური წარმომადგენლობები</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                  {filteredCities.filter(c => c.type === 'normal').map((city) => (
                    <div 
                      key={`normal-city-${city.id}`}
                      className="bg-[#121212]/60 border border-white/5 p-4 rounded-xl text-center transition-all hover:bg-[#161616] hover:border-white/10 flex items-center space-x-2.5 justify-center shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C41E24] shrink-0"></span>
                      <span className="text-gray-300 text-xs sm:text-sm font-semibold truncate">{city.ge}</span>
                    </div>
                  ))}

                  {filteredCities.length === 0 && (
                    <div className="col-span-full py-16 text-center text-gray-500 bg-[#121212] rounded-2xl border border-dashed border-white/10">
                      ქალაქი ამ კატეგორიაში ან ძებნის პარამეტრით ვერ მოიძებნა.
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION: 100% INSURANCE POLICY DETAILED DETAILS */}
        <section id="insurance" className="py-24 bg-[#0A0A0A] border-b border-white/5 relative overflow-hidden">
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C41E24]/3 rounded-full blur-[130px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column Text details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center space-x-2">
                  <span className="h-0.5 w-6 bg-[#C41E24]"></span>
                  <span className="text-[#C41E24] text-xs font-black tracking-widest uppercase">უსაფრთხოების გარანტიები</span>
                </div>

                <h2 className="text-3xl sm:text-4.5xl font-black text-white tracking-tight uppercase leading-none">
                  🛡️ 100% სრული ფინანსური დაზღვევა
                </h2>

                <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-medium">
                  ჩვენ ვაცნობიერებთ თითოეული ამანათის მნიშვნელობას. სწორედ ამიტომ, GAATANE-ის მომსახურება მოიცავს სრულ ფინანსურ პასუხისმგებლობას.
                </p>

                <p className="text-sm text-gray-400 leading-relaxed">
                  თქვენი ტვირთი დაზღვეულია ჩაბარებისთანავე. ნებისმიერი გაუთვალისწინებელი შემთხვევის (დაზიანება, დაკარგვა) დროს, ზარალი მყისიერად და სრულად ანაზღაურდება ყოველგვარი დამატებითი ბიუროკრატიული პროცესების გარეშე.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  
                  <div className="flex items-start space-x-3 bg-[#121212] p-4.5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-black text-white text-sm uppercase">მყისიერი ანაზღაურება</h4>
                      <p className="text-xs text-gray-400 mt-1">ზარალის სრული 100%-იანი დაფარვა უმოკლეს ვადაში</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-[#121212] p-4.5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-black text-white text-sm uppercase">სისტემატური კონტროლი</h4>
                      <p className="text-xs text-gray-400 mt-1">ტვირთი იმყოფება მუდმივი დაცვისა და მონიტორინგის ქვეშ</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column Certificate graphic presentation */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-md bg-gradient-to-br from-[#1E1112] to-[#121212] border-2 border-[#C41E24]/30 rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
                  <span className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C41E24]/10 to-transparent"></span>
                  
                  {/* Neon Glow Icon */}
                  <div className="mx-auto w-24 h-24 rounded-full bg-[#C41E24] flex items-center justify-center text-[#FFD700] shadow-[0_0_35px_rgba(196,30,36,0.5)] border border-white/10 animate-luxury-float">
                    <Shield className="w-11 h-11" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[#FFD700] text-xs font-black uppercase tracking-widest block">გარანტიის პოლისი</span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">უსაფრთხო მიწოდება</h3>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed font-medium">
                      დაზღვევის პირობები გაწერილია ჩაბარების აქტში და ავტომატურად ძალაშია გაგზავნის მომენტიდან.
                    </p>
                  </div>

                  {/* Policy specs details */}
                  <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-2 text-left text-xs font-medium">
                    <div className="flex justify-between text-gray-300">
                      <span>ფინანსური რისკი:</span>
                      <span className="text-[#FFD700] font-black">0% (დაზღვეული)</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>ანაზღაურების პირობა:</span>
                      <span className="text-green-400 font-black">სრული 100%</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>სტატუსი:</span>
                      <span className="text-green-400 font-black flex items-center space-x-1 uppercase text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span>გარანტირებული</span>
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* EXTRA: DETAILED FAQ ACCORDION BLOCK (Gives Enterprise Premium Feel) */}
        <section className="py-24 bg-[#0E0E0E] border-b border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center space-y-3 mb-16">
              <span className="text-[#C41E24] text-xs font-black tracking-widest uppercase block">კითხვები და პასუხები / FAQ</span>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">ხშირად დასმული კითხვები</h2>
              <p className="text-gray-400 text-sm">
                მიიღეთ სწრაფი პასუხები ამანათების გაგზავნასა და ტარიფებთან დაკავშირებით
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "როგორ ხდება ამანათების ჩაბარება?",
                  a: "ამანათის გაგზავნისთვის შეგიძლიათ მობრძანდეთ ჩვენს საწყობში ან დაგვიკავშირდით ნომერზე +511 30 30 50. კურიერი მოვა თქვენს მისამართზე, ჩაიბარებს ამანათს და გადასცემს საწყობს შემდგომი გადაზიდვისთვის."
                },
                {
                  q: "რა ვადებში ხდება ტვირთის მიწოდება საქართველოს რეგიონებში?",
                  a: "ტვირთის ტრანსპორტირება და ადრესატისთვის ჩაბარება ხდება მაქსიმუმ 4 დღის განმავლობაში. ხშირ შემთხვევაში, მიწოდება სრულდება ბევრად უფრო სწრაფად (1-2 სამუშაო დღეში), განსაკუთრებით დიდ ქალაქებში."
                },
                {
                  q: "შედის თუ არა ფასში დაზღვევა და როგორ ანაზღაურდება დაზიანება?",
                  a: "დიახ, ყველა ამანათი სრულად დაზღვეულია ჩაბარებისთანავე. ნებისმიერი გაუთვალისწინებელი შემთხვევის ან ტრანსპორტირებისას ტვირთის დაზიანების შემთხვევაში, ზარალი ანაზღაურდება სრულად, კოლექტიური პასუხისმგებლობის პრინციპით."
                },
                {
                  q: "მუშაობს თუ არა GAATANE შაბათ-კვირას?",
                  a: "ჩვენი საწყობები და დახარისხების ცენტრები მუშაობენ უწყვეტად 24/7 რეჟიმში. შაბათ-კვირას ასევე სრულდება საქალაქთაშორისო რეისები, რაც უზრუნველყოფს მიწოდების უწყვეტ ჯაჭვს."
                }
              ].map((faq, idx) => (
                <div 
                  key={`faq-row-${idx}`}
                  className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left text-white font-bold text-base sm:text-lg focus:outline-none cursor-pointer hover:bg-white/2"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-[#C41E24] text-xl transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === idx ? 'max-h-60 border-t border-white/5' : 'max-h-0'}`}
                  >
                    <p className="p-6 text-gray-400 text-sm leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION: CONTACT */}
        <section id="contact" className="py-20 bg-[#0A0A0A]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-[#121212] to-[#0E0E0E] rounded-3xl border border-white/10 p-8 sm:p-12 text-center shadow-2xl space-y-6">
              <span className="text-xs text-[#C41E24] font-black tracking-widest uppercase block">
                კონტაქტი
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                გამოიძახეთ კურიერი დღესვე
              </h3>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="tel:+511303050" 
                  id="contact-phone-link"
                  className="w-full sm:w-auto px-8 py-5 bg-[#C41E24] hover:bg-[#A3181D] text-white font-mono font-black text-2xl sm:text-3xl rounded-2xl shadow-xl shadow-[#C41E24]/20 transition-all flex items-center justify-center space-x-3"
                >
                  <Phone className="w-7 h-7 text-[#FFD700] animate-bounce" />
                  <span>+511 30 30 50</span>
                </a>
                <a
                  href="https://wa.me/511303050"
                  target="_blank"
                  rel="noreferrer"
                  id="contact-whatsapp-btn"
                  className="w-full sm:w-auto px-8 py-5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-black text-sm rounded-2xl transition-all flex items-center justify-center space-x-2.5 shadow-lg uppercase tracking-wider cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>WhatsApp ჩატი</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 4. PREMIUM INDUSTRIAL FOOTER */}
      <footer className="bg-[#080808] border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-10 gap-6">
            
            {/* Logo Brand Footer */}
            <div className="flex items-center space-x-3">
              <SecureFooterLogo />
              <span className="font-black text-xl text-white tracking-tighter uppercase">
                GAAT<span className="text-[#C41E24]">ANE</span>
              </span>
            </div>

            {/* Shield Indicator badge */}
            <div className="flex items-center space-x-2.5 bg-black/40 border border-[#C41E24]/20 px-4 py-2.5 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
              <span className="text-[10px] text-gray-300 font-extrabold uppercase tracking-widest">
                🛡️ სრული დაზღვევა შედის მომსახურებაში
              </span>
            </div>

            {/* Operator phone links */}
            <div className="flex items-center space-x-2.5">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">კონტაქტი:</span>
              <a 
                href="tel:+511303050" 
                id="footer-phone-link"
                className="text-[#C41E24] hover:text-white font-black font-mono text-xl hover:underline flex items-center space-x-1.5 transition-colors"
              >
                <Phone className="w-4.5 h-4.5 text-[#FFD700]" />
                <span>+511 30 30 50</span>
              </a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 gap-4 font-medium">
            <p>© 2026 GAATANE – ყველა უფლება დაცულია.</p>
            <div className="flex items-center space-x-4">
              <span className="text-[#C41E24] font-black uppercase">საიმედო მიტანა საქართველოში</span>
              <span>•</span>
              <span className="text-gray-400">მიწოდება მაქსიმუმ 4 დღეში</span>
            </div>
          </div>

        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-5 left-4 right-4 z-50 bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center justify-around shadow-[0_10px_35px_rgba(0,0,0,0.9)] max-w-lg mx-auto">
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
          className="flex flex-col items-center justify-center py-1 px-3 text-gray-400 hover:text-white transition-colors group"
        >
          <Home className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          <span className="text-[9px] font-black uppercase tracking-wider mt-1">მთავარი</span>
        </a>

        <a 
          href="#coverage" 
          onClick={(e) => { e.preventDefault(); scrollToSection('coverage'); }}
          className="flex flex-col items-center justify-center py-1 px-3 text-gray-400 hover:text-[#C41E24] transition-colors group"
        >
          <MapPin className="w-5 h-5 text-gray-400 group-hover:text-[#C41E24] transition-colors" />
          <span className="text-[9px] font-black uppercase tracking-wider mt-1">დაფარვა</span>
        </a>

        <a 
          href="#contact" 
          onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
          className="flex flex-col items-center justify-center py-1 px-3 text-gray-400 hover:text-[#C41E24] transition-colors group"
        >
          <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#C41E24] transition-colors" />
          <span className="text-[9px] font-black uppercase tracking-wider mt-1">კონტაქტი</span>
        </a>

        <a 
          href="tel:+511303050" 
          className="flex flex-col items-center justify-center py-1 px-3.5 bg-[#C41E24] text-white rounded-xl shadow-lg shadow-[#C41E24]/20 animate-pulse"
        >
          <Phone className="w-5 h-5 text-white" />
          <span className="text-[9px] font-black uppercase tracking-wider mt-1">დარეკვა</span>
        </a>
      </div>

    </div>
  );
}
