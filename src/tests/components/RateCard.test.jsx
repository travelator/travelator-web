import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RateCard from '../../components/RateCard/RateCard';

describe('RateCard Component Tests', () => {
    const mockProps = {
        title: 'Test Activity',
        description: 'Test Description',
        price: 10,
        theme: 'Adventure',
        url: ['test-image1.jpg', 'test-image2.jpg'],
        onCardClick: vi.fn(),
    };

    it('should render with provided props', () => {
        render(<RateCard {...mockProps} />);

        expect(screen.getByText(mockProps.title)).toBeInTheDocument();
        expect(screen.getByText(mockProps.description)).toBeInTheDocument();
        expect(screen.getByText(`£${mockProps.price}`)).toBeInTheDocument();
        expect(screen.getByText(mockProps.theme)).toBeInTheDocument();
        expect(screen.getByAltText(mockProps.title)).toHaveAttribute(
            'src',
            mockProps.url[0]
        );
    });

    it('should render like and dislike icons', () => {
        render(<RateCard {...mockProps} />);

        const likeIcon = screen.getByTestId('FavoriteIcon');
        const dislikeIcon = screen.getByTestId('CloseIcon');

        expect(likeIcon).toBeInTheDocument();
        expect(dislikeIcon).toBeInTheDocument();
    });

    it('should call onCardClick with true when like icon is clicked', () => {
        render(<RateCard {...mockProps} />);

        const likeIcon = screen.getByTestId('FavoriteIcon');
        fireEvent.click(likeIcon);

        expect(mockProps.onCardClick).toHaveBeenCalledWith(
            mockProps.title,
            true
        );
    });

    it('should call onCardClick with false when dislike icon is clicked', () => {
        render(<RateCard {...mockProps} />);

        const dislikeIcon = screen.getByTestId('CloseIcon');
        fireEvent.click(dislikeIcon);

        expect(mockProps.onCardClick).toHaveBeenCalledWith(
            mockProps.title,
            false
        );
    });

    it('should try the next image in the list if the current image fails to load', () => {
        render(<RateCard {...mockProps} />);

        const image = screen.getByAltText(mockProps.title);
        fireEvent.error(image);

        expect(image).toHaveAttribute('src', mockProps.url[1]);
    });
});
