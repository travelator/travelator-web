export const saveItinerary = (itinerary) => {
    saveToLocalStorage('itinerary', itinerary);
};

export const getItinerary = () => {
    return getFromLocalStorage('itinerary');
};

export const clearItinerary = () => {
    return localStorage.removeItem('itinerary');
};

export const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
};
