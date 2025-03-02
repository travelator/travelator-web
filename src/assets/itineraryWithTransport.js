export const TransportItinerary = [
    {
        title: 'Breakfast at The Breakfast Club',
        transport: false,
        latitude: 51.5136,
        longitude: -0.1365,
        start: '08:00',
        end: '09:00',
        description:
            'Begin your day at The Breakfast Club, Soho located on Lexington Street in the heart of London. Enjoy a traditional English breakfast with freshly baked scones and locally roasted coffee. The cozy atmosphere and friendly service set the perfect tone for your day of exploration.',
        price: 12,
        theme: 'Food and drink',
        requires_booking: false,
        booking_url: '',
        image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: 60,
        id: 1,
        url: [
            'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600',
        ], // Add url property
    },
    {
        title: 'Tube to Buckingham Palace',
        transport: true,
        start: '09:00',
        end: '09:30',
        description:
            'After finishing breakfast, exit The Breakfast Club and walk to Tottenham Court Road Underground Station. Board the Northern Line northbound to Leicester Square, then switch to the Piccadilly Line for a quick ride to Green Park Station. Exit at Green Park, and walk south along The Mall for approximately 7 minutes until you arrive at Buckingham Palace.',
        price: 3,
        theme: 'Tube',
        transportMode: 'Tube',
        requires_booking: false,
        booking_url: '',
        image: '',
        duration: 30,
        id: 2,
        url: [], // Add url property
    },
    {
        title: 'Changing of the Guard',
        transport: false,
        latitude: 51.5014,
        longitude: -0.1419,
        start: '09:30',
        end: '11:00',
        description:
            'Arrive at Buckingham Palace, located on the historic Mall in central London. Watch the meticulously timed Changing of the Guard ceremony where soldiers in traditional red tunics perform their duties with precision. Enjoy the regal ambiance and impressive architecture as you witness this iconic British tradition up close.',
        price: 0,
        theme: 'Culture',
        requires_booking: false,
        booking_url: '',
        image: 'https://images.pexels.com/photos/1059078/pexels-photo-1059078.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: 90,
        id: 3,
        url: [
            'https://images.pexels.com/photos/1059078/pexels-photo-1059078.jpeg?auto=compress&cs=tinysrgb&w=600',
        ], // Add url property
    },
    {
        title: 'Walk to British Museum',
        transport: true,
        start: '11:00',
        end: '11:15',
        description:
            "After the ceremony at Buckingham Palace, exit the palace grounds and head towards St. James's Park via the designated pedestrian path. Follow the park’s scenic route until you reach the northeast exit. Then turn right onto Great Russell Street and walk for about 10 minutes until you arrive at the British Museum.",
        price: 0,
        theme: 'Walking',
        transportMode: 'Walking',
        requires_booking: false,
        booking_url: '',
        image: '',
        duration: 15,
        id: 4,
        url: [], // Add url property
    },
    {
        title: 'Explore the British Museum',
        transport: false,
        latitude: 51.5194,
        longitude: -0.127,
        start: '11:15',
        end: '13:00',
        description:
            'Visit the British Museum located at Great Russell Street in Bloomsbury, London. Explore extensive collections of artifacts ranging from ancient Egyptian relics to classical Greek sculptures. Immerse yourself in centuries of history as you navigate through the museum’s well-curated galleries.',
        price: 0,
        theme: 'Culture',
        requires_booking: false,
        booking_url: '',
        image: 'https://images.pexels.com/photos/69903/pexels-photo-69903.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: 105,
        id: 5,
        url: [
            'https://images.pexels.com/photos/69903/pexels-photo-69903.jpeg?auto=compress&cs=tinysrgb&w=600',
        ], // Add url property
    },
    {
        title: 'Lunch at Dishoom',
        transport: false,
        latitude: 51.5122,
        longitude: -0.1277,
        start: '13:00',
        end: '14:00',
        description:
            "Dine at Dishoom Covent Garden, located at 12 Upper St Martin's Lane, London, renowned for its Bombay-inspired cuisine. Enjoy an array of flavorful dishes in a stylish setting that evokes the ambiance of old Irani cafés. The vibrant decor and warm hospitality promise a memorable culinary experience.",
        price: 20,
        theme: 'Food and drink',
        requires_booking: false,
        booking_url: '',
        image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: 60,
        id: 6,
        url: [
            'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=600',
        ], // Add url property
    },
    {
        title: 'Visit Tate Modern',
        transport: false,
        latitude: 51.5076,
        longitude: -0.0994,
        start: '16:15',
        end: '18:00',
        description:
            'Explore the contemporary art collections at Tate Modern, located on Bankside in London. Immerse yourself in innovative exhibitions and thought-provoking installations housed in a converted power station. Enjoy stunning views of the River Thames and a dynamic cultural experience within its expansive galleries.',
        price: 0,
        theme: 'Culture',
        requires_booking: false,
        booking_url: '',
        image: 'https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: 105,
        id: 9,
        url: [
            'https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=600',
        ], // Add url property
    },
];
