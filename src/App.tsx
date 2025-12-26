import { useState, useEffect, useRef, ReactNode } from 'react'

// ============================================
// HOOKS
// ============================================

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrolled
}

// ============================================
// ANIMATION WRAPPER
// ============================================

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const { ref, isInView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ============================================
// ICONS
// ============================================

const Icons = {
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Chat: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  Snowflake: () => <span className="text-2xl">❄️</span>,
  Droplet: () => <span className="text-2xl">💧</span>,
  Clipboard: () => <span className="text-2xl">📋</span>,
  Wrench: () => <span className="text-2xl">🔧</span>,
  Target: () => <span className="text-2xl">🎯</span>,
  Trophy: () => <span className="text-2xl">🏆</span>,
  Money: () => <span className="text-2xl">💰</span>,
  Zap: () => <span className="text-2xl">⚡</span>,
  Shield: () => <span className="text-2xl">🛡️</span>,
  Leaf: () => <span className="text-2xl">🌿</span>,
  Star: () => <span className="text-2xl">⭐</span>,
  Location: () => <span className="text-2xl">📍</span>,
  Clock: () => <span className="text-2xl">🕐</span>,
  Card: () => <span className="text-2xl">💳</span>,
  Phone: () => <span className="text-2xl">📱</span>,
  Document: () => <span className="text-2xl">📄</span>,
}

// ============================================
// HEADER
// ============================================

interface HeaderProps {
  onOpenChat: () => void
  onOpenMenu: () => void
}

function Header({ onOpenChat, onOpenMenu }: HeaderProps) {
  const scrolled = useScrollPosition()

  const navItems = [
    { label: 'Diensten', href: '#diensten' },
    { label: 'Tarieven', href: '#tarieven' },
    { label: 'Werkgebied', href: '#werkgebied' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className={`font-display font-bold text-xl md:text-2xl transition-colors duration-300 ${
              scrolled ? 'text-primary-600' : 'text-white'
            }`}>
              UBERAIRCO
            </div>
            <span className={`hidden sm:block text-xs font-medium transition-colors duration-300 ${
              scrolled ? 'text-accent-500' : 'text-accent-300'
            }`}>
              Airco & Pomp Specialist
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-accent-500 ${
                  scrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button onClick={onOpenChat} className="btn-primary text-sm">
              Plan Afspraak
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMenu}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            <Icons.Menu />
          </button>
        </div>
      </div>
    </header>
  )
}

// ============================================
// MOBILE MENU
// ============================================

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenChat: () => void
}

function MobileMenu({ isOpen, onClose, onOpenChat }: MobileMenuProps) {
  const navItems = [
    { label: 'Diensten', href: '#diensten' },
    { label: 'Tarieven', href: '#tarieven' },
    { label: 'Werkgebied', href: '#werkgebied' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-display font-bold text-xl text-primary-600">Menu</span>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <Icons.Close />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-8">
            <button
              onClick={() => {
                onClose()
                onOpenChat()
              }}
              className="btn-primary w-full"
            >
              Plan Afspraak
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ============================================
// HERO SECTION
// ============================================

interface HeroProps {
  onOpenChat: () => void
}

function Hero({ onOpenChat }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 gradient-bg" />
      
      {/* Overlay Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnptLTYgMGgtNnY2aDZ2LTZ6bTAgMGg2di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-accent-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Reactie binnen 24 uur
            </div>
          </AnimatedSection>

          {/* Headline */}
          <AnimatedSection delay={100}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Airconditioning &
              <span className="block text-accent-400">Pompen Specialist</span>
            </h1>
          </AnimatedSection>

          {/* Subheadline */}
          <AnimatedSection delay={200}>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl">
              STEK-gecertificeerde monteurs voor installatie, reparatie en onderhoud. 
              Eerlijke prijzen, vakkundige service in regio Rotterdam.
            </p>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={onOpenChat} className="btn-primary text-lg px-8 py-4 group">
                Plan een afspraak
                <Icons.ArrowRight />
              </button>
              <a href="#diensten" className="btn-glass">
                Bekijk diensten
              </a>
            </div>
          </AnimatedSection>

          {/* Trust Badges */}
          <AnimatedSection delay={400}>
            <div className="flex flex-wrap gap-3 mt-10">
              {['STEK Gecertificeerd', 'F-gassen bevoegd', '24u reactie', 'PIN betaling'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white/90 text-sm"
                >
                  <Icons.Check />
                  {badge}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}

// ============================================
// USP SECTION
// ============================================

function USPSection() {
  const usps = [
    {
      icon: <Icons.Target />,
      title: 'Slimme Diagnose Vooraf',
      description: 'Via onze chat verzamelen we informatie vóór het bezoek. Zo komt de monteur voorbereid en bespaart u op arbeidskosten.',
    },
    {
      icon: <Icons.Trophy />,
      title: 'Gecertificeerde Vakmensen',
      description: 'Al onze monteurs zijn STEK-gecertificeerd en bevoegd voor F-gassen. Uw installatie in deskundige handen.',
    },
    {
      icon: <Icons.Money />,
      title: 'Transparante Prijzen',
      description: 'Geen verrassingen achteraf. U weet vooraf wat de kosten zijn. Betalen kan direct via PIN.',
    },
    {
      icon: <Icons.Zap />,
      title: 'Snelle Reactie',
      description: 'Binnen 24 uur nemen wij contact op. Bij spoed streven we naar service dezelfde of volgende werkdag.',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Waarom <span className="gradient-text">UberAirco</span>?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Wat ons anders maakt dan de rest
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((usp, index) => (
            <AnimatedSection key={usp.title} delay={index * 100}>
              <div className="group p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-primary-500 hover:to-primary-600 transition-all duration-500 hover-lift">
                <div className="w-14 h-14 rounded-xl bg-primary-100 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors duration-500">
                  {usp.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors duration-500">
                  {usp.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/80 text-sm transition-colors duration-500">
                  {usp.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// WORKFLOW SECTION
// ============================================

function WorkflowSection() {
  const steps = [
    {
      number: '01',
      title: 'Start de Chat',
      description: 'Beantwoord enkele vragen over uw situatie, type apparaat en locatie.',
      benefit: '24/7 beschikbaar',
    },
    {
      number: '02',
      title: 'Bevestiging & Planning',
      description: 'Binnen 24 uur neemt onze planner telefonisch contact op om een afspraak in te plannen.',
      benefit: 'Reactie binnen 24 uur',
    },
    {
      number: '03',
      title: 'Vakkundige Service',
      description: 'De monteur arriveert volledig op de hoogte van uw situatie en met de juiste materialen.',
      benefit: 'Voorbereid = goedkoper',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gray-50" id="werkwijze">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hoe werkt het?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              In 3 eenvoudige stappen geholpen
            </p>
          </div>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-600" />

          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 150}>
              <div className={`relative flex items-center gap-8 mb-12 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}>
                {/* Number Circle */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-display font-bold text-xl items-center justify-center shadow-lg shadow-primary-500/30 z-10">
                  {step.number}
                </div>

                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 1 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="glass-card p-6 rounded-2xl">
                    <div className="md:hidden w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-display font-bold flex items-center justify-center mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <Icons.Check />
                      {step.benefit}
                    </span>
                  </div>
                </div>

                <div className="hidden md:block flex-1" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// SERVICES SECTION
// ============================================

function ServicesSection() {
  const services = [
    {
      icon: <Icons.Snowflake />,
      title: 'Airconditioning',
      description: 'Van installatie tot onderhoud en reparatie van alle merken airconditioners en warmtepompen.',
      features: ['Nieuwe installaties (split & multi-split)', 'Koelmiddel bijvullen (R32, R410A)', 'Storingen & reparaties', 'Periodiek onderhoud', 'Warmtepompen'],
    },
    {
      icon: <Icons.Droplet />,
      title: 'Waterpompen',
      description: 'Installatie, reparatie en onderhoud van bronpompen, regenwaterpompen en drukverhogingsinstallaties.',
      features: ['Bronpompen & putten', 'Regenwateropvang systemen', 'Drukverhogingssets', 'Lekkage opsporen & repareren', 'Pomp vervanging'],
    },
    {
      icon: <Icons.Clipboard />,
      title: 'Onderhoudscontracten',
      description: 'Voorkom storingen met regelmatig onderhoud. Contractklanten krijgen voorrang bij spoedgevallen.',
      features: ['Jaarlijkse inspectie & reiniging', 'Filtervervanging', 'Prestatiecontrole', 'Voorrangsstatus bij storingen', '10% korting op onderdelen'],
    },
    {
      icon: <Icons.Wrench />,
      title: 'Reparatie & Storing',
      description: 'Airco blaast niet koud? Pomp slaat niet aan? Wij lossen het op, snel en vakkundig.',
      features: ['Diagnose ter plaatse', 'Lekkage detectie', 'Elektrische storingen', 'Compressor problemen', 'Advies vervanging vs. reparatie'],
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white" id="diensten">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onze Diensten
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Complete service voor klimaat en waterhuishouding
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 100}>
              <div className="group p-8 rounded-2xl border border-gray-100 hover:border-primary-200 bg-white hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-3xl filter brightness-0 invert">{service.icon}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5"><Icons.Check /></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// PRICING SECTION
// ============================================

function PricingSection() {
  const plans = [
    {
      name: 'Voorrijkosten',
      price: '45',
      unit: 'eenmalig',
      description: 'Inclusief eerste 30 minuten',
      features: ['Inclusief diagnose', 'Binnen regio Rotterdam', 'Vervalt bij opdracht >€200'],
      featured: false,
    },
    {
      name: 'Uurtarief',
      price: '55',
      unit: '/ uur',
      description: 'Arbeid na eerste 30 minuten',
      features: ['Per kwartier afgerekend', 'Materialen apart', 'Geen BTW-verrassingen'],
      featured: true,
    },
    {
      name: 'Onderhoudsbeurt',
      price: '95',
      unit: 'per beurt',
      description: 'Complete airco-onderhoudsbeurt',
      features: ['Reiniging filters & unit', 'Controle koelmiddel', 'Prestatie-check'],
      featured: false,
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gray-50" id="tarieven">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Indicatieve Tarieven
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Transparante prijzen, geen verrassingen
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection key={plan.name} delay={index * 100}>
              <div className={`relative p-8 rounded-2xl transition-all duration-500 hover-lift ${
                plan.featured
                  ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-xl shadow-primary-500/30'
                  : 'bg-white border border-gray-100'
              }`}>
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-500 text-white text-sm font-semibold rounded-full">
                    Populair
                  </span>
                )}
                <h3 className={`font-display text-lg font-semibold mb-2 ${
                  plan.featured ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`font-display text-4xl font-bold ${
                    plan.featured ? 'text-white' : 'text-primary-600'
                  }`}>
                    €{plan.price}
                  </span>
                  <span className={plan.featured ? 'text-white/70' : 'text-gray-500'}>
                    {plan.unit}
                  </span>
                </div>
                <p className={`text-sm mb-6 ${
                  plan.featured ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {plan.description}
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className={`flex items-center gap-3 text-sm ${
                      plan.featured ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      <span className={plan.featured ? 'text-white' : 'text-green-500'}>
                        <Icons.Check />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400}>
          <p className="text-center text-sm text-gray-500 mt-8">
            * Prijzen zijn indicatief en inclusief BTW. Exacte offerte na intake.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ============================================
// BRANDS SECTION
// ============================================

function BrandsSection() {
  const brands = ['Daikin', 'Mitsubishi', 'Samsung', 'LG', 'Toshiba', 'Panasonic', 'Fujitsu', 'Grundfos', 'DAB']

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-center text-sm text-gray-500 mb-8">Wij werken met alle gangbare merken</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {brands.map((brand) => (
              <span
                key={brand}
                className="px-6 py-3 rounded-xl bg-gray-50 text-gray-700 font-semibold hover:bg-primary-50 hover:text-primary-600 transition-colors duration-300 cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ============================================
// CERTIFICATIONS SECTION
// ============================================

function CertificationsSection() {
  const certs = [
    { icon: '🏅', title: 'STEK Gecertificeerd', description: 'Erkend koeltechnisch bedrijf' },
    { icon: '🌿', title: 'F-gassen Bevoegd', description: 'EU 517/2014 compliant' },
    { icon: '⚡', title: 'NEN 1010', description: 'Elektrische installaties' },
  ]

  return (
    <section className="py-20 md:py-32 gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Certificeringen
            </h2>
            <p className="text-white/70">Erkend en gecertificeerd voor uw veiligheid</p>
          </div>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center gap-6">
          {certs.map((cert, index) => (
            <AnimatedSection key={cert.title} delay={index * 100}>
              <div className="glass-card-dark p-8 rounded-2xl text-center min-w-[200px]">
                <span className="text-5xl block mb-4">{cert.icon}</span>
                <h3 className="font-display font-semibold text-lg mb-1">{cert.title}</h3>
                <p className="text-white/60 text-sm">{cert.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// AREA SECTION
// ============================================

function AreaSection() {
  const areas = ['Rotterdam', 'Schiedam', 'Vlaardingen', 'Capelle a/d IJssel', 'Krimpen a/d IJssel', 'Ridderkerk', 'Barendrecht', 'Albrandswaard', 'Hoogvliet', 'Spijkenisse']

  return (
    <section className="py-20 md:py-32 bg-white" id="werkgebied">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Werkgebied
              </h2>
              <p className="text-gray-600 mb-6">
                UberAirco bedient Rotterdam en de directe omgeving binnen een straal van circa 15-20 kilometer. 
                Dit stelt ons in staat om snel ter plaatse te zijn en efficiënt te werken.
              </p>
              <p className="text-gray-600 mb-8">
                Twijfelt u of uw locatie binnen ons werkgebied valt? Start de chat en voer uw postcode in.
              </p>
              <div className="flex flex-wrap gap-2">
                {areas.map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-primary-100 hover:text-primary-700 transition-colors duration-300"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative h-80 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
              <div className="text-8xl opacity-50">📍</div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ============================================
// FAQ SECTION
// ============================================

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Waarom werkt UberAirco met een chat in plaats van telefoon?',
      answer: 'Door vooraf de juiste informatie te verzamelen, kan onze monteur beter voorbereid komen. Dit betekent minder tijd kwijt aan uitzoeken ter plaatse, wat u arbeidskosten bespaart. Bovendien kunt u op elk moment van de dag een aanvraag indienen.',
    },
    {
      question: 'Hoe snel kan een monteur langskomen?',
      answer: 'Na uw aanvraag neemt onze planner binnen 24 uur contact met u op. Afhankelijk van de drukte kunnen we vaak binnen 1-3 werkdagen een afspraak maken. Klanten met een onderhoudscontract krijgen voorrang bij spoedgevallen.',
    },
    {
      question: 'Wat als het probleem ter plaatse anders blijkt?',
      answer: 'De monteur stelt altijd eerst een diagnose. Blijkt het probleem complexer of anders dan verwacht, dan bespreekt hij dit met u inclusief de bijbehorende kosten, vóórdat er verder gewerkt wordt. U houdt altijd de controle.',
    },
    {
      question: 'Hoe kan ik betalen?',
      answer: 'Betaling vindt plaats direct na afronding van de werkzaamheden. U kunt pinnen bij de monteur. Voor grotere projecten of zakelijke klanten is betaling op factuur mogelijk in overleg.',
    },
    {
      question: 'Plaatsen jullie ook nieuwe airconditioning?',
      answer: 'Ja, wij verzorgen complete installaties van airconditioners en warmtepompen. Na een intake ontvangt u een vrijblijvende offerte op maat. Wij werken met alle gangbare merken zoals Daikin, Mitsubishi en Samsung.',
    },
    {
      question: 'Zijn jullie verzekerd?',
      answer: 'Ja, UberAirco is volledig verzekerd met een bedrijfs- en aansprakelijkheidsverzekering. U kunt met een gerust hart ons team in uw woning of bedrijfspand toelaten.',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gray-50" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Veelgestelde Vragen
            </h2>
            <p className="text-gray-600">Snel antwoord op uw vragen</p>
          </div>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 50}>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className={`text-primary-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    <Icons.ChevronDown />
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}>
                  <p className="px-6 pb-5 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// PAYMENT SECTION
// ============================================

function PaymentSection() {
  const methods = [
    { icon: <Icons.Card />, name: 'PIN / Betaalpas' },
    { icon: <Icons.Phone />, name: 'Contactloos' },
    { icon: <Icons.Document />, name: 'Factuur*' },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h3 className="font-display text-xl font-semibold text-gray-900 mb-6">Betaalmogelijkheden</h3>
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              {methods.map((method) => (
                <div key={method.name} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50">
                  {method.icon}
                  <span className="text-sm font-medium text-gray-700">{method.name}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              * Betaling op factuur mogelijk voor zakelijke klanten en projecten boven €500
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ============================================
// CTA SECTION
// ============================================

interface CTASectionProps {
  onOpenChat: () => void
}

function CTASection({ onOpenChat }: CTASectionProps) {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-accent-500 to-accent-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Klaar om te starten?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Plan direct een afspraak via onze chat. Wij nemen binnen 24 uur contact met u op.
          </p>
          <button onClick={onOpenChat} className="bg-white text-accent-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Plan nu een afspraak
          </button>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/80">
            <Icons.Zap />
            <span className="font-semibold">Reactie binnen 24 uur gegarandeerd</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================

function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-2">UBERAIRCO</h3>
            <p className="text-accent-400 text-sm mb-4">Airco & Pomp Specialist — Rotterdam</p>
            <p className="text-white/60 text-sm">📍 Werkgebied: Rotterdam en omgeving (15 km)</p>
            <p className="text-white/60 text-sm">🕐 Ma-Vr: 08:00 - 18:00 | Za: 09:00 - 14:00</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigatie</h4>
            <nav className="space-y-2">
              {['Diensten', 'Tarieven', 'Werkgebied', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-white/60 hover:text-white transition-colors text-sm"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-white/60 text-sm mb-2">💬 Start een chat voor afspraken</p>
            <p className="text-white/60 text-sm">📧 info@uberairco.nl</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2025 UberAirco. Alle rechten voorbehouden. | Algemene Voorwaarden | Privacy
          </p>
          <p className="text-white/40 text-sm">
            KvK: 87654321 | BTW: NL862456789B01
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// CHAT MODAL
// ============================================

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Array<{ type: 'bot' | 'user'; text: string }>>([])
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState({ type: '', category: '', postcode: '' })
  const [inputValue, setInputValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { type: 'bot', text: 'Welkom bij UberAirco! 👋 Ik help u snel op weg.' },
      ])
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: 'Wat kunnen wij voor u doen?' }])
        setStep(1)
      }, 500)
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleOption = (value: string, label: string) => {
    setMessages(prev => [...prev, { type: 'user', text: label }])

    if (step === 1) {
      setUserData(prev => ({ ...prev, type: value }))
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: 'Om welk type installatie gaat het?' }])
        setStep(2)
      }, 500)
    } else if (step === 2) {
      setUserData(prev => ({ ...prev, category: value }))
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: 'Top! Wat is uw postcode? Dan controleer ik of u binnen ons werkgebied valt.' }])
        setStep(3)
      }, 500)
    }
  }

  const handlePostcode = () => {
    if (!inputValue.trim()) return
    const postcode = inputValue.toUpperCase()
    setMessages(prev => [...prev, { type: 'user', text: postcode }])
    setUserData(prev => ({ ...prev, postcode }))
    setInputValue('')

    const valid = ['30', '31', '32', '28', '29', '26', '27', '33'].includes(postcode.substring(0, 2))

    setTimeout(() => {
      if (valid) {
        setMessages(prev => [...prev, { type: 'bot', text: '✅ Uitstekend, u valt binnen ons werkgebied!' }])
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'bot', text: 'Bedankt voor uw vertrouwen in UberAirco. Wij nemen binnen 24 uur telefonisch contact met u op.' }])
          setStep(4)
        }, 500)
      } else {
        setMessages(prev => [...prev, { type: 'bot', text: `Helaas valt postcode ${postcode} buiten ons werkgebied (regio Rotterdam).` }])
      }
    }, 500)
  }

  const options: Record<number, Array<{ value: string; label: string }>> = {
    1: [
      { value: 'install', label: '🆕 Nieuwe installatie' },
      { value: 'repair', label: '🔧 Reparatie of storing' },
      { value: 'maintenance', label: '📋 Onderhoud' },
    ],
    2: [
      { value: 'airco', label: '❄️ Airconditioning / Warmtepomp' },
      { value: 'pump', label: '💧 Waterpomp' },
    ],
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed z-50 transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } inset-4 md:inset-auto md:right-6 md:bottom-6 md:w-[420px] md:h-[600px]`}
      >
        <div className="bg-white rounded-2xl shadow-2xl h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold">UberAirco Assistent</h3>
              <p className="text-sm text-white/70">Online — antwoordt direct</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Icons.Close />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-primary-500 text-white rounded-br-md'
                      : 'bg-white border border-gray-200 rounded-bl-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Options */}
            {options[step] && (
              <div className="space-y-2">
                {options[step].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleOption(opt.value, opt.label)}
                    className="w-full p-4 text-left bg-white border-2 border-primary-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all font-medium"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          {step === 3 && (
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handlePostcode()}
                  placeholder="Bijv. 3011AB"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                />
                <button
                  onClick={handlePostcode}
                  className="px-6 py-3 bg-accent-500 text-white rounded-xl font-semibold hover:bg-accent-600 transition-colors"
                >
                  Verstuur
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ============================================
// FLOATING CHAT BUTTON
// ============================================

interface FloatingChatButtonProps {
  onClick: () => void
}

function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-full shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 transform hover:scale-110 transition-all duration-300 flex items-center justify-center group"
    >
      <Icons.Chat />
      <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
    </button>
  )
}

// ============================================
// MOBILE CHAT BAR
// ============================================

interface MobileChatBarProps {
  onClick: () => void
}

function MobileChatBar({ onClick }: MobileChatBarProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-accent-500 to-accent-600 text-white p-4 flex items-center justify-center gap-3 shadow-lg"
    >
      <Icons.Chat />
      <span className="font-semibold">Plan een afspraak</span>
      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
    </button>
  )
}

// ============================================
// MAIN APP
// ============================================

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Header onOpenChat={() => setChatOpen(true)} onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onOpenChat={() => setChatOpen(true)} />

      <main>
        <Hero onOpenChat={() => setChatOpen(true)} />
        <USPSection />
        <WorkflowSection />
        <ServicesSection />
        <PricingSection />
        <BrandsSection />
        <CertificationsSection />
        <AreaSection />
        <FAQSection />
        <PaymentSection />
        <CTASection onOpenChat={() => setChatOpen(true)} />
      </main>

      <Footer />

      {/* Chat */}
      <FloatingChatButton onClick={() => setChatOpen(true)} />
      <MobileChatBar onClick={() => setChatOpen(true)} />
      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Mobile bottom spacing */}
      <div className="h-16 md:hidden" />
    </div>
  )
}
