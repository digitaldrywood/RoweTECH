'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'

const galleryItems = [
  {
    id: 1,
    title: 'CNC Milling Operation',
    category: 'CNC Machining',
    description: 'Precision 5-axis CNC milling for complex geometries',
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
  },
  {
    id: 2,
    title: 'Laser Cutting',
    category: 'Laser',
    description: 'High-precision laser cutting and engraving',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 3,
    title: 'Welding & Fabrication',
    category: 'Welding',
    description: 'Professional TIG and MIG welding services',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  },
  {
    id: 4,
    title: '3D Printing',
    category: '3D Printing',
    description: 'Rapid prototyping with industrial FDM and SLA',
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80',
  },
  {
    id: 5,
    title: 'CNC Lathe Work',
    category: 'CNC Machining',
    description: 'Precision turning for cylindrical components',
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
  },
  {
    id: 6,
    title: 'Plasma Cutting',
    category: 'Plasma',
    description: 'Heavy-duty plasma cutting for thick materials',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  },
  {
    id: 7,
    title: 'Metal Fabrication',
    category: 'Welding',
    description: 'Custom metal fabrication and assembly',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  },
  {
    id: 8,
    title: 'Industrial Automation',
    category: 'EOAT',
    description: 'End-of-arm tooling for robotics',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  },
  {
    id: 9,
    title: 'Precision Grinding',
    category: 'CNC Machining',
    description: 'Surface grinding to tight tolerances',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
  },
  {
    id: 10,
    title: 'Mold Components',
    category: 'Mold Repair',
    description: 'Precision mold inserts and components',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
  },
  {
    id: 11,
    title: 'Laser Engraving',
    category: 'Laser',
    description: 'Detailed marking and engraving services',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 12,
    title: 'Prototyping',
    category: '3D Printing',
    description: 'Fast turnaround prototype development',
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80',
  },
]

const featuredImages = [
  {
    title: 'Metal Grinding in Action',
    description: 'Precision metalwork with sparks flying',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
  },
  {
    title: 'Industrial CNC Machining',
    description: 'State-of-the-art precision equipment',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80',
  },
]

const categories = ['All', 'CNC Machining', 'Laser', 'Welding', 'Plasma', '3D Printing', 'EOAT', 'Mold Repair']

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

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
              Portfolio
            </span>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-white uppercase mb-6">
              Our Work &
              <br />
              <span className="text-primary-500">Equipment</span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-xl lg:text-2xl xl:text-3xl text-secondary-300 max-w-2xl xl:max-w-3xl leading-relaxed">
              Explore our state-of-the-art machinery and examples of precision work we deliver to our customers.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 lg:py-32 bg-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-10" />

        <div className="container-custom relative">
          <FadeInUp className="text-center mb-16">
            <span className="inline-flex items-center justify-center text-primary-400 font-medium tracking-wider uppercase text-sm mb-4">
              <span className="w-8 h-px bg-primary-500 mr-3" />
              Featured
              <span className="w-8 h-px bg-primary-500 ml-3" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white uppercase">
              Machines in Action
            </h2>
          </FadeInUp>

          <div className="grid md:grid-cols-2 gap-8 xl:gap-10 2xl:gap-12">
            {featuredImages.map((item, index) => (
              <FadeInUp key={index} delay={index * 0.1}>
                <div className="group relative overflow-hidden aspect-video"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/90 via-secondary-950/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-white font-display text-xl uppercase mb-1">{item.title}</p>
                    <p className="text-secondary-400">{item.description}</p>
                  </div>
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary-500/20"
                       style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-secondary-900 border-y border-secondary-800 sticky top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  category === activeCategory
                    ? 'bg-primary-500 text-white'
                    : 'bg-secondary-800 text-secondary-400 hover:text-white hover:bg-secondary-700 border border-secondary-700'
                }`}
                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 lg:py-32 bg-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 industrial-grid opacity-10" />

        <div className="container-custom relative">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 2xl:gap-10">
            {filteredItems.map((item) => (
              <StaggerItem key={item.id}>
                <div className="group h-full">
                  <div className="service-card h-full">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/30 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-500 text-white text-xs font-medium uppercase tracking-wider px-3 py-1"
                              style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-secondary-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-secondary-400 text-lg">No items found in this category.</p>
            </div>
          )}
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
              Ready to Start Your Project?
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-secondary-300 text-lg mb-10 max-w-2xl mx-auto">
              Let us put our capabilities to work for you. Contact us today to discuss your tooling or
              machining needs.
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
