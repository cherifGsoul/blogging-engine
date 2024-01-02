import type { APIRoute } from "astro";
import { z } from "zod";
import { SignupCommand } from "../../../lib/identityaccess/index.js";
import { default as dependencies } from "../../../config/dependencies.js"

const signupSchema = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  emailAddress: z.string().email(),
  emailAddressConfirmation: z.string().email(),
  password: z.string().min(4).max(8),
}).superRefine((data: any, ctx) => {
  if (data.emailAddressConfirmation !== data.emailAddress) {
    ctx.addIssue({
      code: "custom",
      message: "The email addresses did not match"
    });
  }
});

export const POST: APIRoute = async ({request}) => {
  let response: Response
  const form = await request.formData();
  const entries = Object.fromEntries(form.entries())
  try {
    const parsed = signupSchema.parse(entries);
    const command: SignupCommand.SignupCommand = SignupCommand.fromEntries(parsed); 
    await dependencies.handleSignup(command)
    response = new Response(null, {status: 201});
  } catch (error: any) {
    response = new Response(JSON.stringify({
      entries,
      errors: error.flatten()
    }), {
      status: 422,
      statusText: "Unprocessable Content"
    })
  }

  return response
}

export const GET: APIRoute = ({request}) => {
  return new Response(JSON.stringify({
    foo: "bar"
  }))
}