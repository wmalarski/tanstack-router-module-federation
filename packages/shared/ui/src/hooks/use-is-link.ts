import { useMemo } from "react";
import * as v from "valibot";

export const useIsLink = (text: string) => {
  return useMemo(
    () => v.safeParse(v.pipe(v.string(), v.url()), text).success,
    [text],
  );
};
