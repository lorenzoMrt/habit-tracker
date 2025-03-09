export const API_BASE_URL = 'http://localhost:8080';

export const handleApiError = (error: unknown, context: string): never => {
  console.error(`Error in ${context}:`, error);
  throw error;
};

export const createApiHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}; 