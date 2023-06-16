export const camelCaseToSnakeCase = (keyValue: string): string => {
  let regex = /\.?(?=[A-Z])/;
  return keyValue.split(regex).join('_').toLocaleLowerCase();
};
