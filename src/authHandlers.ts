export const handleHeaderAuth = async (fn: HeaderAuthHandler): Promise<string> => {
  return await fn();
};
