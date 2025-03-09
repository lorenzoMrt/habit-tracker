import { Habit, NewHabitInput } from '../types';
import { API_BASE_URL, createApiHeaders, handleApiError } from '../../../shared/utils/api';

export const fetchHabits = async (): Promise<Habit[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/habits`, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Failed to fetch habits');
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error, 'fetchHabits');
  }
};

export const createHabit = async (newHabit: NewHabitInput): Promise<Habit> => {
  try {
    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: 'POST',
      headers: createApiHeaders(),
      body: JSON.stringify(newHabit),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create habit');
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, 'createHabit');
  }
};

export const completeHabit = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/habits/${id}/complete`, {
      method: 'PUT',
    });
    
    if (!response.ok) {
      throw new Error('Failed to complete habit');
    }
  } catch (error) {
    handleApiError(error, 'completeHabit');
  }
}; 