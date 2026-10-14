export type ServiceCategory = 'Skin & Facials' | 'Hair & Styling' | 'Nails & Feet' | 'Bridal & Makeup' | 'Body Care & Wellness' | 'At-Home Beauty'
export type SalonService = { name: string; category: ServiceCategory; description: string }

export const categories: ServiceCategory[] = ['Skin & Facials', 'Hair & Styling', 'Nails & Feet', 'Bridal & Makeup', 'Body Care & Wellness', 'At-Home Beauty']

export const services: SalonService[] = [
  { name: 'Eyebrow Threading', category: 'Body Care & Wellness', description: 'A considered shape, finished with a light hand.' },
  { name: 'Tanning', category: 'Skin & Facials', description: 'A tanning service tailored to your preference.' },
  { name: 'Skincare', category: 'Skin & Facials', description: 'Thoughtful care shaped around your skin and routine.' },
  { name: 'Bridal Services', category: 'Bridal & Makeup', description: 'Beauty preparation for the moments you’ll remember.' },
  { name: 'Pedicure', category: 'Nails & Feet', description: 'Foot care with time for a little refresh.' },
  { name: 'Facials', category: 'Skin & Facials', description: 'A moment to refresh and care for your skin.' },
  { name: 'Haircuts & Blowouts', category: 'Hair & Styling', description: 'A fresh shape and a smooth, finished style.' },
  { name: 'Hair Extensions', category: 'Hair & Styling', description: 'Added length or fullness chosen to suit your look.' },
  { name: 'Body Waxing', category: 'Body Care & Wellness', description: 'Careful hair removal for smooth skin.' },
  { name: 'Massage', category: 'Body Care & Wellness', description: 'Time to slow down and make space for yourself.' },
  { name: 'Acne Treatments', category: 'Skin & Facials', description: 'An attentive approach to blemish-prone skin.' },
  { name: 'Makeup Services', category: 'Bridal & Makeup', description: 'Makeup for celebrations, events and everyday moments.' },
  { name: 'Manicure', category: 'Nails & Feet', description: 'Hand and nail care with a neat, polished finish.' },
  { name: 'Mobile Salon Services', category: 'At-Home Beauty', description: 'Ask about arranging selected beauty services at your location.' },
  { name: 'Wedding & Event Preparation', category: 'Bridal & Makeup', description: 'A considered beauty plan for your special occasion.' },
  { name: 'Shampoo & Conditioning', category: 'Hair & Styling', description: 'A refreshing wash and conditioning ritual.' },
  { name: 'Spa Services', category: 'Body Care & Wellness', description: 'A relaxing pause with care for body and mind.' },
  { name: 'Hairstyling', category: 'Hair & Styling', description: 'An occasion-ready finish or a style for every day.' },
]

const image = (id: string, width: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const photos = {
  hero: { src: image('photo-1487412947147-5cebf100ffc2', 1800), alt: 'Beauty portrait with natural makeup and softly styled hair' },
  skinTile: { src: image('photo-1570172619644-dfd03ed5d881', 950), alt: 'Client receiving a professional facial treatment' },
  hairTile: { src: image('photo-1522337360788-8b13dee7a37e', 950), alt: 'Long hair being styled with a natural finish' },
  bridalTile: { src: image('photo-1599029575302-290d8f461dc9', 950), alt: 'Bridal beauty inspiration with soft makeup and a veil' },
  experience: { src: image('photo-1560066984-138dadb4c035', 1100), alt: 'Stylist working with a client in a bright salon' },
  occasion: { src: image('photo-1599029575302-290d8f461dc9', 1200), alt: 'Bridal beauty portrait with softly finished makeup and a veil' },
  gallery: [
    { src: '/images/skin-spa-care.png', alt: 'A relaxing facial treatment in a beauty spa', label: 'Skin & spa care' },
    { src: '/images/nail-care.png', alt: 'Manicure in progress with soft pink nail polish', label: 'Nail care' },
    { src: '/images/makeup-artistry.png', alt: 'Makeup artist applying eye makeup in a beauty salon', label: 'Makeup artistry' },
    { src: '/images/pedicure.png', alt: 'Pedicure treatment with soft pink nail polish in a beauty salon', label: 'Body care' },
    { src: '/images/hair-styling2.png', alt: 'Editorial hairstyling with a softly finished look', label: 'Hair & styling' },
    { src: '/images/special-occasions.png', alt: 'An elegant wedding celebration detail', label: 'Special occasions' },
  ],
}
