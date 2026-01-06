'use client'

import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import { FadeInUp, SlideInLeft, SlideInRight } from '@/components/AnimatedSection'

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80"
            alt="Manufacturing"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-950 via-secondary-950/95 to-secondary-950/80" />
        </div>

        {/* Industrial grid overlay */}
        <div className="absolute inset-0 industrial-grid opacity-20" />

        <div className="container-custom relative py-32 lg:py-40">
          <FadeInUp>
            <span className="inline-flex items-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-6">
              <span className="w-12 h-px bg-primary-500 mr-4" />
              Get In Touch
            </span>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-white uppercase mb-6">
              Contact Us
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-xl lg:text-2xl xl:text-3xl text-secondary-300 max-w-2xl xl:max-w-3xl leading-relaxed">
              Ready to start your project? Get in touch for a quote or to discuss your machining
              and tooling needs.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 lg:py-32 bg-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-10" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 xl:gap-20">
            {/* Contact Form */}
            <SlideInLeft className="lg:col-span-2">
              <div className="bg-secondary-900 border border-secondary-800 p-8 lg:p-10"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}>
                <h2 className="font-display text-2xl lg:text-3xl text-white uppercase mb-2">Request a Quote</h2>
                <p className="text-secondary-400 mb-8">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
                <ContactForm />
              </div>
            </SlideInLeft>

            {/* Contact Information */}
            <SlideInRight className="space-y-6">
              {/* Direct Contact */}
              <div className="bg-secondary-900 border border-secondary-800 p-6"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                <h3 className="font-display text-lg text-white uppercase mb-6 flex items-center">
                  <span className="w-8 h-px bg-primary-500 mr-3" />
                  Direct Contact
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="tel:+17152023631"
                      className="flex items-start space-x-4 group"
                    >
                      <div className="w-12 h-12 bg-secondary-800 border border-secondary-700 flex items-center justify-center text-primary-500 flex-shrink-0 group-hover:border-primary-500/50 transition-colors"
                           style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-white">Phone</p>
                        <p className="text-secondary-400 group-hover:text-primary-400 transition-colors">(715) 202-3631</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary-800 border border-secondary-700 flex items-center justify-center text-primary-500 flex-shrink-0"
                         style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <p className="text-sm text-secondary-500">Contact form preferred</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Location */}
              <div className="bg-secondary-900 border border-secondary-800 p-6"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                <h3 className="font-display text-lg text-white uppercase mb-6 flex items-center">
                  <span className="w-8 h-px bg-primary-500 mr-3" />
                  Location
                </h3>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-secondary-800 border border-secondary-700 flex items-center justify-center text-primary-500 flex-shrink-0"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Address</p>
                    <p className="text-secondary-400">549 Lavorata Rd</p>
                    <p className="text-secondary-400">Cadott, WI 54727</p>
                  </div>
                </div>
                {/* Map */}
                <div className="aspect-video bg-secondary-800 overflow-hidden border border-secondary-700"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                  <iframe
                    src="https://maps.google.com/maps?q=549+Lavorata+Rd,+Cadott,+WI+54727&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RoweTech Location Map"
                  ></iframe>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-secondary-900 border border-secondary-800 p-6"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                <h3 className="font-display text-lg text-white uppercase mb-6 flex items-center">
                  <span className="w-8 h-px bg-primary-500 mr-3" />
                  Business Hours
                </h3>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-800 border border-secondary-700 flex items-center justify-center text-primary-500 flex-shrink-0"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Monday - Friday</span>
                        <span className="font-medium text-white">7:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Saturday</span>
                        <span className="font-medium text-secondary-500">Closed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-400">Sunday</span>
                        <span className="font-medium text-secondary-500">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response */}
              <div className="bg-primary-500/10 border border-primary-500/30 p-6"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
                <div className="flex items-center space-x-3 mb-3">
                  <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  <h3 className="font-semibold text-primary-400">Quick Response</h3>
                </div>
                <p className="text-secondary-300 text-sm">
                  We typically respond to quote requests within 1-2 business days. For urgent needs,
                  please call us directly.
                </p>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>
    </>
  )
}
