// target graphql endpoint
const OMNIVORE_HOST = "https://api-prod.omnivore.app/api/graphql";

export async function POST(request: Request) {
  const requestText = await request.text();

  const response = await fetch(OMNIVORE_HOST, {
    method: "POST",
    body: requestText,
    headers: {
      authorization: request.headers.get("authorization") || "",
      "Content-Type": "application/json",
    },
  });

  return new Response(response.body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
