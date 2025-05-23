'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

function MovieDetail() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const router = useRouter();
  const { slug } = router.query;
  // console.log(slug)

  useEffect(() => {
    const fetchMovie = async () => {
      if (!slug) return; // Wait until slug is defined
      setLoading(true);

      try {
        const res = await fetch(`/api/movie-details/${slug}`);
        console.log(res);
        const json = await res.json();
        console.log('API Response:', json);

        // Depending on your API structure
        setData(json);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No movie data available.</p>;

  return (
    <div className="p-6">
      <div className="flex flex-col bg-white rounded-xl text-black overflow-hidden">
        <div className="">
          <img className='w-full' src={process.env.NEXT_PUBLIC_API_IMAGE_PATH + data.backdrop_path} alt="" />
        </div>
        <div className="flex max-md:flex-col-reverse gap-8 p-4 ">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold">{data.title}</h1>
              <h1 className="">{data.tagline}</h1>
              <div className="flex items-center">
                <div className="font-semibold pr-2">{data.vote_average.toFixed(2) / 2} ({data.vote_count})</div>
                {[0, 1, 2, 3, 4].map((rating) => (
                  <div
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      (data.vote_average / 2) > (rating + 1) ? 'text-yellow-500' : 'text-gray-200',
                      'shrink-0',
                    )}
                  >
                    &#9733;
                  </div>
                ))}
              </div>
              <h1>Status: {data.status}</h1>
              <div className='flex divide-x-2 divide-gray-500'>
                <span className='px-3 first:pl-0'>
                  {data.release_date}
                </span>
                <span className='px-3'>
                  {data.popularity}
                </span>
              </div>
              <div className='flex flex-col font-semibold'>
                <span className=''>
                  Budget: {data.budget}
                </span>
                <span className=''>
                  Box office: ${data.revenue}
                </span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {data.genres.map((genre: any) => (
                <div className='rounded-full border-2 border-red-400 w-fit px-3 py-1' key={genre.id}>
                  {genre.name}
                </div>
              ))}
            </div>
            <p>{data.description || data.overview}</p>
            <a className='text-blue-500 w-fit' href={data.homepage} target="_blank" rel="noopener noreferrer">{"-->"} Homepage</a>
            <div></div>
          </div>
          <div className='overflow-hidden rounded-md h-fit'>
            <img src={process.env.NEXT_PUBLIC_API_IMAGE_PATH + data.poster_path} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
