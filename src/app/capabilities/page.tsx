import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'Explore RoweTech\'s machining capabilities including CNC milling, turning, EDM, and our material expertise.',
}

const machines = [
  {
    category: 'CNC Milling',
    items: [
      { name: 'Vertical Machining Centers', specs: 'Multiple VMCs available' },
      { name: '3-Axis Capability', specs: 'Standard milling operations' },
      { name: 'Multi-Axis Options', specs: 'Complex geometry capability' },
    ],
  },
  {
    category: 'CNC Turning',
    items: [
      { name: 'CNC Lathes', specs: 'Precision turning operations' },
      { name: 'Live Tooling', specs: 'Mill-turn capability' },
    ],
  },
  {
    category: 'Surface Finishing',
    items: [
      { name: 'Surface Grinding', specs: 'Flat and precision surfaces' },
      { name: 'Polishing', specs: 'Mold and die finishing' },
    ],
  },
  {
    category: 'EDM',
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

export default function CapabilitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Capabilities</h1>
            <p className="text-xl text-secondary-300">
              Modern equipment, skilled programming, and experience across a wide range of
              materials and applications.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Overview */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-heading">Equipment & Machines</h2>
            <p className="section-subheading mx-auto">
              Our shop is equipped to handle a variety of precision machining operations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {machines.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-secondary-100 overflow-hidden">
                <div className="bg-primary-600 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {category.items.map((item, i) => (
                      <li key={i}>
                        <p className="font-medium text-secondary-900">{item.name}</p>
                        <p className="text-sm text-secondary-500">{item.specs}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-secondary-50 rounded-xl">
            <p className="text-secondary-600 text-center">
              <strong>Note:</strong> Specific machine models and travel specifications available
              upon request. Contact us with your project requirements for detailed capability
              matching.
            </p>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16 lg:py-24 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-heading">Materials We Work With</h2>
            <p className="section-subheading mx-auto">
              Experience machining a wide range of metals and plastics for various applications.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {materials.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-secondary-900 mb-4 pb-2 border-b border-secondary-200">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 text-secondary-600">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-secondary-600">
              Don&apos;t see your material listed?{' '}
              <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                Contact us
              </Link>{' '}
              to discuss your specific requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Tolerances & Quality */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">Precision & Quality</h2>
              <p className="text-secondary-600 mb-6">
                We understand that precision matters in tooling and production parts. Our
                equipment and processes are set up to achieve tight tolerances while maintaining
                efficient production.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Standard Tolerances</h3>
                    <p className="text-secondary-600">±0.005&quot; unless otherwise specified</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Precision Work</h3>
                    <p className="text-secondary-600">±0.001&quot; achievable on critical features</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Surface Finish</h3>
                    <p className="text-secondary-600">Various finishes available based on requirements</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-secondary-900 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">File Formats Accepted</h3>
              <p className="text-secondary-300 mb-6">
                We can work with most common CAD file formats. Send us what you have and we&apos;ll
                make it work.
              </p>
              <ul className="grid grid-cols-2 gap-3">
                {fileFormats.map((format, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{format}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Part Size */}
      <section className="py-16 lg:py-20 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-heading">Part Sizes</h2>
            <p className="section-subheading mx-auto">
              We handle parts ranging from small precision components to larger tooling and
              fixtures.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Small Parts</h3>
              <p className="text-secondary-600 text-sm">Precision components and inserts</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Medium Parts</h3>
              <p className="text-secondary-600 text-sm">Fixtures and EOAT assemblies</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Large Parts</h3>
              <p className="text-secondary-600 text-sm">Mold components and tooling bases</p>
            </div>
          </div>
          <p className="text-center text-secondary-600 mt-8">
            Contact us with your specific part dimensions for capability confirmation.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have Questions About Our Capabilities?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Every project is unique. Contact us to discuss your specific requirements and we&apos;ll
            let you know how we can help.
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
