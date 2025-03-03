// src/components/Map/CustomPin.jsx
import L from 'leaflet';

const createCustomPin = (isHighlighted = false) => {
    return L.divIcon({
        className: 'custom-pin',
        html: `<div style="
      width: 25px;
      height: 25px;
      background: #FBBC04;
      color: #000;
      border: ${isHighlighted ? '6px' : '3px'} solid black;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      transition: border 0.3s ease-in-out;
    ">
      📍
    </div>`,
        iconSize: [25, 25],
        iconAnchor: [12, 25],
    });
};

export default createCustomPin;
