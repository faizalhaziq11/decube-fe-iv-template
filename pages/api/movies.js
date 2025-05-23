export default async function handler(req, res) {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/3/movie/popular';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_BEARER_TOKEN,
    }
  });

  const data = await response.json();
  res.status(200).json(data);
}
