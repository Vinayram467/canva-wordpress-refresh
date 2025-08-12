import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sampleBlogs = [
  {
    id: '1',
    category: 'Cardiology',
    readTime: '5 min read',
    image: '/lovable-uploads/04886a89-4380-4ad3-b37a-fda3e60c23db.png',
    date: 'Dec 15, 2024',
    author: 'Dr. Sarah Johnson',
    title: '10 Tips for Heart Health',
    summary: 'Learn essential habits to maintain a healthy heart and prevent cardiovascular diseases.',
    content: `Maintaining heart health is crucial for a long and healthy life. Here are 10 essential tips:
1. Eat a balanced diet rich in fruits and vegetables.
2. Exercise regularly.
3. Avoid smoking and excessive alcohol.
4. Manage stress effectively.
5. Get regular health checkups.
6. Maintain a healthy weight.
7. Limit salt and sugar intake.
8. Stay hydrated.
9. Get enough sleep.
10. Monitor your blood pressure and cholesterol levels.`
  },
  {
    id: '2',
    category: 'Mental Health',
    readTime: '7 min read',
    image: '/lovable-uploads/7554cf5d-a7c8-4cc7-b0e0-ce8ad3e060e3.png',
    date: 'Dec 12, 2024',
    author: 'Dr. Michael Chen',
    title: 'Understanding Mental Wellness',
    summary: 'Explore the importance of mental health and strategies for maintaining emotional well-being.',
    content: `Mental wellness is as important as physical health. Strategies include:
- Practicing mindfulness and meditation
- Building strong social connections
- Seeking professional help when needed
- Maintaining a healthy lifestyle
- Setting realistic goals and boundaries
- Taking breaks and relaxing`
  },
  {
    id: '3',
    category: 'Nutrition',
    readTime: '4 min read',
    image: '/lovable-uploads/placeholder.svg',
    date: 'Dec 10, 2024',
    author: 'Dr. Emily Rodriguez',
    title: 'Nutrition for Better Health',
    summary: 'Discover how proper nutrition can boost your immune system and overall health.',
    content: `Good nutrition is the foundation of good health. Tips include:
- Eating a variety of foods
- Including plenty of fruits and vegetables
- Choosing whole grains
- Limiting processed foods
- Drinking enough water
- Avoiding excessive sugar and salt`
  }
];

export const sampleEvents = [
  {
    id: '1',
    type: 'Health Camp',
    title: 'Free Health Screening Camp',
    date: 'January 15, 2025',
    time: '9:00 AM - 4:00 PM',
    location: 'Main Hospital Lobby',
    description: 'Join us for a comprehensive health screening camp. Free checkups and consultations for all attendees.',
    image: '/lovable-uploads/04886a89-4380-4ad3-b37a-fda3e60c23db.png',
    performer: 'Maiya Hospital Medical Team',
    price: 0
  },
  {
    id: '2',
    type: 'Vaccination',
    title: 'Pediatric Vaccination Drive',
    date: 'January 20, 2025',
    time: '10:00 AM - 3:00 PM',
    location: 'Pediatric Wing',
    description: 'Vaccination drive for children aged 6 months to 5 years. Protect your child from preventable diseases.',
    image: '/lovable-uploads/7554cf5d-a7c8-4cc7-b0e0-ce8ad3e060e3.png',
    performer: 'Pediatric Department',
    price: 0
  },
  {
    id: '3',
    type: 'Seminar',
    title: 'Heart Health Awareness Seminar',
    date: 'January 25, 2025',
    time: '2:00 PM - 4:00 PM',
    location: 'Conference Hall',
    description: 'Learn about heart disease prevention, healthy lifestyle choices, and the latest treatments from our experts.',
    image: '/lovable-uploads/04886a89-4380-4ad3-b37a-fda3e60c23db.png',
    performer: 'Cardiology Team',
    price: 0
  }
];
