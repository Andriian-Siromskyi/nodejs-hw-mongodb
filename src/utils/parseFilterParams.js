const parseType = (contactType) => {
  if (typeof contactType !== 'string') return null;

  return ['work', 'home', 'personal'].includes(contactType)
    ? contactType
    : null;
};

const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;

  return;
};

export const parseFilterParams = (query) => {
  console.log(query);
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
