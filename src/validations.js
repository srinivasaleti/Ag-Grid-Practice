export const Validations = (key) => {
  return {
    isNumber: (value) => {
      if (!/^\d+$/.test(value)) {
        return `${key} should be number`;
      }
    },
    isRequired: (val) => {
      if (!(val != undefined && val != null && val != "")) {
        return `${key} is required`;
      }
    },
    minLen:
      (len) =>
      (val = "") => {
        if (val.length < len) {
          return `${key} length should be minimum of ${len} characters`;
        }
      },
  };
};
