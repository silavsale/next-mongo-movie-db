import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

export default function MovieDetails({}) {
  const uri = process.env.NEXT_PUBLIC_RAPID_API_KEY

  const router = useRouter()
  const movieID = router.query.movie_id
  const [movies, setMovies] = useState([])
  const [inputText, setInputText] = useState("")
  const [query, setQuery] = useState("")

  useEffect(async () => {
    const data = await fetch(
      `https://imdb8.p.rapidapi.com/title/find?q=${query}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key": uri,
        },
      }
    )
    let resData = await data.json()
    resData = resData.results
    console.log(resData.results)
    let results = resData.filter((result) => result.year !== undefined)
    setMovies(results)
    console.log(results)
    console.log("query", query)
  }, [query])

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
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter new ID"
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={() => setQuery(inputText)}>Save</button>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap my-16">
            {movies &&
              movies.map((movie, index) => (
                <div className="w-1/4 p-16 border border-black" key={index}>
                  <h2>{movie.title}</h2>
                  <p>Releace Date: {movie.year}</p>
                  <img
                    className="poster"
                    src={movie.image?.url}
                    alt={movie.title}
                  ></img>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap my-16">
          {/* <img src={movie.poster} alt={movie.title} /> */}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
