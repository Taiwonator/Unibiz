const embellishPathname = (query: any, pathname: string): string => {
  let embellishedPathname = pathname;
  for (const [key, value] of Object.entries(query)) {
    const searchKey = `[${key}]`;
    if (pathname.includes(searchKey)) {
      embellishedPathname = pathname.replace(searchKey, value as string);
    }
  }
  return embellishedPathname;
};

export default embellishPathname;
