export const replaceCssVariables = (variables) => {
  return {
    name: "vite:replace-lodash",
    transform(code, id) {
      const shouldSkip = !/\.css$/.test(id);

      if (shouldSkip) {
        return null;
      }

      const updatedCode = Object.entries(variables).reduce(
        (code, [variable, newValue]) => {
          const regexp = new RegExp(`${variable}: (.*);`, "g");
          return code.replace(regexp, `${variable}: ${newValue};`);
        },
        code,
      );

      return { code: updatedCode, map: null };
    },
  };
};
