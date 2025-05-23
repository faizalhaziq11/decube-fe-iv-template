'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Card from './Card';

function MovieList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const res = await fetch('/api/movies/');
        const data = await res.json();

        setData(data.results);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!input) return data;

    return data.filter((movie: any) =>
      movie.title.toLowerCase().includes(input.toLowerCase()) || movie.id.toString().toLowerCase().includes(input.toLowerCase())
    );
  }, [data, input]);

  const displayMovies = filteredData.map((movie: any) => (
    <Card
      key={movie.id}
      id={movie.id}
      title={movie.title}
      body={movie.overview}
      img={movie.poster_path}
    />
  ))

  const searchHandler = useCallback(
    (inputData: any) => {
      setInput(inputData.target.value);
    },
    [input]
  );

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data was found</p>;
  if (!data || data.length === 0) return <p>No data was found</p>;

  return (
    <div className="flex justify-center flex-col gap-4">
      <div className='flex justify-between max-md:flex-col'>
        <h1 className='text-2xl font-bold'>Popular Movie list</h1>
        <input type="text" placeholder="Movie's name, ID" className='px-4 py-1.5 rounded-md text-black' onChange={searchHandler} />
      </div>

      <div className='flex flex-wrap gap-4 justify-center'>
        {/* {data?.map((movie: any) => (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            body={movie.overview}
            img={movie.poster_path}
          />
        ))} */}
        {displayMovies}
      </div>
    </div>
  );
}

export default MovieList;
