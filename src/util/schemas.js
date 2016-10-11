/**
 * JSON schema to accept either a string or array of strings
 * specifying a list of custom component names to map to DOM elements.
 */
 const componentListSchema = {
   oneOf: [
    { type: 'string' },
     {
       type: 'array',
       items: {
         type: 'string',
       },
       minItems: 1,
       uniqueItems: true,
     },
   ],
 };

/**
 * JSON schema to accept either an array of strings
 * specifying a list of custom prop names to map to DOM attributes.
 */
 const propListSchema = {
   type: 'array',
   items: {
     type: 'string',
   },
   minItems: 1,
   uniqueItems: true,
 };

 /**
  * JSON schema to accept an object that really does nothing.
  */
 export const noSchema = () => ({
   type: 'object',
 });

 /**
  * JSON schema to accept an object with components properties.
  */
 export const componentSchema = (key = 'components') => ({
   type: 'object',
   properties: {
     [key]: componentListSchema,
   },
 });

 /**
  * JSON schema to accept an object with props properties.
  */
 export const propSchema = (key = 'props') => ({
   type: 'object',
   properties: {
     [key]: propListSchema,
   },
 });

/**
 * JSON schema to accept an object with components and props properties
 * that have the schemas defined above.
 */
 export const componentAndPropSchema = ({ componentsKey = 'components', propsKey = 'props' } = {}) => ({
   type: 'object',
   properties: {
     [componentsKey]: componentListSchema,
     [propsKey]: propListSchema,
   },
 });
