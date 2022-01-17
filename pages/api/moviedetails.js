import clientPromise from "../../lib/mongodb"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {
  const query = req.query.movie_id
  const client = await clientPromise
  const db = client.db("sample_mflix")

  const data = await db
    .collection("movies")
    .findOne({ _id: new ObjectId(query) })

  res.json(data)
}
