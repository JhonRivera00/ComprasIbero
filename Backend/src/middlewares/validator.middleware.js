
export const validateSchema = (schema) => async (data) => {
    try {
      
      schema.parse(data);
      return null; 
    } catch (error) {
      
      throw error;
    }
  };