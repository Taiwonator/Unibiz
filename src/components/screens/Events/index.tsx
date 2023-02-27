import ScreenButton from '@components/primitive/ScreenButton';
import { FaPlus } from 'react-icons/fa';

const Events: React.FC = () => {
  return (
    <div className="h-full">
      <ScreenButton>
        <FaPlus />
        Create Your First Event
      </ScreenButton>
    </div>
  );
};

export default Events;
