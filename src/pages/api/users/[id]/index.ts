import type { APIRoute } from "astro"

export const GET: APIRoute = ({request, params}) => {
  const id = params.id;
  return new Response(JSON.stringify({
    foo: id
  }))
}