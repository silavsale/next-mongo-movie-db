import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function MovieDetails({}) {
  const router = useRouter()
  const movieID = router.query.movie_id
  const [movie, setMovie] = useState(0)

  useEffect(async () => {
    const data = await fetch(
      `http://localhost:3000/api/moviedetails?movie_id=${movieID}`
    )
    const result = await data.json()
    setMovie(result)
  }, [])

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
        <h1 className="bg-olive-500">Movie Details For: {movie.title}</h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap my-16">
          <img src={movie.poster} alt={movie.title} />
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
