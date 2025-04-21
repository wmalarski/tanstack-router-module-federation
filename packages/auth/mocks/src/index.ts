import { randEmail, randPastDate, randUuid } from "@ngneat/falso";
import type { User } from "@supabase/supabase-js";

export const createMockUser = (update: Partial<User> = {}): User => {
  return {
    app_metadata: {},
    aud: "user",
    created_at: randPastDate().toISOString(),
    email: randEmail(),
    id: randUuid(),
    user_metadata: {},
    ...update,
  };
};
