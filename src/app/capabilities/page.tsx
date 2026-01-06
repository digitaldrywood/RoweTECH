'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FadeInUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'

const machines = [
  {
    category: 'CNC Milling',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
      </svg>
    ),
    items: [
      { name: 'Vertical Machining Centers', specs: 'Multiple VMCs available' },
      { name: '3-Axis Capability', specs: 'Standard milling operations' },
      { name: 'Multi-Axis Options', specs: 'Complex geometry capability' },
    ],
  },
  {
    category: 'CNC Turning',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
      </svg>
    ),
    items: [
      { name: 'CNC Lathes', specs: 'Precision turning operations' },
      { name: 'Live Tooling', specs: 'Mill-turn capability' },
    ],
  },
  {
    category: 'Surface Finishing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    items: [
      { name: 'Surface Grinding', specs: 'Flat and precision surfaces' },
      { name: 'Polishing', specs: 'Mold and die finishing' },
    ],
  },
  {
    category: 'EDM',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    items: [
      { name: 'Wire EDM', specs: 'Precision wire cutting' },
      { name: 'Sinker EDM', specs: 'Complex cavity machining' },
    ],
  },
]

const materials = [
  {
    category: 'Tool Steels',
    items: ['P20', 'H13', 'S7', 'A2', 'D2', 'O1', '420 SS'],
  },
  {
    category: 'Stainless Steels',
    items: ['303', '304', '316', '17-4 PH'],
  },
  {
    category: 'Aluminum',
    items: ['6061-T6', '7075-T6', '2024', 'MIC-6'],
  },
  {
    category: 'Other Metals',
    items: ['Brass', 'Bronze', 'Copper', 'Mild Steel'],
  },
  {
    category: 'Plastics',
    items: ['Delrin/Acetal', 'UHMW', 'Nylon', 'PEEK', 'Acrylic'],
  },
]

const fileFormats = [
  'STEP (.stp, .step)',
  'IGES (.igs, .iges)',
  'SolidWorks (.sldprt, .sldasm)',
  'Parasolid (.x_t)',
  'DXF / DWG',
  'PDF drawings',
]

const toleranceSpecs = [
  { label: 'Standard Tolerances', value: '±0.005"', description: 'Unless otherwise specified' },
  { label: 'Precision Work', value: '±0.001"', description: 'Achievable on critical features' },
  { label: 'Surface Finish', value: 'Various', description: 'Based on requirements' },
]

