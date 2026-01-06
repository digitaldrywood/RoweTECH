import Link from 'next/link'
import Image from 'next/image'
import { FadeInUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'

const services = [
  {
    title: 'Mold Repair',
    description: 'Expert plastic injection mold repair and maintenance to minimize downtime.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    href: '/services#mold-repair',
    featured: true,
  },
  {
    title: 'Custom Fixtures',
    description: 'Precision-engineered workholding fixtures for your production needs.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    href: '/services#fixtures',
  },
  {
    title: 'EOAT Tooling',
    description: 'End-of-arm tooling designed for automation and robotics systems.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    href: '/services#eoat',
  },
  {
    title: 'CNC Machining',
    description: 'High-precision CNC milling and turning for complex parts.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    href: '/services#cnc',
  },
]

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Completed' },
  { value: '48hr', label: 'Quote Response' },
  { value: '100%', label: 'Quality Focused' },
]

const capabilities = [
  { name: 'CNC Milling', desc: '3-axis & multi-axis precision milling' },
  { name: 'CNC Turning', desc: 'Complex cylindrical components' },
  { name: 'Wire EDM', desc: 'Intricate cuts & tight tolerances' },
  { name: 'Surface Grinding', desc: 'Mirror finishes & flatness' },
  { name: 'Mold Repair', desc: 'Weld, machine & polish' },
  { name: 'EOAT Design', desc: 'Custom robotic tooling' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80', title: 'CNC Milling', size: 'large' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Laser Cutting', size: 'small' },
  { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', title: 'Welding', size: 'small' },
  { src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', title: 'Precision Work', size: 'medium' },
]

export default function Home() {
  return (
    <>
      {/* Hero Section - Bold Industrial */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-secondary-950" />
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
          alt="Industrial manufacturing"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-950 via-secondary-950/90 to-secondary-950/70" />
        <div
          className="absolute inset-0 opacity-60 mix-blend-screen animate-ambient-pan"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(198,93,89,0.14), transparent 32%), radial-gradient(circle at 80% 12%, rgba(117,122,120,0.14), transparent 28%), radial-gradient(circle at 30% 78%, rgba(198,93,89,0.08), transparent 30%)',
          }}
        />

        {/* Industrial grid overlay */}
        <div className="absolute inset-0 industrial-grid opacity-30" />
        <div className="sparkle-overlay" />

        {/* Diagonal accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-primary-500/50 via-primary-500/20 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary-500/10 to-primary-500/30" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-primary-500/30 via-transparent to-primary-500/20" />

        {/* Content */}
        <div className="container-custom relative z-10 pt-32 pb-40">
          <div className="max-w-6xl xl:max-w-7xl mx-auto text-center">
            {/* Badge */}
            <FadeInUp>
              <div className="inline-flex items-center px-4 py-2 mb-8 border-l-4 border-primary-500 bg-secondary-900/50 backdrop-blur-sm">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 animate-pulse" />
                <span className="text-primary-400 text-sm font-semibold tracking-[0.25em] uppercase">
                  Wisconsin Precision Manufacturing
                </span>
              </div>
            </FadeInUp>

            {/* Display heading */}
            <FadeInUp delay={0.1}>
              <h1 className="mb-10">
                <span className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] text-white uppercase tracking-tight block leading-[0.95]">
                  Industrial
                </span>
                <span className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] text-primary-500 uppercase tracking-tight block leading-[0.95]">
                  Precision
                </span>
                <span className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-secondary-300 uppercase tracking-[0.25em] block mt-4">
                  Engineered Excellence
                </span>
              </h1>
            </FadeInUp>

            {/* Subheading */}
            <FadeInUp delay={0.2}>
              <p className="text-2xl md:text-3xl xl:text-4xl text-secondary-200 max-w-4xl 2xl:max-w-5xl mx-auto mb-12 leading-relaxed">
                Mold repair, custom fixtures, EOAT tooling, and CNC machining
                for manufacturers who demand precision and reliability.
              </p>
            </FadeInUp>

            {/* CTAs */}
            <FadeInUp delay={0.3}>
              <div className="flex flex-wrap gap-5 justify-center">
                <Link href="/contact" className="btn-primary text-lg md:text-xl px-10 py-5">
                  <span className="flex items-center">
                    Request Quote
                    <svg className="ml-3 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                <a href="tel:+17152023631" className="btn-outline text-lg md:text-xl px-10 py-5">
                  <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (715) 202-3631
                </a>
              </div>
            </FadeInUp>
          </div>
        </div>

        {/* Stats bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-secondary-950/90 backdrop-blur-md border-t border-secondary-800 z-20">
          <div className="container-custom py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16 xl:gap-24">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-500 uppercase">{stat.value}</div>
                  <div className="text-sm text-secondary-400 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <svg className="w-6 h-6 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Section - Bento Grid Layout */}
      <section className="py-24 md:py-32 bg-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-10" />

        <div className="container-custom relative">
          <FadeInUp className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <span className="text-primary-400 font-semibold tracking-[0.2em] uppercase text-sm">What We Do</span>
                <h2 className="section-heading mt-4">Our Services</h2>
              </div>
              <p className="text-secondary-400 text-lg lg:text-xl max-w-xl">
                Comprehensive machining and tooling solutions for plastic injection molding and manufacturing.
              </p>
            </div>
          </FadeInUp>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
            {/* Featured Service - Large */}
            <FadeInUp className="lg:col-span-2 lg:row-span-2">
              <Link href={services[0].href} className="group block h-full">
                <div className="relative h-full min-h-[400px] lg:min-h-[500px] overflow-hidden border border-secondary-800 hover:border-primary-500/50 transition-all duration-500"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}>
                  <Image
                    src={services[0].image}
                    alt={services[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/60 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-primary-500 text-white text-sm font-bold uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                    <h3 className="font-display text-3xl lg:text-4xl uppercase tracking-wide text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {services[0].title}
                    </h3>
                    <p className="text-secondary-300 text-lg mb-4 max-w-xl">{services[0].description}</p>
                    <span className="inline-flex items-center text-primary-400 font-semibold uppercase tracking-wider">
                      Learn More
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInUp>

            {/* Other Services - Stacked */}
            {services.slice(1).map((service, index) => (
              <FadeInUp key={index} delay={(index + 1) * 0.1}>
                <Link href={service.href} className="group block h-full">
                  <div className="relative h-full min-h-[200px] overflow-hidden border border-secondary-800 hover:border-primary-500/50 transition-all duration-500 bg-secondary-900"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}>
                    <div className="absolute inset-0 opacity-30">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/90 to-secondary-950/90" />
                    <div className="relative p-6 h-full flex flex-col justify-end">
                      <span className="text-primary-400 text-xs font-bold uppercase tracking-wider mb-2">
                        {String(index + 2).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-xl uppercase tracking-wide text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-secondary-400 text-sm">{service.description}</p>
                    </div>
                  </div>
                </Link>
              </FadeInUp>
            ))}
          </div>

          <FadeInUp className="text-center mt-12">
            <Link href="/services" className="btn-outline">
              View All Services
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 bg-secondary-900 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-10" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            <SlideInLeft>
              <span className="text-primary-400 font-semibold tracking-[0.2em] uppercase text-sm">Why Choose Us</span>
              <h2 className="section-heading mt-4 mb-6">Precision You Can Trust</h2>
              <p className="text-secondary-300 text-xl mb-10 leading-relaxed">
                We combine decades of machining expertise with responsive service to deliver quality tooling solutions—on time, every time.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: 'Local Shop', desc: 'Quick turnaround from Wisconsin', icon: '📍' },
                  { title: 'Expert Team', desc: 'Decades of combined experience', icon: '👥' },
                  { title: 'Modern CNC', desc: 'State-of-the-art equipment', icon: '⚙️' },
                  { title: 'Flexible', desc: 'Prototypes to production', icon: '🔄' },
                ].map((item, index) => (
                  <div key={index} className="p-5 bg-secondary-950/50 border border-secondary-800 hover:border-primary-500/30 transition-colors"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                    <span className="text-2xl mb-3 block">{item.icon}</span>
                    <h3 className="font-display text-lg uppercase tracking-wide text-white mb-1">{item.title}</h3>
                    <p className="text-secondary-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-primary mt-10 inline-flex">
                Learn More About Us
              </Link>
            </SlideInLeft>

            <SlideInRight>
              <div className="relative">
                <div className="absolute -inset-8 bg-primary-500/10 blur-3xl rounded-full" />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="aspect-[4/5] relative overflow-hidden border border-secondary-800"
                         style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                      <Image
                        src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80"
                        alt="CNC Machining"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 bg-primary-500 text-center"
                         style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                      <div className="font-display text-4xl text-white">15+</div>
                      <div className="text-white/80 text-sm uppercase tracking-wider">Years</div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="p-6 bg-secondary-950 border border-secondary-800 text-center"
                         style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                      <div className="font-display text-4xl text-primary-500">500+</div>
                      <div className="text-secondary-400 text-sm uppercase tracking-wider">Projects</div>
                    </div>
                    <div className="aspect-[4/5] relative overflow-hidden border border-secondary-800"
                         style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                      <Image
                        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80"
                        alt="Manufacturing"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Capabilities Section - Full Width */}
      <section className="py-24 md:py-32 bg-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-950 via-secondary-950/95 to-secondary-950" />
        </div>

        <div className="container-custom relative">
          <FadeInUp className="text-center mb-16">
            <span className="text-primary-400 font-semibold tracking-[0.2em] uppercase text-sm">Our Capabilities</span>
            <h2 className="section-heading mt-4">Advanced Manufacturing</h2>
            <p className="text-secondary-400 text-xl max-w-3xl mx-auto mt-4">
              Equipped with modern CNC machinery to handle your most demanding projects with precision and efficiency.
            </p>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {capabilities.map((cap, index) => (
              <StaggerItem key={index}>
                <div className="group p-8 bg-secondary-900/50 backdrop-blur-sm border border-secondary-800 hover:border-primary-500/50 transition-all duration-300 h-full"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}>
                  <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/30 flex items-center justify-center mb-6 group-hover:bg-primary-500/20 transition-colors"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                    <span className="font-display text-primary-500 text-lg">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-wide text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {cap.name}
                  </h3>
                  <p className="text-secondary-400">{cap.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInUp className="text-center mt-12">
            <Link href="/capabilities" className="btn-outline">
              View Full Capabilities
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* Gallery Preview - Asymmetric Grid */}
      <section className="py-24 md:py-32 bg-secondary-900 relative overflow-hidden">
        <div className="absolute inset-0 diamond-plate opacity-10" />

        <div className="container-custom relative">
          <FadeInUp className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="text-primary-400 font-semibold tracking-[0.2em] uppercase text-sm">Our Work</span>
              <h2 className="section-heading mt-4">Project Gallery</h2>
            </div>
            <Link href="/gallery" className="btn-outline">
              View Full Gallery
            </Link>
          </FadeInUp>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
            {/* Large Image */}
            <FadeInUp className="col-span-2 row-span-2">
              <div className="group relative aspect-square overflow-hidden border border-secondary-800 hover:border-primary-500/50 transition-all duration-500"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}>
                <Image
                  src={galleryImages[0].src}
                  alt={galleryImages[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-display text-2xl uppercase tracking-wide text-white">{galleryImages[0].title}</p>
                </div>
              </div>
            </FadeInUp>

            {/* Smaller Images */}
            {galleryImages.slice(1).map((img, index) => (
              <FadeInUp key={index} delay={(index + 1) * 0.1}>
                <div className="group relative aspect-square overflow-hidden border border-secondary-800 hover:border-primary-500/50 transition-all duration-500"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <p className="font-display text-lg uppercase tracking-wide text-white">{img.title}</p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-secondary-950/85" />
        </div>
        <div className="absolute inset-0 industrial-grid opacity-30" />

        {/* Accent elements */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary-500/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-500/10 to-transparent" />

        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInUp>
              <span className="text-primary-400 font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">Get Started</span>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white uppercase tracking-tight mb-8">
                Ready to Build?
              </h2>
              <p className="text-secondary-200 text-xl xl:text-2xl mb-12 leading-relaxed">
                Contact us today for a quote on mold repair, custom fixtures, EOAT, or CNC machining services.
                We respond to most inquiries within 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link href="/contact" className="btn-primary text-lg px-12 py-6">
                  Request a Quote
                </Link>
                <a href="tel:+17152023631" className="btn-outline text-lg px-12 py-6">
                  Call (715) 202-3631
                </a>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </>
  )
}
