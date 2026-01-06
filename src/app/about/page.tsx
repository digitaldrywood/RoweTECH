'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FadeInUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'

const values = [
  {
    title: 'Quality Workmanship',
    description: 'Every part we produce meets exacting standards. We take pride in precision.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: 'Honest Communication',
    description: 'Clear timelines, upfront pricing, and no surprises. We keep you informed.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: 'Customer Focus',
    description: 'Your success is our success. We work as an extension of your team.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Continuous Improvement',
    description: 'We invest in our capabilities to better serve your evolving needs.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
]

const industries = [
  {
    title: 'Plastic Injection Molding',
    description: 'Mold repair and maintenance for injection molding operations.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
  },
  {
    title: 'Automation & Robotics',
    description: 'Custom EOAT and fixtures for automated production lines.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  },
  {
    title: 'OEM Manufacturing',
    description: 'Precision parts and tooling for original equipment manufacturers.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
  },
  {
    title: 'Local Manufacturers',
    description: 'Quick-turn machining services for Wisconsin businesses.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
  },
]

const timeline = [
  { year: 'Foundation', title: 'Built on Experience', description: 'Founded with decades of combined machining expertise' },
  { year: 'Growth', title: 'Expanding Capabilities', description: 'Continuous investment in modern CNC equipment' },
  { year: 'Today', title: 'Trusted Partner', description: 'Serving manufacturers across Wisconsin and the Midwest' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
            alt="Machine shop"
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
              About Us
            </span>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-white uppercase mb-6">
              Precision Engineering
              <br />
              <span className="text-primary-500">Wisconsin Roots</span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-xl lg:text-2xl xl:text-3xl text-secondary-300 max-w-2xl xl:max-w-3xl leading-relaxed">
              A Wisconsin-based machine shop dedicated to quality, precision, and customer success.
              We bring decades of combined experience to every project.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 lg:py-32 bg-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-10" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 items-center">
            <SlideInLeft>
              <span className="inline-flex items-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-4">
                <span className="w-8 h-px bg-primary-500 mr-3" />
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white uppercase mb-8">
                Built on Expertise
              </h2>
              <div className="space-y-6 text-secondary-400 leading-relaxed">
                <p className="text-lg">
                  RoweTech Machine & Engineering was founded with a simple mission: provide
                  manufacturers with reliable, high-quality machining and tooling services they can
                  count on.
                </p>
                <p>
                  Based in Cadott, Wisconsin, we serve plastic injection molding companies,
                  automation integrators, and OEM manufacturers throughout the Midwest. Our location
                  allows us to offer quick turnaround times and hands-on service that larger, more
                  distant shops simply can&apos;t match.
                </p>
                <p>
                  Whether you need emergency mold repairs, custom fixtures for a new production
                  line, or precision CNC parts, our experienced team is ready to help. We treat
                  every project with the same attention to detail, regardless of size.
                </p>
              </div>
            </SlideInLeft>

            <SlideInRight>
              <div className="relative">
                {/* Timeline */}
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-secondary-900 border border-secondary-800 flex items-center justify-center text-primary-500 font-display text-sm uppercase tracking-wider"
                             style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                          {index + 1}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="w-px h-full bg-gradient-to-b from-primary-500/50 to-transparent mt-2" />
                        )}
                      </div>
                      <div className="pb-8">
                        <span className="text-primary-400 text-sm uppercase tracking-wider">{item.year}</span>
                        <h3 className="text-white font-semibold text-xl mt-1 mb-2">{item.title}</h3>
                        <p className="text-secondary-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 lg:py-32 bg-secondary-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-primary-500/20" />
        <div className="absolute bottom-0 right-0 w-64 h-64 border-r-2 border-b-2 border-primary-500/20" />

        <div className="container-custom relative">
          <FadeInUp className="text-center mb-16">
            <span className="inline-flex items-center justify-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-4">
              <span className="w-8 h-px bg-primary-500 mr-3" />
              Our Values
              <span className="w-8 h-px bg-primary-500 ml-3" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white uppercase">
              What Drives Us
            </h2>
            <p className="text-secondary-400 text-lg mt-4 max-w-2xl mx-auto">
              The principles that guide how we work and serve our customers.
            </p>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 2xl:gap-10">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <div className="card-industrial p-8 h-full group">
                  <div className="w-14 h-14 bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-400 mb-6 group-hover:bg-primary-500/20 transition-colors"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-secondary-400">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 lg:py-32 bg-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-10" />

        <div className="container-custom relative">
          <FadeInUp className="text-center mb-16">
            <span className="inline-flex items-center justify-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-4">
              <span className="w-8 h-px bg-primary-500 mr-3" />
              Industries
              <span className="w-8 h-px bg-primary-500 ml-3" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white uppercase">
              Who We Serve
            </h2>
            <p className="text-secondary-400 text-lg mt-4 max-w-2xl mx-auto">
              We work with manufacturers and molders across various sectors.
            </p>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 2xl:gap-10">
            {industries.map((industry, index) => (
              <StaggerItem key={index}>
                <div className="service-card group h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-primary-400 text-sm uppercase tracking-wider font-medium">
                        Industry
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-secondary-400 text-sm">{industry.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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

        {/* Diagonal accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-primary-500/10" />

        <div className="container-custom relative text-center">
          <FadeInUp>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white uppercase mb-6">
              Let&apos;s Work Together
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-secondary-300 text-lg xl:text-xl mb-10 max-w-2xl xl:max-w-3xl mx-auto">
              Ready to discuss your project? Contact us for a quote or to learn more about our
              capabilities.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Request a Quote
              </Link>
              <Link href="/capabilities" className="btn-outline">
                View Our Capabilities
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}
