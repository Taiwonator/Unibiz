type ResolvePageTitle = (path: string) => string;

const resolvePageTitle: ResolvePageTitle = (path) => {
  if (path[0] === '/') path = path.slice(1);
  const map: Record<string, string> = {
    '': 'Home',
    events: 'Events',
    'events/test': 'Create an Event',

    hub: 'Hub',
    space: 'Space',
    union: 'Student Union',
    health: 'Health Check',
  };
  return map[path];
};

export default resolvePageTitle;
