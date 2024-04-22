// @ts-nocheck

import { $ } from "bun";
import path from "path";

const generateLocation = path.resolve(
  import.meta.path,
  "../../utils/supabase/types.ts"
);

await $`supabase gen types typescript --project-id ${Bun.env.PROJECT_REF} --schema public > ${generateLocation}`;
