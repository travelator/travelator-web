import { describe, it, expect } from 'vitest';
import { getDefaultImage } from '../../hooks/GetDefaultImage';
import AdventureImage from '../../assets/static_backup_images/AdventureImage.jpg';
import CultureImage from '../../assets/static_backup_images/CultureImage.jpg';
import UniqueImage from '../../assets/static_backup_images/UniqueImage.jpg';

describe('getDefaultImage', () => {
    it('should return the correct image for a valid key', () => {
        expect(getDefaultImage('Adventure')).toBe(AdventureImage);
        expect(getDefaultImage('Culture')).toBe(CultureImage);
    });

    it('should return the default image for an invalid key', () => {
        expect(getDefaultImage('InvalidKey')).toBe(UniqueImage);
    });

    it('should return the default image when no key is provided', () => {
        expect(getDefaultImage()).toBe(UniqueImage);
    });
});
