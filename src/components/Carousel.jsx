import Carousel from 'react-multi-carousel';
import PropTypes from 'prop-types';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 3000, min: 1400 },
        items: 4,
        slidesToSlide: 4,
    },
    desktop: {
        breakpoint: { max: 1400, min: 1024 },
        items: 3,
        slidesToSlide: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 550 },
        items: 2,
        slidesToSlide: 2,
    },
    mobile: {
        breakpoint: { max: 550, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};

function CustomCarousel({ children, deviceType }) {
    return (
        <Carousel
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            keyBoardControl={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            deviceType={deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item"
        >
            {children}
        </Carousel>
    );
}

CustomCarousel.propTypes = {
    children: PropTypes.node.isRequired,
    deviceType: PropTypes.string,
};

export default CustomCarousel;
