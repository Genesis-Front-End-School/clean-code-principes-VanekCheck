const StorageService = {
  getValue: (property: string) => {
    const storageValue = localStorage.getItem(property);
    const value = storageValue ? JSON.parse(storageValue) : null;
    return value;
  },
  setValue: (property: string, value: unknown) => {
    localStorage.setItem(property, JSON.stringify(value));
  },
  removeValue: (property: string) => {
    localStorage.removeItem(property);
  },
};

export { StorageService };
