import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'RoweTech offers plastic injection mold repair, custom fixtures, EOAT manufacturing, and CNC machining services for manufacturers.',
}

const services = [
  {
    id: 'mold-repair',
    title: 'Plastic Injection Mold Repair',
    description:
      'Keep your production running with expert mold repair and maintenance services. We handle everything from minor repairs to major rebuilds.',
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
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: 'fixtures',
    title: 'Custom Fixtures & Tooling',
    description:
      'Precision-engineered workholding and inspection fixtures designed to improve your manufacturing efficiency and quality.',
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
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    id: 'eoat',
    title: 'EOAT Manufacturing',
    description:
      'End-of-Arm Tooling designed and built for your specific robotic automation needs. We work with your integrator or directly with your team.',
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
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    id: 'cnc',
    title: 'CNC Machining Services',
    description:
      'High-precision CNC milling and turning services for prototypes, short runs, and production quantities.',
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
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-secondary-300">
              Comprehensive machining and tooling solutions for plastic injection molding and
              manufacturing operations.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg text-secondary-600 mb-6">{service.description}</p>

                  <div className="mb-6">
                    <h3 className="font-semibold text-secondary-900 mb-3">What We Offer:</h3>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <svg
                            className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-secondary-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className={`bg-secondary-50 rounded-2xl p-6 lg:p-8 ${
                    index % 2 === 1 ? 'lg:col-start-1' : ''
                  }`}
                >
                  <h3 className="font-semibold text-secondary-900 mb-4">Common Use Cases:</h3>
                  <ul className="space-y-3">
                    {service.useCases.map((useCase, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                        <span className="text-secondary-700">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="btn-primary mt-6 inline-block text-center w-full sm:w-auto"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't See What You Need */}
      <section className="py-16 lg:py-20 bg-secondary-50">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
            Don&apos;t See What You Need?
          </h2>
          <p className="text-secondary-600 text-lg mb-8 max-w-2xl mx-auto">
            We handle a wide variety of machining and tooling projects. If you have a unique
            requirement, reach out and let&apos;s discuss how we can help.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us to Discuss Your Project
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a quote. We&apos;ll review your requirements and get back to you
            promptly.
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
