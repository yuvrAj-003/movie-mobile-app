// track the searches made by user

import { Client, Databases, Query } from "react-native-appwrite";
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;


const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {

    // query
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)
    ])

    try {
        // check if a record already been stored
        if (result?.documents?.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )

        }
        // store the record if not stored
        else {

            await database.createDocument(DATABASE_ID, COLLECTION_ID, "unique()", {
                searchTerm: query,
                title: movie.title,
                movie_id: movie.id,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
        console.log("successfully updated")
    } catch (error) {
        console.log(error)

    }

}