export default function CapabilitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80"
            alt="CNC Machine"
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
              Technical Specs
            </span>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-white uppercase mb-6">
              Our
              <br />
              <span className="text-primary-500">Capabilities</span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-xl lg:text-2xl text-secondary-300 max-w-2xl leading-relaxed">
              Modern equipment, skilled programming, and experience across a wide range of
              materials and applications.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Equipment Overview */}
      <section className="py-24 lg:py-32 bg-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-10" />

        <div className="container-custom relative">
          <FadeInUp className="text-center mb-16">
            <span className="inline-flex items-center justify-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-4">
              <span className="w-8 h-px bg-primary-500 mr-3" />
              Equipment
              <span className="w-8 h-px bg-primary-500 ml-3" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white uppercase">
              Equipment & Machines
            </h2>
            <p className="text-secondary-400 text-lg mt-4 max-w-2xl mx-auto">
              Our shop is equipped to handle a variety of precision machining operations.
            </p>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {machines.map((category, index) => (
              <StaggerItem key={index}>
                <div className="card-industrial h-full">
                  <div className="bg-primary-500 px-6 py-4 flex items-center gap-3">
                    <div className="text-white">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-display text-white uppercase">{category.category}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {category.items.map((item, i) => (
                        <li key={i} className="border-l-2 border-secondary-700 pl-4 hover:border-primary-500 transition-colors">
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-sm text-secondary-400">{item.specs}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInUp className="mt-12">
            <div className="p-6 bg-secondary-900/50 border border-secondary-800 text-center"
                 style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
              <p className="text-secondary-400">
                <strong className="text-secondary-300">Note:</strong> Specific machine models and travel specifications available
                upon request. Contact us with your project requirements for detailed capability
                matching.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Materials */}
      <section className="py-24 lg:py-32 bg-secondary-900 relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-primary-500/20" />
        <div className="absolute bottom-0 right-0 w-48 h-48 border-r-2 border-b-2 border-primary-500/20" />

        <div className="container-custom relative">
          <FadeInUp className="text-center mb-16">
            <span className="inline-flex items-center justify-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-4">
              <span className="w-8 h-px bg-primary-500 mr-3" />
              Materials
              <span className="w-8 h-px bg-primary-500 ml-3" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white uppercase">
              Materials We Work With
            </h2>
            <p className="text-secondary-400 text-lg mt-4 max-w-2xl mx-auto">
              Experience machining a wide range of metals and plastics for various applications.
            </p>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {materials.map((category, index) => (
              <StaggerItem key={index}>
                <div className="bg-secondary-950 border border-secondary-800 p-6 h-full"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                  <h3 className="font-display text-white uppercase text-sm tracking-wider mb-4 pb-3 border-b border-secondary-800">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center space-x-2 text-secondary-400">
                        <div className="w-1.5 h-1.5 bg-primary-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInUp delay={0.3} className="mt-10 text-center">
            <p className="text-secondary-400">
              Don&apos;t see your material listed?{' '}
              <Link href="/contact" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                Contact us
              </Link>{' '}
              to discuss your specific requirements.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Tolerances & Quality */}
      <section className="py-24 lg:py-32 bg-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-10" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <SlideInLeft>
              <span className="inline-flex items-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-4">
                <span className="w-8 h-px bg-primary-500 mr-3" />
                Quality
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white uppercase mb-6">
                Precision & Quality
              </h2>
              <p className="text-secondary-400 text-lg mb-8">
                We understand that precision matters in tooling and production parts. Our
                equipment and processes are set up to achieve tight tolerances while maintaining
                efficient production.
              </p>
              <div className="space-y-4">
                {toleranceSpecs.map((spec, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-secondary-900/50 border border-secondary-800"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                    <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-400 flex-shrink-0"
                         style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-semibold text-white">{spec.label}</h3>
                        <span className="text-primary-400 font-display text-lg">{spec.value}</span>
                      </div>
                      <p className="text-secondary-400 text-sm">{spec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SlideInLeft>

            <SlideInRight>
              <div className="bg-secondary-900 border border-secondary-800 p-8"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}>
                <h3 className="font-display text-2xl text-white uppercase mb-6 flex items-center">
                  <span className="w-8 h-px bg-primary-500 mr-3" />
                  File Formats Accepted
                </h3>
                <p className="text-secondary-400 mb-6">
                  We can work with most common CAD file formats. Send us what you have and we&apos;ll
                  make it work.
                </p>
                <ul className="grid grid-cols-2 gap-3">
                  {fileFormats.map((format, index) => (
                    <li key={index} className="flex items-center space-x-2 p-3 bg-secondary-950 border border-secondary-800"
                        style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                      <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-secondary-300">{format}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Part Size */}
      <section className="py-24 lg:py-32 bg-secondary-900 relative overflow-hidden">
        <div className="container-custom relative">
          <FadeInUp className="text-center mb-16">
            <span className="inline-flex items-center justify-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-4">
              <span className="w-8 h-px bg-primary-500 mr-3" />
              Capacity
              <span className="w-8 h-px bg-primary-500 ml-3" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white uppercase">
              Part Sizes
            </h2>
            <p className="text-secondary-400 text-lg mt-4 max-w-2xl mx-auto">
              We handle parts ranging from small precision components to larger tooling and
              fixtures.
            </p>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <StaggerItem>
              <div className="bg-secondary-950 border border-secondary-800 p-8 text-center h-full"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                <div className="w-20 h-20 bg-primary-500/10 border border-primary-500/30 flex items-center justify-center mx-auto mb-6"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                  <svg className="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-white uppercase mb-2">Small Parts</h3>
                <p className="text-secondary-400 text-sm">Precision components and inserts</p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-secondary-950 border border-secondary-800 p-8 text-center h-full"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                <div className="w-20 h-20 bg-primary-500/10 border border-primary-500/30 flex items-center justify-center mx-auto mb-6"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                  <svg className="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-white uppercase mb-2">Medium Parts</h3>
                <p className="text-secondary-400 text-sm">Fixtures and EOAT assemblies</p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-secondary-950 border border-secondary-800 p-8 text-center h-full"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                <div className="w-20 h-20 bg-primary-500/10 border border-primary-500/30 flex items-center justify-center mx-auto mb-6"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                  <svg className="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-white uppercase mb-2">Large Parts</h3>
                <p className="text-secondary-400 text-sm">Mold components and tooling bases</p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <FadeInUp delay={0.3} className="mt-10 text-center">
            <p className="text-secondary-400">
              Contact us with your specific part dimensions for capability confirmation.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-500" />
        <div className="absolute inset-0 industrial-grid opacity-20" />

        <div className="container-custom relative text-center">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white uppercase mb-6">
              Have Questions About Our Capabilities?
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
              Every project is unique. Contact us to discuss your specific requirements and we&apos;ll
              let you know how we can help.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-secondary-100">
                Request a Quote
              </Link>
              <a href="tel:+17152023631" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Call (715) 202-3631
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}
