import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'View examples of our work including custom fixtures, mold repairs, EOAT assemblies, and precision machined parts.',
}

// Placeholder gallery items - replace with actual images when available
const galleryItems = [
  {
    id: 1,
    title: 'Custom Workholding Fixture',
    category: 'Fixtures',
    description: 'Precision fixture for plastic injection part inspection',
  },
  {
    id: 2,
    title: 'EOAT Gripper Assembly',
    category: 'EOAT',
    description: 'Custom end-of-arm tooling for automated part handling',
  },
  {
    id: 3,
    title: 'Mold Insert Repair',
    category: 'Mold Repair',
    description: 'Weld repair and re-machining of worn mold insert',
  },
  {
    id: 4,
    title: 'CNC Machined Components',
    category: 'CNC Parts',
    description: 'Precision aluminum components for automation equipment',
  },
  {
    id: 5,
    title: 'Inspection Fixture',
    category: 'Fixtures',
    description: 'Go/no-go gauge fixture for quality control',
  },
  {
    id: 6,
    title: 'Vacuum Pickup Plate',
    category: 'EOAT',
    description: 'Custom vacuum plate for robotic part transfer',
  },
  {
    id: 7,
    title: 'Tool Steel Components',
    category: 'CNC Parts',
    description: 'Heat treated tool steel machining',
  },
  {
    id: 8,
    title: 'Assembly Fixture',
    category: 'Fixtures',
    description: 'Custom jig for production assembly operations',
  },
]

const categories = ['All', 'Fixtures', 'EOAT', 'Mold Repair', 'CNC Parts']

export default function GalleryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Work</h1>
            <p className="text-xl text-secondary-300">
              Examples of fixtures, tooling, mold repairs, and precision parts we&apos;ve produced
              for our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-secondary-200">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  category === 'All'
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm border border-secondary-100 hover:shadow-lg transition-shadow duration-200"
              >
                {/* Placeholder for image */}
                <div className="aspect-square bg-secondary-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <svg
                        className="w-16 h-16 text-secondary-400 mx-auto mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      <p className="text-secondary-500 text-sm">Photo Coming Soon</p>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-secondary-900 mb-1">{item.title}</h3>
                  <p className="text-secondary-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Note about photos */}
          <div className="mt-12 bg-secondary-50 rounded-xl p-6 lg:p-8 text-center">
            <svg
              className="w-12 h-12 text-secondary-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              More Photos Coming Soon
            </h3>
            <p className="text-secondary-600 max-w-xl mx-auto">
              We&apos;re building out our gallery with examples of our work. Check back soon to see
              more fixtures, mold repairs, EOAT assemblies, and precision machined parts.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Let us put our capabilities to work for you. Contact us today to discuss your tooling or
            machining needs.
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
