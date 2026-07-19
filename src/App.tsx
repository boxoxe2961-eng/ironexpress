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
  ThumbsUp,
  Map,
  CheckCircle2,
  Lock,
  Heart
} from 'lucide-react';

// Structured list of all requested Georgian cities with coordinates calibrated for road distance representation
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


// Reusable component to handle potential loading issues with user provided images
function SecureImage({ 
  src, 
  alt, 
  fallbackIcon: FallbackIcon, 
  className, 
  imgClassName = "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
}: { 
  src: string; 
  alt: string; 
  fallbackIcon: React.ComponentType<any>; 
  className?: string; 
  imgClassName?: string;
}) {
  const [error, setError] = useState(false);

  return (
    <div className={className}>
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          className={imgClassName}
          onError={() => setError(true)}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#1B1B1B] text-[#C41E24] p-6 text-center shadow-inner">
          <FallbackIcon className="w-12 h-12 mb-3 stroke-[1.2] text-[#C41E24]" />
          <span className="text-xs text-gray-400 font-extrabold uppercase tracking-wider">{alt}</span>
          <span className="text-[10px] text-gray-600 mt-1 uppercase font-bold">გამოსახულება მიუწვდომელია</span>
        </div>
      )}
    </div>
  );
}

function SecureLogo() {
  const [error, setError] = useState(false);
  const logoUrl = "https://cdn.discordapp.com/attachments/1527015806704160899/1528452737828651241/image.png?ex=6a5e5a09&is=6a5d0889&hm=2307f53b9b6903d208da7d2d93aa050125bcc13c5908e811bc7040cd6af5b43f&";

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
    <div className="relative w-12 h-12 bg-[#161616] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(196,30,36,0.25)] border border-[#C41E24]/30 overflow-hidden transition-transform group-hover:scale-105">
      <img 
        src={logoUrl} 
        alt="IRONEXPRESS" 
        className="w-full h-full object-contain p-1"
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function SecureFooterLogo() {
  const [error, setError] = useState(false);
  const logoUrl = "https://cdn.discordapp.com/attachments/1527015806704160899/1528452737828651241/image.png?ex=6a5e5a09&is=6a5d0889&hm=2307f53b9b6903d208da7d2d93aa050125bcc13c5908e811bc7040cd6af5b43f&";

  if (error) {
    return (
      <div className="w-10 h-10 rounded bg-[#C41E24] flex items-center justify-center text-white font-black text-lg shadow-md">
        I
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded bg-[#161616] border border-[#C41E24]/30 overflow-hidden flex items-center justify-center shadow-lg">
      <img 
        src={logoUrl} 
        alt="IRONEXPRESS" 
        className="w-full h-full object-contain p-0.5"
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering cities by search query
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return CITIES_DATA;
    const q = searchQuery.toLowerCase();
    return CITIES_DATA.filter(c =>
      c.ge.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const largeCities = useMemo(() => CITIES_DATA.filter(c => c.type === 'large'), []);
  const normalCities = useMemo(() => CITIES_DATA.filter(c => c.type === 'normal'), []);

  // React Smooth Scroll Helper (attaches to anchor elements)
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col font-sans text-gray-100 antialiased selection:bg-[#C41E24] selection:text-white">
      
      {/* Top Professional Highway Indicator Bar */}
      <div className="bg-[#161616] text-gray-400 text-[11px] py-2.5 px-4 text-center border-b border-white/5 font-semibold tracking-wider flex items-center justify-center space-x-6">
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C41E24] animate-pulse inline-block"></span>
          <span className="text-white">კავშირი: </span>
          <a href="tel:+511303050" className="text-[#FFD700] hover:underline font-bold">+511 30 30 50</a>
        </span>
        <span className="hidden sm:inline text-white/25">|</span>
        <span className="hidden sm:inline text-[#FFD700] font-black uppercase tracking-wide">🛡️ 100% სრული დაზღვევა თითოეულ ამანათზე</span>
        <span className="hidden md:inline text-white/25">|</span>
        <span className="hidden md:inline">სამუშაო რეჟიმი: 24/7 საწყობი</span>
      </div>

      {/* Industrial Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#141414]/95 backdrop-blur-md border-b border-[#C41E24]/30 shadow-lg transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo / Brand */}
            <a 
              href="#hero"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center space-x-3 group"
              id="brand-logo"
            >
              <SecureLogo />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tighter leading-none group-hover:text-[#C41E24] transition-colors">
                  IRON<span className="text-[#C41E24]">EXPRESS</span>
                </span>
                <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase mt-1">
                  HEAVY DUTY LOGISTICS
                </span>
              </div>
            </a>

            {/* Navigation links - No buttons, simple styled anchor links with click handlers for smooth scrolls */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                className="text-xs font-black tracking-widest uppercase text-gray-300 hover:text-[#C41E24] transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-[#C41E24] hover:after:w-full after:transition-all"
              >
                ჩვენ შესახებ
              </a>
              <a
                href="#coverage"
                onClick={(e) => { e.preventDefault(); scrollToSection('coverage'); }}
                className="text-xs font-black tracking-widest uppercase text-gray-300 hover:text-[#C41E24] transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-[#C41E24] hover:after:w-full after:transition-all"
              >
                დაფარვის ზონა
              </a>
              <a
                href="#insurance"
                onClick={(e) => { e.preventDefault(); scrollToSection('insurance'); }}
                className="text-xs font-black tracking-widest uppercase text-gray-300 hover:text-[#C41E24] transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-[#C41E24] hover:after:w-full after:transition-all"
              >
                სრული დაზღვევა
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="text-xs font-black tracking-widest uppercase text-gray-300 hover:text-[#C41E24] transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-[#C41E24] hover:after:w-full after:transition-all"
              >
                კონტაქტი
              </a>
            </nav>

            {/* Phone Link on Right (as requested: No buttons, only phone link and WhatsApp) */}
            <div className="flex items-center">
              <a 
                href="tel:+511303050"
                id="header-phone-cta"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#C41E24]/30 rounded-xl text-xs sm:text-sm font-black text-white hover:text-[#C41E24] transition-all"
              >
                <Phone className="w-4 h-4 text-[#FFD700]" />
                <span className="tracking-tight">+511 30 30 50</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* SECTION 1: HERO */}
        <section id="hero" className="relative bg-gradient-to-b from-[#141414] to-[#0E0E0E] py-20 sm:py-32 overflow-hidden border-b border-[#C41E24]/10">
          
          {/* Subtle background road grid lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-y-1 transform scale-110 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Hero Block */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                
                {/* Insurance and Tagline badges */}
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3">
                  <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#C41E24]/20 text-[#FFC4C4] border border-[#C41E24]/40 rounded-xl text-xs font-black uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
                    <span>🛡️ სრული დაზღვევა</span>
                  </span>
                  <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-white/5 text-gray-300 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>პრემიუმ მომსახურება</span>
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none uppercase">
                    IRONEXPRESS – თქვენი <br />
                    <span className="text-[#C41E24] drop-shadow-[0_2px_10px_rgba(196,30,36,0.3)]">საიმედო საკურიერო</span> პარტნიორი
                  </h1>

                  <p className="text-xl sm:text-2xl font-bold text-gray-300 tracking-wide uppercase">
                    🚚 მიტანა მაქსიმუმ <span className="text-[#FFD700] text-3xl font-black">4</span> დღეში საქართველოს მასშტაბით
                  </p>
                </div>

                {/* Highly visible phone number layout */}
                <div className="p-6 bg-[#161616] rounded-2xl border-l-8 border-[#C41E24] shadow-2xl max-w-xl mx-auto lg:mx-0 space-y-3">
                  <span className="text-[10px] text-gray-400 font-black tracking-widest uppercase block">გამოსაძახებელი ტელეფონი</span>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <a 
                      href="tel:+511303050" 
                      className="text-3xl sm:text-4xl font-black text-[#C41E24] hover:text-white transition-colors tracking-tight flex items-center space-x-2.5"
                      id="hero-phone-cta"
                    >
                      <Phone className="w-8 h-8 text-[#FFD700]" />
                      <span>+511 30 30 50</span>
                    </a>
                    <span className="px-3 py-1 bg-[#C41E24]/20 border border-[#C41E24]/50 text-[#FFC4C4] text-[10px] font-black rounded-lg tracking-wider uppercase">
                      უფასო ზარი
                    </span>
                  </div>
                </div>

                {/* Call to Actions - Strictly WhatsApp and Phone links as requested */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
                  <a
                    href="https://wa.me/511303050"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="hero-whatsapp-link"
                    className="w-full sm:w-auto px-8 py-4.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-black rounded-xl shadow-xl hover:shadow-[#25D366]/20 transition-all flex items-center justify-center space-x-3 text-sm tracking-wider uppercase"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>WhatsApp ჩატი</span>
                  </a>

                  <a
                    href="tel:+511303050"
                    id="hero-call-link"
                    className="w-full sm:w-auto px-8 py-4.5 bg-[#161616] hover:bg-[#222] border-2 border-white/10 hover:border-[#C41E24] text-gray-100 font-black rounded-xl transition-all flex items-center justify-center space-x-2.5 text-sm tracking-wider uppercase"
                  >
                    <Phone className="w-5 h-5 text-[#FFD700]" />
                    <span>დარეკეთ ახლავე</span>
                  </a>
                </div>

              </div>

              {/* Right Hero Branded Truck Container with SVG Vector */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md bg-gradient-to-br from-[#1E1E1E] to-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                  
                  {/* Industrial Metal Screws visual style */}
                  <span className="absolute top-3 left-3 w-2 h-2 rounded-full bg-white/20 border border-black/50"></span>
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white/20 border border-black/50"></span>
                  <span className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-white/20 border border-black/50"></span>
                  <span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-white/20 border border-black/50"></span>

                  {/* Brand container truck custom vector */}
                  <div className="w-full h-44 bg-[#0E0E0E] rounded-2xl p-4 flex flex-col justify-center items-center relative overflow-hidden border border-white/5 shadow-inner">
                    
                    {/* Branded heavy container truck illustration */}
                    <svg viewBox="0 0 220 110" className="w-full h-full max-h-[140px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Sky / Horizon backdrop */}
                      <line x1="10" y1="85" x2="210" y2="85" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />
                      <circle cx="170" cy="35" r="12" fill="rgba(196,30,36,0.15)" />
                      
                      {/* Asphalt Road */}
                      <path d="M 5 85 L 215 85 L 205 102 L 15 102 Z" fill="#222" opacity="0.8" />
                      <line x1="20" y1="94" x2="200" y2="94" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="8 6" />

                      {/* IRONEXPRESS HEAVY TRUCK CONTAINER */}
                      <g id="truck-body" transform="translate(10, 10)">
                        {/* Main Trailer Cabin base structure */}
                        <rect x="25" y="15" width="115" height="48" fill="#8B1C1F" rx="3" stroke="#C41E24" strokeWidth="2" />
                        <rect x="27" y="17" width="111" height="44" fill="#a3181d" rx="2" />
                        
                        {/* Iron reinforcement lines on trailer container */}
                        <line x1="40" y1="18" x2="40" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="55" y1="18" x2="55" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="70" y1="18" x2="70" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="85" y1="18" x2="85" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="100" y1="18" x2="100" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="115" y1="18" x2="115" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />
                        <line x1="130" y1="18" x2="130" y2="60" stroke="#8B1C1F" strokeWidth="1.5" />

                        {/* White Branded "IRONEXPRESS" Text printed bold */}
                        <text x="32" y="44" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="FiraGO, Arial, sans-serif" letterSpacing="0.5">
                          IRONEXPRESS
                        </text>
                        
                        {/* Trailer connection hinge */}
                        <rect x="138" y="52" width="12" height="6" fill="#333" />

                        {/* Driver Front Cabin (Truck Head) */}
                        <path d="M 148 28 L 172 28 C 178 28 181 33 183 38 L 188 50 C 189 54 189 63 184 63 L 148 63 Z" fill="#C41E24" stroke="#8B1C1F" strokeWidth="1" />
                        <path d="M 150 30 L 170 30 C 175 30 178 33 180 38 L 184 48 C 185 51 183 55 180 55 L 150 55 Z" fill="#111" /> {/* Windshield */}
                        <rect x="152" y="56" width="14" height="6" fill="#444" /> {/* Door Handle */}
                        <circle cx="186" cy="51" r="2.5" fill="#FFD700" /> {/* Headlight */}

                        {/* Truck wheels */}
                        {/* Trailer wheels */}
                        <circle cx="45" cy="67" r="10" fill="#222" stroke="#444" strokeWidth="2.5" />
                        <circle cx="45" cy="67" r="3.5" fill="#FFF" />
                        <circle cx="68" cy="67" r="10" fill="#222" stroke="#444" strokeWidth="2.5" />
                        <circle cx="68" cy="67" r="3.5" fill="#FFF" />
                        
                        <circle cx="118" cy="67" r="10" fill="#222" stroke="#444" strokeWidth="2.5" />
                        <circle cx="118" cy="67" r="3.5" fill="#FFF" />
                        <circle cx="138" cy="67" r="10" fill="#222" stroke="#444" strokeWidth="2.5" />
                        <circle cx="138" cy="67" r="3.5" fill="#FFF" />

                        {/* Front Cabin wheels */}
                        <circle cx="170" cy="67" r="10" fill="#222" stroke="#444" strokeWidth="2.5" />
                        <circle cx="170" cy="67" r="3.5" fill="#FFF" />
                      </g>
                    </svg>

                    <div className="absolute top-2 right-2 px-2.5 py-0.5 bg-green-500 text-black text-[8px] font-black uppercase rounded-md tracking-wider">
                      ხაზზეა (On Duty)
                    </div>
                  </div>

                  {/* Branded stats and warranty details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-bold uppercase">ავტოპარკი</span>
                      <span className="text-xs font-bold text-[#FFD700] uppercase">საკუთარი ტრანსპორტი</span>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/5 text-sm text-gray-300">
                      <div className="flex items-start space-x-2.5">
                        <CheckSquare className="w-4 h-4 text-[#C41E24] shrink-0 mt-0.5" />
                        <span><strong>უსაფრთხო მიტანა</strong> საქართველოს ნებისმიერ წერტილში</span>
                      </div>
                      <div className="flex items-start space-x-2.5">
                        <CheckSquare className="w-4 h-4 text-[#C41E24] shrink-0 mt-0.5" />
                        <span><strong>მონიტორინგი</strong> 24 საათის განმავლობაში</span>
                      </div>
                    </div>

                    {/* Complete insurance shield badge */}
                    <div className="bg-[#C41E24]/10 border border-[#C41E24]/30 rounded-2xl p-4 flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#C41E24] flex items-center justify-center text-[#FFD700] shrink-0 shadow-lg">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#FFD700] uppercase">სრული დაზღვევა შედის</p>
                        <p className="text-[11px] text-gray-400">ამანათი დაზღვეულია პირველივე წამიდან</p>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT US */}
        <section id="about" className="py-24 bg-[#121212] border-b border-white/5 relative">
          
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C41E24]/2 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Mission Statement */}
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-20">
              <div className="inline-flex items-center space-x-2">
                <span className="h-1 w-8 bg-[#C41E24]"></span>
                <span className="text-[#C41E24] text-xs font-black tracking-widest uppercase">ჩვენი მისია / MISSION</span>
                <span className="h-1 w-8 bg-[#C41E24]"></span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-snug">
                „ჩვენი მისია – უზრუნველვყოთ სწრაფი, უსაფრთხო და საიმედო მიტანა საქართველოს ყველა კუთხეში.“
              </h2>

              <p className="text-base sm:text-lg text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto bg-[#181818] p-6 sm:p-8 rounded-2xl border border-white/5 shadow-2xl">
                „მიტანა მაქსიმუმ <span className="text-[#FFD700] font-black">4</span> დღეში. თქვენ აბარებთ კურიერს თქვენს ამანათს, იგი შემდეგ გადაადგილდება საწყობში და გაგზავნა მოხდება მაქსიმუმ <span className="text-[#FFD700] font-black">4</span> დღეში.“
              </p>
            </div>

            {/* მიტანა ხდება Section */}
            <div className="mb-24 space-y-12">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-[#C41E24] text-xs font-black tracking-widest uppercase block">ტრანსპორტირება / FLEET</span>
                <h3 className="text-3xl sm:text-4xl font-black text-white mt-2 uppercase">მიტანა ხდება:</h3>
                <p className="text-gray-400 mt-3 text-sm sm:text-base">
                  ჩვენი საიმედო ავტოპარკი მზად არის ნებისმიერი ტიპისა და სირთულის მიწოდებისთვის
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                
                {/* Delivery Option 1: მარშუტკით */}
                <div className="bg-[#181818] border border-white/5 hover:border-[#C41E24]/30 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group flex flex-col">
                  <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-black/50 shrink-0">
                    <SecureImage 
                      src="https://media.discordapp.net/attachments/1527015806704160899/1528453092390080602/5078b11c-92d2-4fb5-8386-d09ff892eeb6.png?ex=6a5e5a5e&is=6a5d08de&hm=59be64c88f1681c53edd2b3fe5e600ad14960cf72711565c3ee48ee931869c4d&=&format=webp&quality=lossless&width=822&height=548"
                      alt="მიტანა მარშუტკით"
                      fallbackIcon={Truck}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Delivery Option 2: მანქანით */}
                <div className="bg-[#181818] border border-white/5 hover:border-[#C41E24]/30 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group flex flex-col">
                  <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-black/50 shrink-0">
                    <SecureImage 
                      src="https://media.discordapp.net/attachments/1527015806704160899/1528450409784676524/Gemini_Generated_Image_k2ec1kk2ec1kk2ec.png?ex=6a5e57de&is=6a5d065e&hm=d88a4c73468cfa9f7cb3a2d152bcf44d89fc909f934ffd12f7a8facc5fbaff1b&=&format=webp&quality=lossless&width=515&height=350"
                      alt="მიტანა მანქანით"
                      fallbackIcon={Navigation}
                      className="w-full h-full"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Why Choose Us Grid */}
            <div className="space-y-12">
              
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-[#C41E24] text-xs font-black tracking-widest uppercase block">უპირატესობები</span>
                <h3 className="text-3xl font-black text-white mt-2 uppercase">რატომ IRONEXPRESS?</h3>
                <p className="text-gray-400 mt-3 text-sm sm:text-base">
                  ჩვენ გვაქვს გამოცდილება, ინფრასტრუქტურა და პასუხისმგებლობა, რათა თქვენი ტვირთი მივიდეს უსაფრთხოდ.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Advantage Card 1 */}
                <div className="bg-[#181818] border border-white/5 hover:border-[#C41E24]/50 rounded-2xl p-8 shadow-xl transition-all duration-300 group flex flex-col justify-between" id="advantage-card-1">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#C41E24]/10 border border-[#C41E24]/30 text-[#C41E24] flex items-center justify-center transition-all group-hover:bg-[#C41E24] group-hover:text-white shadow-md">
                      <Truck className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-white tracking-tight">🚚 საიმედო ტრანსპორტი</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      ჩვენი საკუთარი ავტოპარკი და გამოცდილი მძღოლები უზრუნველყოფენ ამანათების შეუფერხებელ ტრანსპორტირებას მთელ საქართველოში ნებისმიერ კლიმატურ პირობებში.
                    </p>
                  </div>
                  <span className="text-xs font-black text-[#FFD700] tracking-wider uppercase mt-8 block">რეგულარული რეისები</span>
                </div>

                {/* Advantage Card 2 */}
                <div className="bg-[#181818] border border-white/5 hover:border-[#C41E24]/50 rounded-2xl p-8 shadow-xl transition-all duration-300 group flex flex-col justify-between" id="advantage-card-2">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#C41E24]/10 border border-[#C41E24]/30 text-[#C41E24] flex items-center justify-center transition-all group-hover:bg-[#C41E24] group-hover:text-white shadow-md">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-white tracking-tight">🛡️ სრული დაზღვევა</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      თქვენი ამანათი სრულად დაზღვეულია ჩაბარების მომენტიდან. ნებისმიერი გაუთვალისწინებელი შემთხვევის დროს, ზარალი მყისიერად და სრულად ანაზღაურდება.
                    </p>
                  </div>
                  <span className="text-xs font-black text-[#FFD700] tracking-wider uppercase mt-8 block">100% ფინანსური გარანტია</span>
                </div>

                {/* Advantage Card 3 */}
                <div className="bg-[#181818] border border-white/5 hover:border-[#C41E24]/50 rounded-2xl p-8 shadow-xl transition-all duration-300 group flex flex-col justify-between" id="advantage-card-3">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#C41E24]/10 border border-[#C41E24]/30 text-[#C41E24] flex items-center justify-center transition-all group-hover:bg-[#C41E24] group-hover:text-white shadow-md">
                      <Clock className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-white tracking-tight">⏱️ დროული მიტანა</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      მაქსიმუმ 4 დღე, ხშირ შემთხვევაში კი ბევრად უფრო სწრაფად. ჩვენ არ ვარღვევთ დათქმულ ვადებს და ყოველთვის ვიცავთ მიწოდების ოპტიმალურ გრაფიკს.
                    </p>
                  </div>
                  <span className="text-xs font-black text-[#FFD700] tracking-wider uppercase mt-8 block">უწყვეტი საწყობის ლოჯისტიკა</span>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* SECTION 3: COVERAGE */}
        <section id="coverage" className="py-24 bg-[#0E0E0E] border-b border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#C41E24] text-xs font-black tracking-widest uppercase block">გეოგრაფია და რუკა</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 uppercase">ვმუშაობთ მთელ საქართველოში</h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                ქვემოთ მოცემულია ქალაქების სრული ჩამონათვალი, სადაც ხდება ამანათების უსაფრთხო მიტანა და ჩაბარება.
              </p>
            </div>

            {/* City Live Search Block - No submit button, live filtering on key stroke */}
            <div className="max-w-md mx-auto mb-12 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="მოძებნე ქალაქი (მაგ: თბილისი, ბათუმი...)"
                className="w-full px-5 py-4 pl-12 bg-[#161616] border border-white/10 hover:border-[#C41E24]/30 focus:border-[#C41E24] rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#C41E24] transition-all placeholder:text-gray-500 font-bold shadow-lg"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-4.5" />
            </div>

            {/* Search results or standard listing */}
            {!searchQuery ? (
              <div className="space-y-16">
                
                {/* Category 1: დიდი ქალაქები */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2.5 border-b border-[#C41E24]/30 pb-3">
                    <Award className="w-5 h-5 text-[#FFD700]" />
                    <h3 className="text-lg font-black text-white uppercase tracking-wider">დიდი ქალაქები</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {largeCities.map((city) => (
                      <div 
                        key={city.id}
                        className="bg-[#161616] border border-white/5 p-5 rounded-xl text-center group transition-all hover:bg-gradient-to-b hover:from-[#161616] hover:to-[#C41E24]/10 shadow-md border-b-2 hover:border-b-[#C41E24]"
                      >
                        <MapPin className="w-6 h-6 text-[#C41E24] mx-auto mb-2.5 transition-transform group-hover:scale-110" />
                        <span className="font-bold text-white text-sm block">{city.ge}</span>
                        <span className="text-[9px] text-[#FFD700] uppercase font-bold tracking-widest mt-1.5 block">ცენტრალი</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category 2: რეგიონული ქალაქები */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2.5 border-b border-white/10 pb-3">
                    <Navigation className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-black text-gray-300 uppercase tracking-wider">სხვა ქალაქები და ფილიალები</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                    {normalCities.map((city) => (
                      <div 
                        key={city.id}
                        className="bg-[#161616]/60 border border-white/5 p-4 rounded-xl text-center transition-all hover:bg-[#161616] hover:border-white/20 flex items-center space-x-2.5 justify-center shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C41E24] shrink-0"></span>
                        <span className="text-gray-300 text-xs sm:text-sm font-semibold">{city.ge}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              // Search Results view
              <div className="space-y-6">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">ძიების შედეგები ({filteredCities.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredCities.map((city) => (
                    <div 
                      key={city.id}
                      className="bg-[#161616] border border-[#C41E24]/30 p-4.5 rounded-xl text-center transition-all hover:bg-[#C41E24]/10 shadow-md"
                    >
                      <MapPin className="w-5 h-5 text-[#C41E24] mx-auto mb-2" />
                      <span className="font-bold text-white text-sm block">{city.ge}</span>
                      <span className="text-[9px] text-[#FFD700] uppercase font-bold tracking-wider mt-1 block">{city.region}</span>
                    </div>
                  ))}
                  {filteredCities.length === 0 && (
                    <div className="col-span-full py-16 text-center text-gray-500 bg-[#161616] rounded-2xl border border-dashed border-white/10">
                      ქალაქი ამ სახელწოდებით ვერ მოიძებნა. სცადეთ სხვა სახელი.
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* SECTION 4: INSURANCE (100% Full Insurance Policy Showcase) */}
        <section id="insurance" className="py-24 bg-[#121212] border-b border-white/5 relative overflow-hidden">
          
          {/* Subtle decoration vector */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C41E24]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left text description */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center space-x-2">
                  <span className="h-1 w-6 bg-[#C41E24]"></span>
                  <span className="text-[#C41E24] text-xs font-black tracking-widest uppercase">უსაფრთხოების გარანტია</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-none">
                  🛡️ 100% სრული დაზღვევა თითოეულ ამანათზე
                </h2>

                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  თქვენი ამანათი სრულად დაზღვეულია ჩაბარების მომენტიდან. ნებისმიერი გაუთვალისწინებელი შემთხვევის დროს, ზარალი მყისიერად და სრულად ანაზღაურდება.
                </p>

                <p className="text-sm text-gray-400">
                  IRONEXPRESS პასუხისმგებელია თქვენს ტვირთზე. ჩვენი ფინანსური გარანტია ნიშნავს, რომ თქვენ არ გემუქრებათ არანაირი რისკი ტრანსპორტირებისას. უსაფრთხოება და ნდობა ჩვენი უპირველესი პრიორიტეტია.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start space-x-3 bg-[#181818] p-4 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-sm">ნულოვანი რისკი</h4>
                      <p className="text-xs text-gray-400">ზარალის სრული 100% ანაზღაურება</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-[#181818] p-4 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-sm">24/7 მონიტორინგი</h4>
                      <p className="text-xs text-gray-400">ტვირთი მუდმივი მეთვალყურეობის ქვეშ</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right decorative visual block */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-md bg-gradient-to-br from-[#1E1112] to-[#121212] border-2 border-[#C41E24]/30 rounded-3xl p-8 shadow-2xl relative text-center space-y-6">
                  
                  {/* Glowing absolute badge */}
                  <div className="mx-auto w-24 h-24 rounded-full bg-[#C41E24] flex items-center justify-center text-[#FFD700] shadow-[0_0_30px_rgba(196,30,36,0.4)] border border-white/10">
                    <Shield className="w-12 h-12" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[#FFD700] text-xs font-black uppercase tracking-widest block">ოფიციალური სერტიფიკატი</span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">უსაფრთხოების გარანტი</h3>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                      დაზღვევის პოლისი ვრცელდება ყველა ტიპის ამანათზე ავტომატურად, ყოველგვარი დამატებითი მოსაკრებლის გარეშე.
                    </p>
                  </div>

                  <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-2 text-left">
                    <div className="flex justify-between text-xs font-semibold text-gray-300">
                      <span>დაზღვევის ტიპი:</span>
                      <span className="text-[#FFD700] font-bold">ყოვლისმომცველი (All-Risk)</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-gray-300">
                      <span>ანაზღაურება:</span>
                      <span className="text-green-400 font-bold">მყისიერი / 100%</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-gray-300">
                      <span>სტატუსი:</span>
                      <span className="text-green-400 font-bold flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span>აქტიური</span>
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section id="contact" className="py-24 bg-[#0E0E0E]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            
            <div className="bg-gradient-to-br from-[#181818] to-[#111111] rounded-3xl border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12">
              
              {/* Left Column info */}
              <div className="md:col-span-5 bg-[#C41E24] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                {/* Metal rivet decor */}
                <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-white/20"></span>
                <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-white/20"></span>
                
                <div className="space-y-5">
                  <span className="text-xs font-black tracking-widest uppercase bg-black/30 px-3.5 py-1.5 rounded-xl inline-block">
                    კავშირი / CONTACT
                  </span>
                  <h3 className="text-3xl font-black leading-tight uppercase">მოგვწერეთ ან დაგვირეკეთ</h3>
                  <p className="text-sm text-red-100 font-light leading-relaxed">
                    ჩვენი კორპორატიული მომსახურების გუნდი მზადაა ოპერატიულად უპასუხოს ნებისმიერ შეკითხვას ამანათებისა და მიწოდების შესახებ.
                  </p>
                </div>

                <div className="mt-12 pt-6 border-t border-white/15 text-xs text-red-100 flex items-center space-x-2.5 font-bold uppercase">
                  <Clock className="w-4 h-4 text-[#FFD700]" />
                  <span>ცხელი ხაზი მუშაობს უწყვეტად 24/7</span>
                </div>
              </div>

              {/* Right Column big call details and WhatsApp button */}
              <div className="md:col-span-7 p-8 sm:p-12 space-y-8 flex flex-col justify-center bg-[#161616]">
                
                {/* Phone Container */}
                <div className="space-y-2 p-6 bg-black/20 rounded-2xl border border-white/5">
                  <span className="text-xs text-[#FFD700] font-black uppercase tracking-widest block">საქონლის მიღების ხაზი</span>
                  <a 
                    href="tel:+511303050" 
                    id="contact-large-phone"
                    className="block text-3xl sm:text-4xl font-black text-white hover:text-[#C41E24] transition-colors tracking-tight"
                  >
                    +511 30 30 50
                  </a>
                </div>

                {/* WhatsApp Action and email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* WhatsApp Button */}
                  <a 
                    href="https://wa.me/511303050"
                    target="_blank"
                    rel="noreferrer"
                    id="contact-whatsapp-btn"
                    className="p-4.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-black rounded-xl transition-all flex items-center justify-center space-x-2.5 shadow-lg text-sm uppercase tracking-wider"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>WhatsApp ჩატი</span>
                  </a>

                  {/* Email anchor */}
                  <div className="p-4.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center space-x-2">
                    <Mail className="w-5 h-5 text-[#C41E24] shrink-0" />
                    <a href="mailto:info@ironexpress.ge" className="text-xs sm:text-sm font-black text-white hover:underline truncate">
                      info@ironexpress.ge
                    </a>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Industrial Footer with phone repeated and complete insurance shield */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-10 gap-6">
            
            {/* Logo / Brand */}
            <div className="flex items-center space-x-3">
              <SecureFooterLogo />
              <span className="font-black text-xl text-white tracking-tighter">
                IRON<span className="text-[#C41E24]">EXPRESS</span>
              </span>
            </div>

            {/* Shield Insurance badge */}
            <div className="flex items-center space-x-2.5 bg-black/40 border border-[#C41E24]/20 px-4 py-2.5 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
              <span className="text-xs text-gray-300 font-extrabold uppercase tracking-wide">
                🛡️ სრული დაზღვევა (Full Insurance Included)
              </span>
            </div>

            {/* Repeated Phone */}
            <div className="flex items-center space-x-2.5">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">ოპერატორი:</span>
              <a 
                href="tel:+511303050" 
                id="footer-phone-link"
                className="text-[#C41E24] hover:text-white font-black text-xl hover:underline flex items-center space-x-1.5"
              >
                <Phone className="w-4 h-4 text-[#FFD700]" />
                <span>+511 30 30 50</span>
              </a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
            <p>© 2026 IRONEXPRESS – ყველა უფლება დაცულია. საავტორო უფლებები დაცულია.</p>
            <div className="flex space-x-4">
              <span className="text-[#C41E24] font-bold">საიმედო მიტანა საქართველოს მასშტაბით</span>
              <span>•</span>
              <span className="text-gray-400">მიტანა მაქსიმუმ 4 დღეში</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
