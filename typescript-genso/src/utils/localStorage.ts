 
// Set data in localStorage
export const setLocalStorageData = <T>(key: string, data: T): void => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error('Error setting data in localStorage:', error);
    }
  };
  
  // Get data from localStorage
  export const getLocalStorageData = <T>(key: string): T | null => {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData) {
        return JSON.parse(serializedData) as T;
      }
    } catch (error) {
      console.error('Error getting data from localStorage:', error);
    }
  
    return null;
  };
  