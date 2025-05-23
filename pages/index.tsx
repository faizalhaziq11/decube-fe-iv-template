import MovieList from "@/components/MovieList";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

const inter = Inter({ subsets: ["latin"] });
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function Home() {


  return (
    <main
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-24 gap-4",
        inter.className
      )}
    >
      <Image
        src="https://i.giphy.com/l3BwSPbqx3QGKEgpp2.webp"
        alt="Gif"
        width={400}
        height={400}
      />
      <p>You can start your project here. Good luck!</p>
      <Link className="text-red-500 hover:text-red-300 transition-colors" href={'/movies'}>Click here to see popular movie list</Link>
    </main>
  );
}

