export default async function handler(req, res) {
  const { id } = req.query;
  console.log('🔥 Received movie ID:', id);

  if (!id) {
    return res.status(400).json({ error: 'Movie ID is required' });
  }

  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/3/movie/${id}?language=en-US`;
  const option = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_BEARER_TOKEN,
      },
    }
    
    try {
      const response = await fetch(url, option );

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error: 'Failed to fetch movie data', detail: error });
    }

    const data = await response.json();
    return res.status(200).json(data);


  } catch (err) {
    console.error('API fetch error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
  // const { id } = req.query;

  // if (!id) {
  //   return res.status(400).json({ error: 'Missing movie ID' });
  // }

  // res.status(200).json({ movieId: id, status: 'Working!' });
}
