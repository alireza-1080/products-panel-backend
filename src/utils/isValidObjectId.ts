const pattern = /^[0-9a-fA-F]{24}$/;

const isValidObjectId = (id: string) => {
  if (!pattern.test(id)) {
    return false;
  }
  return true;
};

export { isValidObjectId };
