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
  link: string;
}

export const defaultUserItems: MenuItemType[] = [
  {
    label: 'Home',
    Icon: <FaHome />,
    active: false,
    link: '/',
  },
  {
    label: 'Events',
    Icon: <FaTag />,
    active: true,
    link: '/events',
  },
  {
    label: 'Hub',
    Icon: <FaHubspot />,
    active: false,
    link: '/hub',
  },
  {
    label: 'Space',
    Icon: <FaSpaceShuttle />,
    active: false,
    link: '/space',
  },
  {
    label: 'Student Union + Forum',
    Icon: <FaGraduationCap />,
    active: false,
    link: '/student-union',
  },
  {
    label: 'Health Check',
    Icon: <FaHospital />,
    active: false,
    link: '/health-checl',
  },
];
