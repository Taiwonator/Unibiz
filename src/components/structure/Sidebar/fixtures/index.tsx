import { ReactNode } from 'react';
import {
  FaGraduationCap,
  FaHome,
  FaHospital,
  FaHubspot,
  FaSpaceShuttle,
  FaTag,
} from 'react-icons/fa';

export interface MenuItemType {
  label: string;
  Icon: ReactNode;
  active: boolean;
}

export const defaultUserItems: MenuItemType[] = [
  {
    label: 'Home',
    Icon: <FaHome />,
    active: false,
  },
  {
    label: 'Events',
    Icon: <FaTag />,
    active: true,
  },
  {
    label: 'Hub',
    Icon: <FaHubspot />,
    active: false,
  },
  {
    label: 'Space',
    Icon: <FaSpaceShuttle />,
    active: false,
  },
  {
    label: 'Student Union',
    Icon: <FaGraduationCap />,
    active: false,
  },
  {
    label: 'Health Check',
    Icon: <FaHospital />,
    active: false,
  },
];
