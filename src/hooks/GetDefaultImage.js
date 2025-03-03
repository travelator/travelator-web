import AdventureImage from '../assets/static_backup_images/AdventureImage.jpg';
import CultureImage from '../assets/static_backup_images/CultureImage.jpg';
import EntertainmentImage from '../assets/static_backup_images/EntertainmentImage.jpg';
import FamilyImage from '../assets/static_backup_images/FamilyImage.jpg';
import FoodAndDrinkImage from '../assets/static_backup_images/FoodAndDrinkImage.jpg';
import NatureImage from '../assets/static_backup_images/NatureImage.jpg';
import NightlifeImage from '../assets/static_backup_images/NightlifeImage.jpg';
import RelaxationImage from '../assets/static_backup_images/RelaxationImage.jpg';
import ShoppingImage from '../assets/static_backup_images/ShoppingImage.jpg';
import SportsImage from '../assets/static_backup_images/SportsImage.jpg';
import UniqueImage from '../assets/static_backup_images/UniqueImage.jpg';

const mapping = {
    Adventure: AdventureImage,
    Culture: CultureImage,
    Entertainment: EntertainmentImage,
    Family: FamilyImage,
    'Food and drink': FoodAndDrinkImage,
    Nature: NatureImage,
    Nightlife: NightlifeImage,
    Relaxation: RelaxationImage,
    Shopping: ShoppingImage,
    Sports: SportsImage,
    Unique: UniqueImage,
    default: UniqueImage,
};

export const getDefaultImage = (key) => {
    if (!mapping[key]) {
        return mapping['default'];
    }
    return mapping[key];
};
