import { BookOpen, CalendarDays, Globe, Microscope, Sparkles, UserPlus, type LucideIcon } from 'lucide-react';

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Info', href: '/info' },
  { name: 'Map', href: '/map' },
];

export const infoPages = [
  { slug: 'about-ayush', title: 'About AYUSH', content: 'AYUSH stands for Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy. These are the six Indian systems of medicine prevalent and practiced in India and some of the neighboring Asian countries with a long history.' },
  { slug: 'ayurveda', title: 'Ayurveda', content: 'Ayurveda is a traditional Indian system of medicine. It aims to preserve health and wellness by keeping the mind, body, and spirit in balance and preventing disease rather than treating it.' },
  { slug: 'yoga-naturopathy', title: 'Yoga & Naturopathy', content: 'Yoga is a mind and body practice with a 5,000-year history in ancient Indian philosophy. Naturopathy is a system of health care which promotes the body’s own self-healing mechanism.' },
  { slug: 'unani', title: 'Unani', content: 'The Unani system of medicine originated in Greece and was developed by Arabs into an elaborate medical science based on the framework of the teachings of Hippocrates and Galen.' },
  { slug: 'siddha', title: 'Siddha', content: 'The Siddha system is one of the oldest systems of medicine in India. The term Siddha means \'achievements\' and the Siddhars were saintly persons who achieved results in medicine.' },
  { slug: 'homoeopathy', title: 'Homoeopathy', content: 'Homoeopathy is a system of medicine based on the principle of "like cures like". It was created in the late 18th century by Samuel Hahnemann.' },
  { slug: 'sowa-rigpa', title: 'Sowa-Rigpa', content: 'Sowa-Rigpa is a traditional Tibetan system of medicine. It is one of the oldest, living, and well-documented medical traditions of the world.' },
  { slug: 'herbal-medicine', title: 'Herbal Medicine', content: 'Herbal medicine is the use of plants for medicinal purposes. Plants have been the basis for medical treatments through much of human history, and such traditional medicine is still widely practiced today.' },
  { slug: 'wellness-tourism', title: 'Wellness Tourism', content: 'Wellness tourism is travel for the purpose of promoting health and well-being through physical, psychological, or spiritual activities. AYUSH plays a big role in this sector.' },
  { slug: 'research-in-ayush', title: 'Research in AYUSH', content: 'Significant research is being conducted to validate the efficacy and safety of AYUSH treatments, integrating traditional knowledge with modern scientific methods.' },
];

export const eventHighlights: { title: string; description: string; icon: LucideIcon }[] = [
    {
      title: 'Expert Workshops',
      description: 'Engage in hands-on sessions with leading AYUSH practitioners and masters.',
      icon: UserPlus,
    },
    {
      title: 'Live Demonstrations',
      description: 'Witness the art and science of traditional therapies and wellness practices.',
      icon: Sparkles,
    },
    {
      title: 'Scientific Seminars',
      description: 'Discover the latest research and advancements in the field of alternative medicine.',
      icon: Microscope,
    },
    {
      title: 'Global Pavilion',
      description: 'Explore AYUSH practices from around the world and their cultural significance.',
      icon: Globe,
    },
];

export const featuredExhibitors = [
    {
        name: 'Himalayan Organics',
        description: 'Pioneers in certified organic herbal supplements and wellness products.',
        category: 'Herbal Supplements',
        imageId: 'exhibitor1'
    },
    {
        name: 'Aroma Essentials',
        description: 'Specialists in therapeutic-grade essential oils and aromatherapy solutions.',
        category: 'Aromatherapy',
        imageId: 'exhibitor2'
    },
    {
        name: 'The Sattva Centre',
        description: 'A leading destination for authentic Ayurvedic retreats and wellness programs.',
        category: 'Wellness Retreat',
        imageId: 'exhibitor3'
    },
];

export const mapExhibitors = [
  { id: 'e01', name: 'Himalayan Organics', booth: 'A1-A3', category: 'Herbal Supplements', x: '15%', y: '25%' },
  { id: 'e02', name: 'Patanjali Ayurved', booth: 'B5', category: 'FMCG & Wellness', x: '25%', y: '50%' },
  { id: 'e03', name: 'Dabur India Ltd.', booth: 'C2', category: 'Healthcare Products', x: '40%', y: '30%' },
  { id: 'e04', name: 'Aroma Essentials', booth: 'D7', category: 'Aromatherapy', x: '55%', y: '65%' },
  { id: 'e05', name: 'The Art of Living', booth: 'E1-E4', category: 'Yoga & Meditation', x: '70%', y: '40%' },
  { id: 'e06', name: 'The Sattva Centre', booth: 'F10', category: 'Wellness Retreat', x: '80%', y: '20%' },
  { id: 'k01', name: 'Information Desk', booth: 'Info', category: 'Key Location', x: '50%', y: '5%' },
  { id: 'k02', name: 'Restrooms', booth: 'Restrooms', category: 'Key Location', x: '8%', y: '85%' },
  { id: 'k03', name: 'Food Court', booth: 'Food', category: 'Key Location', x: '85%', y: '80%' },
];
