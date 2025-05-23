import React from "react";
import Link from 'next/link'

const Card = (props: any) => {
  return (
    <div className="w-60 md:w-56 xl:w-72 w-bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        <div className="absolute bottom-3 right-3 rounded-full bg-indigo-900 bg-opacity-75 px-4 py-1">
          <p className="text-xs text-white font-bold">News</p>
        </div>
        <img className="rounded-t-lg h-80 w-full" src={process.env.NEXT_PUBLIC_API_IMAGE_PATH + props.img} alt="" />
      </div>
      <div className="p-5 grid grid-cols-subgrid">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
          {props.title ? props.title : ""}
        </h5>
        <p className="mb-3 font-medium text-gray-500 dark:text-gray-400 truncate">
          {props.body ? props.body : ""}
        </p>
        <Link
          href={{ pathname: `movie/${props.id}`, query: { id: props.id }, }}
        >
          <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;