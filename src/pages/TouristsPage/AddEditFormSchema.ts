import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  location: z.string(),
  email: z.string().min(2).max(50),
});

export default formSchema;
