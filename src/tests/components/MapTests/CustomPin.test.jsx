import { describe, it, expect } from 'vitest';
import createCustomPin from '../../../components/Map/CustomPin';
import L from 'leaflet';

describe('createCustomPin', () => {
    it('creates a custom pin with default settings', () => {
        const pin = createCustomPin();
        expect(pin).toBeInstanceOf(L.DivIcon);
        expect(pin.options.html).toContain('📍');
        expect(pin.options.html).toContain('border: 3px solid black');
    });

    it('creates a custom pin with highlighted settings', () => {
        const pin = createCustomPin(true);
        expect(pin).toBeInstanceOf(L.DivIcon);
        expect(pin.options.html).toContain('📍');
        expect(pin.options.html).toContain('border: 6px solid black');
    });
});
