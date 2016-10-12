/**
 * JSON schema to accept an array of unique strings
 */
 export const arraySchema = {
   type: 'array',
   items: {
     type: 'string',
   },
   minItems: 1,
   uniqueItems: true,
 };

/**
 * Factory function to generate an object schema
 * with specified properties object
 */
 export const generateObjSchema = (properties = {}) => ({
   type: 'object',
   properties,
 });
