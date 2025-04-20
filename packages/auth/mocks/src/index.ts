import type { User } from "@supabase/supabase-js";
import { randEmail, randUuid, randPastDate } from "@ngneat/falso";

export const createMockUser = (update: Partial<User> = {}): User => {
  return {
    app_metadata: {},
    aud: "user",
    created_at: randPastDate().toISOString(),
    id: randUuid(),
    user_metadata: {},
    email: randEmail(),
    ...update,
  };
};
