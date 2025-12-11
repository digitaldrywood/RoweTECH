import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact RoweTech Machine & Engineering for quotes on mold repair, custom fixtures, EOAT, and CNC machining services.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-secondary-300">
              Ready to start your project? Get in touch for a quote or to discuss your machining
              and tooling needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-2">Request a Quote</h2>
                <p className="text-secondary-600 mb-6">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Direct Contact</h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="tel:+17152023631"
                      className="flex items-start space-x-3 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">Phone</p>
                        <p>(715) 202-3631</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start space-x-3 text-secondary-600">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">Email</p>
                      <p className="text-sm text-secondary-500">Contact form preferred</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Location</h3>
                <div className="flex items-start space-x-3 text-secondary-600">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Address</p>
                    <p>549 Lavorata Rd</p>
                    <p>Cadott, WI 54727</p>
                  </div>
                </div>
                {/* Map Placeholder */}
                <div className="mt-4 aspect-video bg-secondary-100 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2850.8!2d-91.15!3d44.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDU3JzAwLjAiTiA5McKwMDknMDAuMCJX!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RoweTech Location Map"
                  ></iframe>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Business Hours</h3>
                <div className="flex items-start space-x-3 text-secondary-600">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-medium text-secondary-900">7:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-medium text-secondary-900">Closed</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium text-secondary-900">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response */}
              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                <div className="flex items-center space-x-3 mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  <h3 className="font-semibold text-primary-900">Quick Response</h3>
                </div>
                <p className="text-primary-700 text-sm">
                  We typically respond to quote requests within 1-2 business days. For urgent needs,
                  please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
