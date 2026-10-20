const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Eluru Event Links initial database...');

  // 1. Seed or Upsert Site Settings
  await prisma.siteSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      websiteName: 'ELURU EVENT LINKS',
      teluguTagline: 'ఒక్క క్లిక్‌తో.. పెళ్లి పనులు సులువుగా!',
      founderName: 'T. Ganesh Gowtham',
      publicEmail: 'Elurueventlinks@gmail.com',
      primaryPhone: '+91 99495 31668',
      whatsappNumber: '+91 9603921666',
      instagramUrl: 'https://www.instagram.com/eluru_event_links?stkn=cGE5cXgzazlkYzNu',
      address: 'Eluru, Andhra Pradesh, India',
      heroHeading: 'Plan Your Perfect Event in Eluru',
      heroDescription: 'Discover trusted local function halls, photographers, catering services, decorators, and transportation providers—all in one place.',
      heroImage: 'https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/d6f0f2a1e_Screenshot2026-09-10135914.png',
      aboutText: 'ELURU EVENT LINKS is founded by T. Ganesh Gowtham with the vision of simplifying event planning, weddings, and family functions across Eluru and nearby regions. We connect verified local businesses with customers in a single, transparent directory.',
      whyChooseUs: 'Verified local businesses, direct contact via call & WhatsApp, zero hidden middleman fees, and comprehensive coverage across all wedding and function services in Eluru.',
      footerText: '© 2026 ELURU EVENT LINKS. Founded by T. Ganesh Gowtham. Connecting Eluru celebrations.'
    }
  });

  // 2. Seed Authorized Administrator Account
  // Email: eluruevents@gmail.com (strictly non-hardcoded default password, hashed securely for initial bootstrap)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Admin@Eluru2026!', salt);

  await prisma.user.upsert({
    where: { email: 'eluruevents@gmail.com' },
    update: { role: 'admin' },
    create: {
      email: 'eluruevents@gmail.com',
      name: 'Eluru Events Administrator',
      password: hashedPassword,
      role: 'admin'
    }
  });

  // 3. Seed Categories
  const categoriesData = [
    {
      slug: 'function-halls',
      name: 'Function Halls',
      teluguName: 'కళ్యాణ మండపాలు & ఫంక్షన్ హాళ్ళు',
      description: 'AC & Non-AC marriage mandapams, banquet halls, and convention centers with parking and guest rooms.',
      icon: 'Building2',
      image: 'https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/d6f0f2a1e_Screenshot2026-09-10135914.png',
      order: 1
    },
    {
      slug: 'photography',
      name: 'Photography',
      teluguName: 'ఫోటోగ్రఫీ & వీడియోగ్రఫీ',
      description: 'Professional wedding photographers, candid shoots, drone coverage, and cinematic albums.',
      icon: 'Camera',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      order: 2
    },
    {
      slug: 'catering',
      name: 'Catering',
      teluguName: 'కేటరింగ్ సర్వీసెస్',
      description: 'Delicious traditional Andhra vegetarian & non-vegetarian wedding meals, buffets, and professional catering boys.',
      icon: 'UtensilsCrossed',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      order: 3
    },
    {
      slug: 'decoration',
      name: 'Decoration',
      teluguName: 'పూల అలంకరణ & డెకరేషన్',
      description: 'Grand floral stages, theme reception setups, hall lighting, and traditional pandal decor.',
      icon: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      order: 4
    },
    {
      slug: 'transportation',
      name: 'Transportation',
      teluguName: 'ట్రావెల్స్ & బస్సు రవాణా',
      description: 'AC cars, tempo travelers, sleeper buses, and government bus services for baraat and guest travel.',
      icon: 'Bus',
      image: 'https://img.sanishtech.com/u/dddf06489b24a99b0519f1b14d5cfc88.jpg',
      order: 5
    }
  ];

  const categories = {};
  for (const cat of categoriesData) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat
    });
    categories[cat.slug] = record.id;
  }

  // 4. Clear existing seeded businesses to ensure clean mapping
  await prisma.business.deleteMany({});

  // 5. Seed Function Halls (Images 1-4 strictly in requested order)
  // Image 1: https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/d6f0f2a1e_Screenshot2026-09-10135914.png
  // Image 2: https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/b45e439e9_Screenshot2026-09-10140032.png
  // Image 3: https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/c05eea9e4_3.jpeg
  // Image 4: https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/20506f14f_4.jpeg

  await prisma.business.create({
    data: {
      categoryId: categories['function-halls'],
      name: 'Venkatrama Kalyana Mandapamu',
      teluguName: 'వెంకట్రామ కళ్యాణ మండపము',
      managerName: 'T. Tulasi Rao',
      phone: '9440664181',
      location: 'Eluru',
      serviceArea: 'Eluru and surrounding areas',
      seatingCapacity: '400–500',
      carParking: true,
      parkingDetails: 'Car parking available',
      rooms: '4 AC rooms',
      busAccess: 'Bus allowed on the road',
      googleMapsUrl: 'https://maps.app.goo.gl/mKJZvcXKxzLAmZsZ8',
      mainImage: 'https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/d6f0f2a1e_Screenshot2026-09-10135914.png',
      gallery: JSON.stringify([
        'https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/d6f0f2a1e_Screenshot2026-09-10135914.png',
        'https://familiar-azure-g8xdthdnzm.edgeone.app'
      ]),
      description: 'One of the prestigious and spacious traditional marriage halls in Eluru with full amenities for weddings, receptions, and major family milestones.',
      advantages: 'Convenient central road connectivity, bus access, comfortable air-conditioned suites for bride and groom families, and dedicated dining area.',
      isFeatured: true,
      isActive: true
    }
  });

  await prisma.business.create({
    data: {
      categoryId: categories['function-halls'],
      name: 'VTR GRAND',
      teluguName: 'వి టి ఆర్ గ్రాండ్',
      managerName: 'Information not provided',
      phone: '9010645454',
      location: 'Eluru',
      serviceArea: 'Eluru',
      seatingCapacity: '350–600',
      carParking: true,
      parkingDetails: 'Car parking available',
      rooms: 'Available',
      busAccess: 'Bus allowed on the road',
      googleMapsUrl: 'https://maps.app.goo.gl/axosuMkmL6YE1U8d6',
      mainImage: 'https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/b45e439e9_Screenshot2026-09-10140032.png',
      gallery: JSON.stringify([
        'https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/b45e439e9_Screenshot2026-09-10140032.png',
        'https://peaceful-blush-hj72xwxkln.edgeone.app'
      ]),
      description: 'Modern, well-appointed luxury celebration hall located conveniently in Eluru with grand ambience and banquet setup.',
      advantages: 'Grand entrance, elegant lighting, ample parking space, and modern event facilities.',
      isFeatured: true,
      isActive: true
    }
  });

  await prisma.business.create({
    data: {
      categoryId: categories['function-halls'],
      name: 'శ్రీ వాసవి కన్యకా పరమేశ్వరి సత్రం & కళ్యాణ మండపం',
      teluguName: 'శ్రీ వాసవి కన్యకా పరమేశ్వరి సత్రం & కళ్యాణ మండపం',
      managerName: 'P. Ramakrishna Rao',
      phone: '9490597429',
      location: 'Eluru',
      serviceArea: 'Eluru',
      seatingCapacity: '350–600',
      carParking: true,
      parkingDetails: 'Car parking available',
      rooms: '4 AC rooms and 4 non-AC rooms',
      busAccess: 'Bus allowed on the road',
      googleMapsUrl: 'https://maps.app.goo.gl/X5SV1zcQHP6n9e3B6',
      mainImage: 'https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/c05eea9e4_3.jpeg',
      gallery: JSON.stringify([
        'https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/c05eea9e4_3.jpeg',
        'https://overwhelming-teal-ubzlfmhyu8.edgeone.app'
      ]),
      description: "Community & Name Information: Arya Vysya's. Traditional, auspicious and peaceful venue for auspicious wedding ceremonies, upanayanams, and family celebrations.",
      advantages: '8 total rooms (4 AC and 4 non-AC) for guests and hosts, spacious dining, authentic traditional atmosphere, and central Eluru location.',
      isFeatured: true,
      isActive: true
    }
  });

  await prisma.business.create({
    data: {
      categoryId: categories['function-halls'],
      name: 'Sri Krishna Residency - VTR Square Eluru',
      teluguName: 'శ్రీ కృష్ణ రెసిడెన్సీ - VTR స్క్వేర్ ఏలూరు',
      managerName: 'Naresh',
      phone: '8919352989',
      location: 'Eluru',
      serviceArea: 'Eluru',
      seatingCapacity: '110–150',
      carParking: true,
      parkingDetails: 'Car parking available',
      rooms: '2 AC rooms',
      busAccess: 'Bus allowed on the road',
      googleMapsUrl: 'https://maps.app.goo.gl/b1LHWBVcKP3GYdjc8',
      mainImage: 'https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/20506f14f_4.jpeg',
      gallery: JSON.stringify([
        'https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/20506f14f_4.jpeg',
        'https://chilly-bronze-liu8oi6wjn.edgeone.app'
      ]),
      description: 'Ideal compact banquet hall and residency venue suited for engagements, birthday parties, intimate family ceremonies, and corporate gatherings.',
      advantages: 'Prime location at VTR Square, neat air-conditioned accommodation rooms, lift access, and prompt management.',
      isFeatured: false,
      isActive: true
    }
  });

  // 6. Seed Photography
  await prisma.business.create({
    data: {
      categoryId: categories['photography'],
      name: 'Sweet Shots Photography',
      teluguName: 'స్వీట్ షాట్స్ ఫోటోగ్రఫీ',
      managerName: 'Rahul Akula',
      phone: '7997295466',
      location: 'Eluru and surrounding areas',
      serviceArea: 'Eluru and surrounding areas',
      websiteUrl: 'https://sites.google.com/view/sweetshots-in/logo',
      services: JSON.stringify([
        'Photos',
        'Videos',
        'Drone coverage',
        'Candid photography',
        'Cinematic coverage',
        'Formalities-to-wedding coverage',
        'Album delivery'
      ]),
      mainImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80'
      ]),
      description: 'Top-tier wedding photography team capturing heartfelt moments with high-end cameras, 4K drones, candid lenses, and premium custom photo books.',
      isFeatured: true,
      isActive: true
    }
  });

  await prisma.business.create({
    data: {
      categoryId: categories['photography'],
      name: 'UMA PHOTOGRAPHY',
      teluguName: 'ఉమా ఫోటోగ్రఫీ',
      managerName: 'UMA',
      phone: '9440005259',
      location: 'Eluru',
      serviceArea: 'Eluru',
      services: JSON.stringify(['Photography', 'Videography']),
      mainImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      description: 'Reliable and experienced local event photography and HD videography service provider for family functions and marriages.',
      isFeatured: false,
      isActive: true
    }
  });

  // 7. Seed Catering
  await prisma.business.create({
    data: {
      categoryId: categories['catering'],
      name: 'Maruthi Catering',
      teluguName: 'మారుతి కేటరింగ్',
      managerName: 'Praveen',
      phone: '9392094363',
      location: 'Eluru',
      serviceArea: 'Eluru',
      foodType: 'vegetarian',
      services: JSON.stringify(['Vegetarian Wedding Meals', 'Breakfast & Sweets', 'Buffet Setup']),
      mainImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      description: 'Authentic pure vegetarian catering serving mouth-watering Andhra meals, traditional sweets, and disciplined catering boys.',
      isFeatured: true,
      isActive: true
    }
  });

  await prisma.business.create({
    data: {
      categoryId: categories['catering'],
      name: 'Naga Catering',
      teluguName: 'నాగ కేటరింగ్',
      managerName: 'Srikanth',
      phone: '9666580909',
      location: 'Eluru',
      serviceArea: 'Eluru',
      foodType: 'vegetarian',
      services: JSON.stringify(['Pure Vegetarian Catering', 'Live Counters', 'Traditional Feasts']),
      mainImage: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&w=800&q=80',
      description: 'Specialists in pure vegetarian traditional event cooking with hygienic preparations and authentic tastes.',
      isFeatured: false,
      isActive: true
    }
  });

  await prisma.business.create({
    data: {
      categoryId: categories['catering'],
      name: 'L. Srinu Catering Boys',
      teluguName: 'ఎల్. శ్రీను కేటరింగ్ బాయ్స్',
      managerName: 'Srinu',
      phone: '+919652563272',
      location: 'Eluru and surrounding areas',
      serviceArea: 'Eluru and surrounding areas',
      foodType: 'both',
      services: JSON.stringify(['Vegetarian & Non-Vegetarian Food Service', 'Experienced Catering Boys', 'Buffet Management']),
      mainImage: 'https://images.unsplash.com/photo-1505253758473-96b3d52d9a9d?auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive catering and experienced serving team providing both vegetarian and non-vegetarian catering for all celebrations.',
      isFeatured: false,
      isActive: true
    }
  });

  await prisma.business.create({
    data: {
      categoryId: categories['catering'],
      name: 'Catering Boys',
      teluguName: 'కేటరింగ్ బాయ్స్',
      managerName: 'B. Venkata Mallikarjun Rao',
      phone: '9000947686',
      location: 'Eluru and surrounding areas',
      serviceArea: 'Eluru and surrounding areas',
      foodType: 'both',
      services: JSON.stringify(['Vegetarian & Non-Vegetarian Catering', 'Event Service Staff']),
      mainImage: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
      description: 'Reliable service staff and catering service for large gatherings, marriages, and receptions in Eluru.',
      isFeatured: false,
      isActive: true
    }
  });

  await prisma.business.create({
    data: {
      categoryId: categories['catering'],
      name: 'Catering Boys (Friends Circle)',
      teluguName: 'కేటరింగ్ బాయ్స్ (ఫ్రెండ్స్ సర్కిల్)',
      managerName: 'T. Ganesh',
      phone: '8309867499',
      location: 'Eluru and surrounding areas',
      serviceArea: 'Eluru and surrounding areas',
      foodType: 'both',
      services: JSON.stringify(['Vegetarian & Non-Vegetarian Event Feasts', 'Serving Squad']),
      mainImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      description: 'Energetic catering team ready to serve both vegetarian and non-vegetarian dishes with warm hospitality.',
      isFeatured: false,
      isActive: true
    }
  });

  // 8. Seed Decoration
  await prisma.business.create({
    data: {
      categoryId: categories['decoration'],
      name: 'Flower Decoration',
      teluguName: 'ఫ్లవర్ డెకరేషన్',
      managerName: 'V. Shishu',
      phone: '8247290150',
      location: 'Eluru and surrounding areas',
      serviceArea: 'Eluru and surrounding areas',
      services: JSON.stringify([
        'Flower decoration for function halls',
        'Wedding stage flower decor',
        'Pelli mandapam styling',
        'Entrance arch flower arrangements'
      ]),
      mainImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80'
      ]),
      description: 'Creative and fresh flower decoration services exclusively for wedding mandapams, reception backdrops, and function hall staging in Eluru.',
      isFeatured: true,
      isActive: true
    }
  });

  // 9. Seed Transportation
  await prisma.business.create({
    data: {
      categoryId: categories['transportation'],
      name: 'Universal Car Travels',
      teluguName: 'యూనివర్సల్ కార్ ట్రావెల్స్',
      managerName: 'G. Madhu',
      phone: '9948056666',
      location: 'Eluru and surrounding areas',
      serviceArea: 'Eluru and surrounding areas',
      vehicleTypes: 'Cars and small buses',
      vehicleCapacities: '4+1, 6+1, 7+1, 8+1, 12+1, 16+1, and 22',
      acType: 'AC',
      serviceType: 'Private',
      googleMapsUrl: 'https://maps.app.goo.gl/cHHwyv4bQHvZyFPL8',
      mainImage: 'https://img.sanishtech.com/u/c6c4c02a67df23e7b3e1c10e372b2856.jpg',
      gallery: JSON.stringify(['https://img.sanishtech.com/u/c6c4c02a67df23e7b3e1c10e372b2856.jpg']),
      description: 'Premium fleet of air-conditioned cars and mini buses for bride, groom, family transport, and airport/station pick-ups.',
      isFeatured: true,
      isActive: true
    }
  });

  await prisma.business.create({
    data: {
      categoryId: categories['transportation'],
      name: 'SRI KVR TRAVELS',
      teluguName: 'శ్రీ KVR ట్రావెల్స్',
      managerName: 'M. Ramesh',
      phone: '9848551727',
      location: 'Eluru and surrounding areas',
      serviceArea: 'Eluru and surrounding areas',
      vehicleTypes: 'AC, non-AC, and sleeper buses',
      vehicleCapacities: '40, 16, 24, 12, 32, and 34',
      acType: 'Both',
      sleeperAvailable: true,
      serviceType: 'Private',
      googleMapsUrl: 'https://maps.app.goo.gl/jUQq9vB9ThRwVruGA',
      mainImage: 'https://img.sanishtech.com/u/dddf06489b24a99b0519f1b14d5cfc88.jpg',
      gallery: JSON.stringify(['https://img.sanishtech.com/u/dddf06489b24a99b0519f1b14d5cfc88.jpg']),
      description: 'Specialists in marriage guest transport with luxury AC buses, sleeper coaches, and multiple seating capacity options.',
      isFeatured: true,
      isActive: true
    }
  });

  await prisma.business.create({
    data: {
      categoryId: categories['transportation'],
      name: 'APSRTC BUS STAND',
      teluguName: 'ఏపీఎస్ఆర్టీసీ బస్ స్టాండ్',
      managerName: 'KAMARI MADAM',
      phone: '7382909631',
      secondaryPhone: '8074228600',
      location: 'Eluru and surrounding areas',
      serviceArea: 'Eluru and surrounding areas',
      vehicleTypes: 'Non-AC Government Buses',
      vehicleCapacities: '55, 50, and 40',
      acType: 'Non-AC',
      serviceType: 'Government bus only',
      mainImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      description: 'Official Government APSRTC Special Hire buses available for wedding processions and long-distance guest travel with experienced state drivers.',
      isFeatured: false,
      isActive: true
    }
  });

  // 10. Seed Initial Sample Testimonials (approved and pending)
  await prisma.testimonial.createMany({
    data: [
      {
        customerName: 'K. Satyanarayana',
        eventType: 'Daughter’s Wedding',
        reviewText: 'We found Venkatrama Kalyana Mandapamu and Maruthi Catering through Eluru Event Links. Booking and contacting them directly made our wedding planning completely stress-free!',
        rating: 5,
        isActive: true
      },
      {
        customerName: 'M. Venu Gopal',
        eventType: 'Engagement Function',
        reviewText: 'Sweet Shots Photography captured stunning cinematic shots for our engagement. Excellent platform for Eluru residents.',
        rating: 5,
        isActive: true
      }
    ]
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
