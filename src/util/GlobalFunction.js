import { record } from "./prompt.js";

export const validNumber = (
  numberValue,
  limit = null,
  fieldName,
  objetName
) => {
  const number = Number(numberValue);
  if (
    !numberValue ||
    numberValue < 0 ||
    isNaN(number) ||
    ((limit || limit == 0) && limit < numberValue)
  ) {
    throw new Error(
      `Field "${fieldName || ""}" ${
        objetName ? "in object named" + objetName : ""
      } is invalid. `
    );
  }

  return number;
};

export const getNumberValue = async (unit) => {
  return await record(`Enter a number value (${unit}): `);
};
