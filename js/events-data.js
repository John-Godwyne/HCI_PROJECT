/**
 * UnityHub — shared event catalog (dashboard, events list, detail page)
 */
(function (global) {
  'use strict';

  const EVENTS = {
    'event-coastal': {
      title: 'Coastal Clean-up Drive',
      image: 'https://i.pinimg.com/1200x/b9/d7/43/b9d743749ad0780f3e11bfa41f604919.jpg',
      imageAlt: 'Beach cleanup volunteers',
      tag: 'Environment',
      tagClass: 'tag-environment',
      date: 'Saturday, June 15, 2026',
      time: '6:00 AM – 10:00 AM',
      location: 'Baywalk, Roxas Boulevard, Manila',
      participants: '45+ participants registered',
      organizer: 'Eco Warriors',
      orgimage: 'https://i.pinimg.com/1200x/3e/45/e4/3e45e4ce0f35e9471fc50d6249f8eb85.jpg',
      about:
        'Join us for a morning coastal clean-up along Manila Baywalk. Help remove plastic waste and debris while learning about marine conservation. This activity supports SDG 14 (Life Below Water) and strengthens partnerships between students and local communities.',
      bring: [
        'Reusable gloves (extras provided on site)',
        'Water bottle and sun protection',
        'Comfortable clothes and closed shoes',
        'Valid school ID for registration check-in',
      ],
      requirements:
        'Open to all students and registered volunteers. Minors must be accompanied by a guardian or organization representative.',
    },
    'event-literacy': {
      title: 'Literacy Workshop for Kids',
      image: 'https://i.pinimg.com/1200x/5a/b7/d7/5ab7d7ea65bd3ad1b0dce73f6a9896c9.jpg',
      imageAlt: 'Students in workshop',
      tag: 'Education',
      tagClass: 'tag-education',
      date: 'Friday, June 20, 2026',
      time: '2:00 PM – 5:00 PM',
      location: 'Barangay Hall, Quezon City',
      participants: '18+ participants registered',
      organizer: 'Read Together PH',
      about:
        'Volunteer tutors lead reading and writing activities for elementary students. Sessions include storytelling, phonics games, and one-on-one literacy support aligned with community learning goals.',
      bring: [
        'Notebook and pen for session notes',
        'Comfortable attire',
        'Valid school ID',
      ],
      requirements:
        'Open to student volunteers with basic facilitation experience or orientation attendance.',
    },
    'event-health': {
      title: 'Community Health Fair',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=500&fit=crop',
      imageAlt: 'Health outreach volunteers',
      tag: 'Health',
      tagClass: 'tag-health',
      date: 'Sunday, June 22, 2026',
      time: '8:00 AM – 4:00 PM',
      location: 'Campus Gymnasium',
      participants: '62+ participants registered',
      organizer: 'Campus Med Society',
      about:
        'Free screenings, nutrition counseling, and wellness booths for students and nearby residents. Volunteers assist with registration, crowd flow, and basic health education stations.',
      bring: ['Comfortable shoes', 'Reusable water bottle', 'Campus ID'],
      requirements: 'Volunteers must attend a 30-minute briefing at 7:30 AM on event day.',
    },
    'event-summit': {
      title: 'Barangay Youth Summit',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=500&fit=crop',
      imageAlt: 'Youth summit participants',
      tag: 'Community',
      tagClass: 'tag-community',
      date: 'Saturday, July 5, 2026',
      time: '9:00 AM – 3:00 PM',
      location: 'Municipal Hall',
      participants: '30+ participants registered',
      organizer: 'Youth Leaders Network',
      about:
        'A full-day forum on civic engagement, leadership, and local project planning. Includes panel talks, breakout workshops, and networking with barangay youth councils.',
      bring: ['Notebook', 'Government-issued or school ID'],
      requirements: 'Registration required. Open to ages 16–24.',
    },
    'event-tree': {
      title: 'Tree Planting Initiative',
      image: 'https://images.summitmedia-digital.com/spotph/images/2024/11/14/la-mesa-ecopark-trails-1731557240.jpg',
      imageAlt: 'Tree planting volunteers',
      tag: 'Environment',
      tagClass: 'tag-environment',
      date: 'Saturday, July 12, 2026',
      time: '7:00 AM – 11:00 AM',
      location: 'La Mesa Eco Park',
      participants: '28+ participants registered',
      organizer: 'Eco Warriors',
      orgimage: 'https://i.pinimg.com/1200x/3e/45/e4/3e45e4ce0f35e9471fc50d6249f8eb85.jpg',
      about:
        'Help restore green cover by planting native seedlings and maintaining trails. Brief orientation covers safety, species identification, and watershed stewardship.',
      bring: ['Closed shoes', 'Hat and sunscreen', 'Gloves (provided if needed)'],
      requirements: 'Moderate outdoor activity. Bring water and wear weather-appropriate clothing.',
    },
  };

  function detailUrl(id) {
    return `event-detail.html?id=${encodeURIComponent(id)}`;
  }

  function getEvent(id) {
    return EVENTS[id] || null;
  }

  global.UnityHubEvents = {
    EVENTS,
    detailUrl,
    getEvent,
    defaultId: 'event-coastal',
  };
})(typeof window !== 'undefined' ? window : globalThis);
