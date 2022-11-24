import { Validations } from "../validations";

export const CarSchema = {
  model: [
    {
      //Kept it in object for maintaining extra info like custom message
      validate: Validations("Model").minLen(3),
    },
    {
      validate: Validations("Model").isRequired,
    },
  ],
  price: [
    {
      validate: Validations("Price").isNumber,
    },
    {
      validate: Validations("Price").isRequired,
    },
  ],
  release: [
    {
      validate: Validations("Release").isRequired,
    },
  ],
};

export const validateCarSchema = (data, schema) => {
  const schemaKeys = Object.keys(schema);

  for (const key of schemaKeys) {
    const validations = schema[key];
    for (const validation of validations) {
      const error = validation.validate(data[key]);
      if (error) {
        return error;
      }
    }
  }

  return null;
};
