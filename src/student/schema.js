import { Validations } from "../validations";

export const StudentSchema = {
  name: [
    {
      //Kept it in object for maintaining extra info like custom message
      validate: Validations("Model").minLen(3),
    },
    {
      validate: Validations("Model").isRequired,
    },
  ],
  branch: [
    {
      validate: Validations("Branch").isRequired,
    },
  ],
  age: [
    {
      validate: Validations("Age").isRequired,
    },
  ],
  dob: [
    {
      validate: Validations("DOB").isRequired,
    },
  ],
};

export const validateSchema = (data, schema) => {
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
