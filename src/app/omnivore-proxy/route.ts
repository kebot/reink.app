// target graphql endpoint
const OMNIVORE_HOST = "https://api-prod.omnivore.app/api/graphql";
const OMNIVORE_API_KEY = "8fade3b3-b50e-48fd-b3f2-0c78eef7c2e0";

export async function POST(request: Request) {
  const requestText = await request.text()

  const response = await fetch(OMNIVORE_HOST, {
    method: 'POST',
    body: requestText,
    headers: {
      authorization: OMNIVORE_API_KEY,
      'Content-Type': 'application/json'
    },
  })

  return Response.json(await response.json())
}
