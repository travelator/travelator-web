import { preset_itinerary } from './itinerary';
export const mockTrips = [
    {
        id: 1,
        city: "London",
        customName: "Weekend in London",
        dateCreated: "2024-03-20",
        timeOfDay: ["morning", "afternoon", "evening"],
        group: "family",
        itinerary: preset_itinerary
    },
    {
        id: 2,
        city: "Paris",
        customName: null,
        dateCreated: "2024-03-15",
        timeOfDay: ["afternoon", "evening"],
        group: "couples",
        itinerary: preset_itinerary
    },
    {
        id: 3,
        city: "Rome",
        customName: "Italian Adventure",
        dateCreated: "2024-03-10",
        timeOfDay: ["morning", "afternoon"],
        group: "friends",
        itinerary: preset_itinerary
    }
]; 