import Link from 'next/link'

const services = [
  {
    title: 'Plastic Injection Mold Repair',
    description: 'Expert repair and maintenance of plastic injection molds to keep your production running smoothly.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Custom Fixtures & EOAT',
    description: 'Precision-engineered workholding fixtures and end-of-arm tooling for automation systems.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: 'CNC Machining Services',
    description: 'High-precision CNC milling and turning for prototypes and production runs.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Fast Turnaround & Local Support',
    description: 'Wisconsin-based shop offering quick lead times and responsive customer service.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const benefits = [
  {
    title: 'Local Wisconsin Shop',
    description: 'Quick lead times and easy communication with a shop right here in the Midwest.',
  },
  {
    title: 'Experienced Team',
    description: 'Deep expertise in plastic injection tooling and precision machining.',
  },
  {
    title: 'Capable CNC Operations',
    description: 'Modern equipment and skilled programming for complex geometries.',
  },
  {
    title: 'Flexible & Responsive',
    description: 'From prototypes to production runs, we adapt to your needs.',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
        <div className="container-custom relative py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Precision Machining & Mold Repair in{' '}
                <span className="text-primary-400">Cadott, Wisconsin</span>
              </h1>
              <p className="text-lg md:text-xl text-secondary-300 mb-8 max-w-xl">
                RoweTech Machine & Engineering provides plastic injection mold repair, custom
                fixtures, EOAT tooling, and CNC machining for manufacturers across Wisconsin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  Request a Quote
                </Link>
                <a
                  href="tel:+17152023631"
                  className="btn-outline border-white text-white hover:bg-white hover:text-secondary-900 text-lg px-8 py-4"
                >
                  Call (715) 202-3631
                </a>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-primary-600/20 rounded-full absolute -top-10 -right-10"></div>
                <div className="w-96 h-96 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-2xl flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-white/90 text-xl font-semibold">Precision Engineering</p>
                    <p className="text-white/60 text-sm mt-1">Since Est.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards Section */}
      <section className="py-16 lg:py-24 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-heading">What We Do</h2>
            <p className="section-subheading mx-auto">
              Comprehensive machining and tooling solutions for plastic injection molding and
              manufacturing operations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="card group">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-200">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{service.title}</h3>
                <p className="text-secondary-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose RoweTech */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">Why Choose RoweTech?</h2>
              <p className="section-subheading mb-8">
                We combine precision machining expertise with responsive customer service to deliver
                quality tooling solutions on time.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">{benefit.title}</h3>
                      <p className="text-secondary-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-primary mt-8 inline-block">
                Learn More About Us
              </Link>
            </div>
            <div className="bg-secondary-100 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <p className="text-3xl font-bold text-primary-600">WI</p>
                  <p className="text-sm text-secondary-600 mt-1">Based in Wisconsin</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <p className="text-3xl font-bold text-primary-600">M-F</p>
                  <p className="text-sm text-secondary-600 mt-1">7AM - 5PM</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <p className="text-3xl font-bold text-primary-600">CNC</p>
                  <p className="text-sm text-secondary-600 mt-1">Precision Machining</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <p className="text-3xl font-bold text-primary-600">24/7</p>
                  <p className="text-sm text-secondary-600 mt-1">Quote Requests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16 lg:py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a quote on mold repair, custom fixtures, EOAT, or CNC machining
            services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-secondary bg-white text-primary-600 hover:bg-secondary-100"
            >
              Request a Quote
            </Link>
            <a
              href="tel:+17152023631"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              Call (715) 202-3631
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
