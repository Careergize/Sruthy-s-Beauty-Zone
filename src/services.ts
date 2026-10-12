export type ServiceCategory = 'Hair' | 'Skin' | 'Nails' | 'Bridal & Makeup' | 'Waxing & Threading' | 'Spa & Wellness' | 'Special Services'

export type SalonService = { name: string; category: ServiceCategory; description: string }

export const categories: ServiceCategory[] = ['Hair', 'Skin', 'Nails', 'Bridal & Makeup', 'Waxing & Threading', 'Spa & Wellness', 'Special Services']

export const services: SalonService[] = [
  { name: 'Eyebrow Threading', category: 'Waxing & Threading', description: 'A considered shape, finished with a light hand.' },
  { name: 'Tanning', category: 'Skin', description: 'A sun-kissed look, tailored to your preference.' },
  { name: 'Skincare', category: 'Skin', description: 'Thoughtful care shaped around your skin’s needs.' },
  { name: 'Bridal Services', category: 'Bridal & Makeup', description: 'Beauty preparation for the moments you’ll remember.' },
  { name: 'Pedicure', category: 'Nails', description: 'A restorative foot treatment with neat, polished finish.' },
  { name: 'Facials', category: 'Skin', description: 'A moment to refresh, restore and care for your skin.' },
  { name: 'Haircuts & Blowouts', category: 'Hair', description: 'A fresh shape and a smooth, beautifully finished style.' },
  { name: 'Hair Extensions', category: 'Hair', description: 'Added length and fullness, chosen to suit your look.' },
  { name: 'Body Waxing', category: 'Waxing & Threading', description: 'Careful, considered hair removal for smooth skin.' },
  { name: 'Massage', category: 'Spa & Wellness', description: 'Time to slow down and give yourself a little care.' },
  { name: 'Acne Treatments', category: 'Skin', description: 'A gentle, attentive approach to blemish-prone skin.' },
  { name: 'Makeup Services', category: 'Bridal & Makeup', description: 'Makeup for celebrations, events and everyday moments.' },
  { name: 'Manicure', category: 'Nails', description: 'Nail and hand care finished with a touch of polish.' },
  { name: 'Mobile Salon Services', category: 'Special Services', description: 'Ask about beauty services arranged at your location.' },
  { name: 'Wedding & Event Preparation', category: 'Bridal & Makeup', description: 'A considered beauty plan for your special occasion.' },
  { name: 'Shampoo & Conditioning', category: 'Hair', description: 'A refreshing wash and conditioning ritual for your hair.' },
  { name: 'Spa Services', category: 'Spa & Wellness', description: 'A relaxing pause with care for body and mind.' },
  { name: 'Hairstyling', category: 'Hair', description: 'An occasion-ready finish or a style for the everyday.' },
]

export const photos = {
  hero: { src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=85', alt: 'Warm, thoughtfully arranged beauty salon interior' },
  about: { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1100&q=85', alt: 'Stylist carefully working on a client’s hair' },
  bridal: { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=85', alt: 'Bridal makeup and styling inspiration' },
  gallery: [
    { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=850&q=85', alt: 'Soft bridal makeup inspiration' },
    { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=850&q=85', alt: 'Hair styling in a salon' },
    { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=850&q=85', alt: 'A neat manicure with a warm neutral polish' },
    { src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=850&q=85', alt: 'A calming facial skincare treatment' },
    { src: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=850&q=85', alt: 'A finished, softly styled haircut' },
    { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=850&q=85', alt: 'A serene spa and wellness setting' },
  ],
}
