export const handleHeaderAuth = async (fn: () => Promise<string>): Promise<string> => {
  return await fn();
};
