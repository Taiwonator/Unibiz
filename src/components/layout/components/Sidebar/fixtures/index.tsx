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
    link: '/society',
  },
  {
    label: 'Events',
    Icon: <FaTag />,
    active: true,
    link: '/society/events',
  },
  {
    label: 'Hub',
    Icon: <FaHubspot />,
    active: false,
    link: '/society/hub',
  },
  {
    label: 'Space',
    Icon: <FaSpaceShuttle />,
    active: false,
    link: '/society/space',
  },
  {
    label: 'Student Union + Forum',
    Icon: <FaGraduationCap />,
    active: false,
    link: '/society/union',
  },
  {
    label: 'Health Check',
    Icon: <FaHospital />,
    active: false,
    link: '/society/health',
  },
];

export const unionUserItems: MenuItemType[] = [
  {
    label: 'Home',
    Icon: <FaHome />,
    active: false,
    link: '/union',
  },
  {
    label: 'Student Union + Forum',
    Icon: <FaGraduationCap />,
    active: false,
    link: '/union/hub',
  },
];
