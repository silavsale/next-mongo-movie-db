import Head from "next/head"
import React, { useEffect, useState } from "react"

export default function MovieDetails({}) {
  const uri = process.env.NEXT_PUBLIC_RAPID_API_KEY

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
      .then((response) => response.json())
      .then((data) => {
        let resData = data.results
        console.log("resData", resData)
        let results = resData.filter((result) => result.year !== undefined)
        setMovies(results)
      })
      .catch((error) => {
        console.log(error)
      })
    // let resData = await data.json()
    // resData = resData.results
  }, [query])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="flex-container">
        <div className="input-container">
          <h3>
            <span>[</span> Enter movie title <span>]</span>
          </h3>
          <input
            type="text"
            placeholder="TYPE MOVIE TITLE"
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="button" onClick={() => setQuery(inputText)}>
            <span>[</span> Search <span>]</span>
          </button>
        </div>
        <div className="movies-results-container">
          {movies &&
            movies.map((movie, index) => (
              <div className="movie" key={index}>
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
  )
}

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
