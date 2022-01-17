import Head from "next/head"
import clientPromise from "../lib/mongodb"

export default function Movie({ movies }) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="container">
        <h1 className="bg-green-500">This is the Movies page</h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap my-16">
          {movies &&
            movies.map((movie, index) => (
              <div className="w-1/4 p-16 border border-black" key={index}>
                <h2>{movie.title}</h2>
                <p>Releace Date: {movie.year}</p>
                <p>IMDB Rating: {movie.imdb.rating}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const client = await clientPromise
  const db = client.db("sample_mflix")
  const data = await db
    .collection("movies")
    .find({ year: 2011, "imdb.rating": { $gt: 8 } })
    .limit(20)
    .toArray()

  const movies = JSON.parse(JSON.stringify(data))

  return {
    props: { movies },
  }
}
