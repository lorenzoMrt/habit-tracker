import { ProgressData } from '../types';
import { API_BASE_URL, handleApiError } from '../../../shared/utils/api';

export const fetchHabitProgress = async (startDate: Date, endDate: Date): Promise<ProgressData> => {
  try {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const response = await fetch(
      `${API_BASE_URL}/habits/progress?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      { method: 'GET' }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch habit progress');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching habit progress:', error);
    // Return empty progress data as fallback
    return {
      habits: [],
      startDate,
      endDate
    };
  }
}; 