import Link from 'next/link'
import Image from 'next/image'
import { FadeInUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'

const services = [
  {
    title: 'Mold Repair',
    description: 'Expert plastic injection mold repair and maintenance to minimize downtime.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    href: '/services#mold-repair',
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
  { name: 'CNC Milling', icon: '⚙️' },
  { name: 'CNC Turning', icon: '🔧' },
  { name: 'Wire EDM', icon: '⚡' },
  { name: 'Surface Grinding', icon: '✨' },
  { name: 'Mold Repair', icon: '🔩' },
  { name: 'EOAT Design', icon: '🤖' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80', title: 'CNC Milling' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Laser Cutting' },
  { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', title: 'Welding' },
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
                  <div className="font-display text-3xl md:text-4xl text-primary-500 uppercase">{stat.value}</div>
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

      {/* Services Section */}
      <section className="section-darker py-24 md:py-32">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="text-primary-400 font-semibold tracking-[0.2em] uppercase text-sm">What We Do</span>
              <h2 className="section-heading mt-4">Our Services</h2>
              <p className="section-subheading mx-auto mt-4">
                Comprehensive machining and tooling solutions for plastic injection molding and manufacturing.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 2xl:gap-10">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <Link href={service.href} className="group block h-full">
                  <div className="service-card h-full">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="service-card-image"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary-500/90 text-white text-xs font-bold uppercase tracking-wider">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    <div className="service-card-content">
                      <h3 className="font-display text-xl uppercase tracking-wide text-white mb-3 group-hover:text-primary-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-secondary-400 text-sm leading-relaxed">{service.description}</p>
                      <div className="mt-4 flex items-center text-primary-400 text-sm font-semibold uppercase tracking-wider">
                        Learn More
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInUp className="text-center mt-12">
            <Link href="/services" className="btn-outline">
              View All Services
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 bg-secondary-950 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 industrial-grid opacity-20" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 2xl:gap-24 items-center">
            <SlideInLeft>
              <div>
                <span className="text-primary-400 font-semibold tracking-[0.2em] uppercase text-sm">Why Choose Us</span>
                <h2 className="section-heading mt-4">Precision You Can Trust</h2>
                <p className="section-subheading mt-4 mb-10">
                  Combining precision machining expertise with responsive service to deliver quality tooling solutions on time.
                </p>

                <div className="space-y-6">
                  {[
                    { title: 'Local Wisconsin Shop', desc: 'Quick lead times and easy communication.' },
                    { title: 'Experienced Team', desc: 'Deep expertise in plastic injection tooling.' },
                    { title: 'Modern Equipment', desc: 'State-of-the-art CNC machinery.' },
                    { title: 'Flexible & Responsive', desc: 'Prototypes to production runs.' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/30 flex items-center justify-center flex-shrink-0"
                           style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                        <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display text-lg uppercase tracking-wide text-white">{item.title}</h3>
                        <p className="text-secondary-400 text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/about" className="btn-primary mt-10 inline-flex">
                  Learn More About Us
                </Link>
              </div>
            </SlideInLeft>

            <SlideInRight>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary-500/20 blur-3xl" />
                <div className="relative overflow-hidden border border-secondary-800"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 40px 100%, 0 calc(100% - 40px))' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                    alt="CNC Machining"
                    width={600}
                    height={500}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-secondary-900/90 backdrop-blur-sm border border-secondary-800 p-4"
                         style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                      <p className="font-display text-lg uppercase tracking-wide text-white">Precision CNC Machining</p>
                      <p className="text-secondary-400 text-sm">Cadott, Wisconsin</p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section-darker py-24 md:py-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 2xl:gap-24 items-center">
            <FadeInUp className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary-500/10 blur-3xl" />
                <div className="relative overflow-hidden border border-secondary-800"
                     style={{ clipPath: 'polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
                    alt="Manufacturing capabilities"
                    width={600}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2} className="order-1 lg:order-2">
              <span className="text-primary-400 font-semibold tracking-[0.2em] uppercase text-sm">Our Capabilities</span>
              <h2 className="section-heading mt-4">Advanced Manufacturing</h2>
              <p className="section-subheading mt-4 mb-10">
                Equipped with modern CNC machinery to handle your most demanding projects.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {capabilities.map((cap, index) => (
                  <div key={index} className="stat-card flex items-center space-x-4">
                    <span className="text-2xl">{cap.icon}</span>
                    <span className="text-white font-medium">{cap.name}</span>
                  </div>
                ))}
              </div>

              <Link href="/capabilities" className="btn-outline">
                View Full Capabilities
              </Link>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 md:py-32 bg-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 diamond-plate opacity-20" />

        <div className="container-custom relative">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="text-primary-400 font-semibold tracking-[0.2em] uppercase text-sm">Our Work</span>
              <h2 className="section-heading mt-4">Project Gallery</h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 xl:gap-8 2xl:gap-10">
            {galleryImages.map((img, index) => (
              <StaggerItem key={index}>
                <div className="group relative aspect-[4/3] overflow-hidden border border-secondary-800 hover:border-primary-500/50 transition-all duration-500"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}>
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="font-display text-lg uppercase tracking-wide text-white">{img.title}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInUp className="text-center mt-12">
            <Link href="/gallery" className="btn-outline">
              View Full Gallery
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-secondary-950/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent" />
        </div>
        <div className="absolute inset-0 caution-stripes opacity-30" />

        <div className="container-custom relative text-center">
          <FadeInUp>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white uppercase tracking-wide mb-6">
              Ready to Start?
            </h2>
            <p className="text-secondary-300 text-xl xl:text-2xl max-w-2xl xl:max-w-3xl mx-auto mb-10">
              Contact us today for a quote on mold repair, custom fixtures, EOAT, or CNC machining services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg">
                Request a Quote
              </Link>
              <a href="tel:+17152023631" className="btn-outline text-lg">
                Call (715) 202-3631
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}
