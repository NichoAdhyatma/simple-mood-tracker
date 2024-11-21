import { Cloud, CloudDrizzle, CloudLightning, CloudSun, Sun } from 'lucide-react';

export const getMoodIcon = (rating: number) => {
  const iconProps = { className: "h-6 w-6" };
  
  switch (rating) {
    case 1:
      return <CloudLightning {...iconProps} />;
    case 2:
      return <CloudDrizzle {...iconProps} />;
    case 3:
      return <Cloud {...iconProps} />;
    case 4:
      return <CloudSun {...iconProps} />;
    case 5:
      return <Sun {...iconProps} />;
    default:
      return null;
  }
};

export const getMoodColor = (rating: number) => {
  switch (rating) {
    case 1:
      return 'bg-red-500 hover:bg-red-600';
    case 2:
      return 'bg-orange-500 hover:bg-orange-600';
    case 3:
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 4:
      return 'bg-blue-500 hover:bg-blue-600';
    case 5:
      return 'bg-purple-500 hover:bg-purple-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};