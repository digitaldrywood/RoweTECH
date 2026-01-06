'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FadeInUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'

const services = [
  {
    id: 'mold-repair',
    title: 'Plastic Injection Mold Repair',
    description:
      'Keep your production running with expert mold repair and maintenance services. We handle everything from minor repairs to major rebuilds.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    details: [
      'Weld repair and re-machining',
      'Insert replacement and modification',
      'Parting line repair',
      'Gate and runner modifications',
      'Surface polishing and texturing',
      'Preventive maintenance programs',
    ],
    useCases: [
      'Emergency breakdown repairs',
      'Scheduled maintenance shutdowns',
      'Mold modifications for design changes',
      'Wear repair and restoration',
    ],
  },
  {
    id: 'fixtures',
    title: 'Custom Fixtures & Tooling',
    description:
      'Precision-engineered workholding and inspection fixtures designed to improve your manufacturing efficiency and quality.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    details: [
      'Workholding fixtures for machining',
      'Inspection and gauging fixtures',
      'Assembly fixtures and jigs',
      'Welding fixtures',
      'Custom tooling solutions',
      'Fixture modifications and upgrades',
    ],
    useCases: [
      'New product launches',
      'Quality improvement initiatives',
      'Production efficiency upgrades',
      'Process standardization',
    ],
  },
  {
    id: 'eoat',
    title: 'EOAT Manufacturing',
    description:
      'End-of-Arm Tooling designed and built for your specific robotic automation needs. We work with your integrator or directly with your team.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    details: [
      'Custom gripper assemblies',
      'Vacuum pickup plates',
      'Tool changer plates and adapters',
      'Part presence sensors mounting',
      'Lightweight aluminum construction',
      'Integration with existing robot systems',
    ],
    useCases: [
      'New automation cell installations',
      'EOAT replacement and upgrades',
      'Multi-part handling solutions',
      'Custom gripper designs',
    ],
  },
  {
    id: 'cnc',
    title: 'CNC Machining Services',
    description:
      'High-precision CNC milling and turning services for prototypes, short runs, and production quantities.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    details: [
      'CNC milling (3-axis and multi-axis)',
      'CNC turning and lathe work',
      'Surface grinding',
      'EDM services (wire and sinker)',
      'Prototype to production quantities',
      'Various materials: steel, aluminum, plastics',
    ],
    useCases: [
      'Prototype development',
      'Replacement parts',
      'Production machining',
      'One-off specialty parts',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80"
            alt="CNC machining"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-950 via-secondary-950/95 to-secondary-950/80" />
        </div>

        {/* Industrial grid overlay */}
        <div className="absolute inset-0 industrial-grid opacity-20" />

        {/* Diagonal accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-500/10 to-transparent" />

        <div className="container-custom relative py-32 lg:py-40">
          <FadeInUp>
            <span className="inline-flex items-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-6">
              <span className="w-12 h-px bg-primary-500 mr-4" />
              Our Services
            </span>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-white uppercase mb-6">
              Comprehensive
              <br />
              <span className="text-primary-500">Machining Solutions</span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-xl lg:text-2xl text-secondary-300 max-w-2xl leading-relaxed">
              From mold repair to custom fixtures, we provide the precision machining and tooling
              services manufacturers need to stay productive.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 lg:py-32 bg-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-10" />

        <div className="container-custom relative">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24"
              >
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}>
                  {/* Image */}
                  {index % 2 === 0 ? (
                    <SlideInLeft className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="relative">
                        <div className="relative overflow-hidden"
                             style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}>
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={800}
                            height={600}
                            className="w-full h-auto"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/80 via-transparent to-transparent" />
                        </div>
                        {/* Service number badge */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-500 flex items-center justify-center"
                             style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                          <span className="font-display text-4xl text-white">{String(index + 1).padStart(2, '0')}</span>
                        </div>
                      </div>
                    </SlideInLeft>
                  ) : (
                    <SlideInRight className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="relative">
                        <div className="relative overflow-hidden"
                             style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}>
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={800}
                            height={600}
                            className="w-full h-auto"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/80 via-transparent to-transparent" />
                        </div>
                        {/* Service number badge */}
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary-500 flex items-center justify-center"
                             style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                          <span className="font-display text-4xl text-white">{String(index + 1).padStart(2, '0')}</span>
                        </div>
                      </div>
                    </SlideInRight>
                  )}

                  {/* Content */}
                  {index % 2 === 0 ? (
                    <SlideInRight className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                      <ServiceContent service={service} />
                    </SlideInRight>
                  ) : (
                    <SlideInLeft className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                      <ServiceContent service={service} />
                    </SlideInLeft>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't See What You Need */}
      <section className="py-24 lg:py-32 bg-secondary-900 relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-primary-500/20" />
        <div className="absolute bottom-0 right-0 w-48 h-48 border-r-2 border-b-2 border-primary-500/20" />

        <div className="container-custom relative">
          <FadeInUp className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center justify-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-4">
              <span className="w-8 h-px bg-primary-500 mr-3" />
              Custom Projects
              <span className="w-8 h-px bg-primary-500 ml-3" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white uppercase mb-6">
              Don&apos;t See What You Need?
            </h2>
            <p className="text-secondary-400 text-lg mb-10">
              We handle a wide variety of machining and tooling projects. If you have a unique
              requirement, reach out and let&apos;s discuss how we can help.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us to Discuss Your Project
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
            alt="Manufacturing background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-secondary-950/90" />
        </div>
        <div className="absolute inset-0 industrial-grid opacity-20" />

        <div className="container-custom relative text-center">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white uppercase mb-6">
              Ready to Get Started?
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-secondary-300 text-lg mb-10 max-w-2xl mx-auto">
              Contact us today for a quote. We&apos;ll review your requirements and get back to you
              promptly.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Request a Quote
              </Link>
              <a href="tel:+17152023631" className="btn-outline">
                Call (715) 202-3631
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}

function ServiceContent({ service }: { service: typeof services[0] }) {
  return (
    <div>
      <span className="inline-flex items-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-4">
        <span className="w-8 h-px bg-primary-500 mr-3" />
        {service.id.replace('-', ' ')}
      </span>
      <h2 className="font-display text-3xl md:text-4xl text-white uppercase mb-4">
        {service.title}
      </h2>
      <p className="text-lg text-secondary-400 mb-8">{service.description}</p>

      <div className="mb-8">
        <h3 className="font-semibold text-white mb-4 flex items-center">
          <span className="w-8 h-px bg-primary-500 mr-3" />
          What We Offer
        </h3>
        <StaggerContainer className="grid sm:grid-cols-2 gap-3">
          {service.details.map((detail, i) => (
            <StaggerItem key={i}>
              <div className="flex items-center space-x-3 p-3 bg-secondary-900/50 border border-secondary-800"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                <div className="w-2 h-2 bg-primary-500 flex-shrink-0" />
                <span className="text-secondary-300 text-sm">{detail}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <div className="p-6 bg-secondary-900 border border-secondary-800"
           style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
        <h3 className="font-semibold text-white mb-4">Common Use Cases</h3>
        <ul className="space-y-3">
          {service.useCases.map((useCase, i) => (
            <li key={i} className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-secondary-300">{useCase}</span>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="btn-primary mt-6 w-full sm:w-auto">
          Get a Quote
        </Link>
      </div>
    </div>
  )
}
