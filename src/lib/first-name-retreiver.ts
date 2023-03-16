function retreiveFirstName(fullName: string): string {
  if (!fullName.includes(' ')) {
    return fullName;
  }

  const nameParts = fullName.split(' ');

  return nameParts[0];
}

export default retreiveFirstName;
