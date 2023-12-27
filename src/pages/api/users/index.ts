import type { APIRoute } from "astro";
import { z } from "zod";
import { SignupCommand } from "../../../lib/identityaccess/application";
import { default as dependencies } from "../../../config/dependencies.js"

const signupSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  emailAddress: z.string().email(),
  password: z.string().min(4).max(8),
});


export const POST: APIRoute = async ({request}) => {
  let response: Response
  try {
    const form = await request.formData();
    const entries = signupSchema.parse(form.entries())
    const command = SignupCommand.fromEntries(entries)
    await dependencies.handleSignup(command)
    response = new Response();
  } catch (error: any) {
    response = new Response(JSON.stringify(error.flatten()), {
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