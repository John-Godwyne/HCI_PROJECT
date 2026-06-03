(function (global) {
  'use strict';

  const RESOURCES = {
    'res-projector': {
      title: 'HD Projector',
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&h=600&fit=crop',
      imageAlt: 'HD Projector',
      category: 'Equipment',
      badge: 'Available',
      badgeClass: 'badge-available',
      condition: 'Good — 3000 lumens, HDMI & VGA',
      availability: 'Jun 1 – Aug 31, 2026',
      from: 'IT Society',
      fromImg: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=96&h=96&fit=crop',
      description: 'Portable HD projector suitable for seminars, film screenings, and community presentations. Includes remote control and carrying case. Borrowers must return within agreed dates and report any damage.',
      guidelines: [
        'Submit a request at least 3 days before needed date',
        'Valid organization or student ID required',
        'Return on or before the agreed return date',
        'Responsible for repair costs if damaged while borrowed',
      ],
    },
    'res-sound': {
      title: 'Sound System',
      image: 'https://i.pinimg.com/736x/9d/c3/71/9dc371c3ae057f6a31b05a7a592cabdc.jpg',
      imageAlt: 'Sound system',
      category: 'Equipment',
      badge: 'Available',
      badgeClass: 'badge-available',
      condition: 'Good condition · with 2 speakers',
      availability: 'Jun 1 – Aug 31, 2026',
      from: 'Music Society',
      fromImg: 'https://i.pravatar.cc/96?img=20',
      description: 'Full sound system with two speakers, amplifier, and microphone set. Ideal for outdoor events, concerts, and campus activities.',
      guidelines: [
        'Request at least 5 days in advance for large events',
        'Borrower must be present during setup',
        'Return all components including cables',
        'Damage deposit may be required',
      ],
    },
    'res-tables': {
      title: 'Folding Tables (set of 5)',
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&h=600&fit=crop',
      imageAlt: 'Folding tables',
      category: 'Furniture',
      badge: 'Available',
      badgeClass: 'badge-available',
      condition: 'Fair condition',
      availability: 'Year-round',
      from: 'Events Committee',
      fromImg: 'https://i.pravatar.cc/96?img=30',
      description: 'Set of 5 lightweight folding tables suitable for booths, bazaars, and community events. Easy to transport and set up.',
      guidelines: [
        'Book at least 2 days before the event',
        'Tables must be returned clean and dry',
        'Do not drag tables on rough surfaces',
        'Stack properly when returning',
      ],
    },
    'res-chairs': {
      title: 'Plastic Chairs (20 pcs)',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
      imageAlt: 'Plastic chairs',
      category: 'Furniture',
      badge: 'Available',
      badgeClass: 'badge-available',
      condition: 'Good condition',
      availability: 'Year-round',
      from: 'NSTP Office',
      fromImg: 'https://i.pravatar.cc/96?img=40',
      description: '20 stackable plastic chairs suitable for seminars, meetings, and community gatherings. Lightweight and easy to transport.',
      guidelines: [
        'Request through the NSTP office coordinator',
        'Return chairs stacked neatly',
        'Borrower responsible for transport',
        'Maximum borrow period is 3 days',
      ],
    },
    'res-art': {
      title: 'Art Materials Kit',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=600&fit=crop',
      imageAlt: 'Art materials',
      category: 'Supplies',
      badge: 'Available',
      badgeClass: 'badge-available',
      condition: 'New · paints, brushes, paper',
      availability: 'Jun – Jul 2026',
      from: 'Fine Arts Guild',
      fromImg: 'https://i.pravatar.cc/96?img=50',
      description: 'Complete art kit including acrylic paints, assorted brushes, canvas paper, and palette. Suitable for workshops, murals, and community art projects.',
      guidelines: [
        'Available for organization-led activities only',
        'Return unused materials in original packaging',
        'Brushes must be cleaned before return',
        'Consumables (paint, paper) are not refunded',
      ],
    },
    'res-cleaning': {
      title: 'Cleaning Materials',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=600&fit=crop',
      imageAlt: 'Cleaning supplies',
      category: 'Supplies',
      badge: 'Available',
      badgeClass: 'badge-available',
      condition: 'Good condition · gloves, bags, tools',
      availability: 'Year-round',
      from: 'Eco Warriors',
      fromImg: 'https://i.pinimg.com/1200x/3e/45/e4/3e45e4ce0f35e9471fc50d6249f8eb85.jpg',
      description: 'Cleaning kit for environmental drives and community clean-up events. Includes heavy-duty gloves, trash bags, tongs, and sorting containers.',
      guidelines: [
        'Available for registered clean-up events only',
        'Return all reusable items after the activity',
        'Consumables (bags, gloves) are provided as needed',
        'Coordinate with Eco Warriors at least 2 days before',
      ],
    },
  };

  function detailUrl(id) {
    return `resource-detail.html?id=${encodeURIComponent(id)}`;
  }

  function getResource(id) {
    return RESOURCES[id] || null;
  }

  global.UnityHubResources = {
    RESOURCES,
    detailUrl,
    getResource,
    defaultId: 'res-projector',
  };
})(typeof window !== 'undefined' ? window : globalThis);

