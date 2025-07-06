// src/personas.ts
// Demo personas for app testing and showcase

export interface Persona {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  description: string;
  preferredPayment: 'paypal' | 'ecocash' | 'onemoney' | 'telecash';
}

export const personas: Persona[] = [
  {
    id: 'zim-local',
    name: 'Tendai Moyo',
    email: 'tendai.moyo@example.co.zw',
    phone: '0772123456',
    country: 'Zimbabwe',
    description: 'Local Zimbabwean using EcoCash for daily purchases.',
    preferredPayment: 'ecocash',
  },
  {
    id: 'zim-diaspora',
    name: 'Rudo Chikafu',
    email: 'rudo.chikafu@gmail.com',
    phone: '+447911123456',
    country: 'United Kingdom',
    description: 'Diaspora user in the UK sending groceries to family in Zimbabwe.',
    preferredPayment: 'paypal',
  },
  {
    id: 'zim-business',
    name: 'Blessing Ncube',
    email: 'blessing.ncube@zimstore.com',
    phone: '+263772987654',
    country: 'Zimbabwe',
    description: 'Small business owner using Paynow for bulk orders.',
    preferredPayment: 'onemoney',
  },
  {
    id: 'zim-youth',
    name: 'Tafadzwa Dube',
    email: 'tafadzwa.dube@studentmail.com',
    phone: '+263713456789',
    country: 'Zimbabwe',
    description: 'University student using Telecash for mobile payments.',
    preferredPayment: 'telecash',
  },
  {
    id: 'zim-senior',
    name: 'Sarah Mutsvairo',
    email: 'sarah.mutsvairo@yahoo.com',
    phone: '+263772654321',
    country: 'Zimbabwe',
    description: 'Senior citizen receiving diaspora support via PayPal.',
    preferredPayment: 'paypal',
  },
];
