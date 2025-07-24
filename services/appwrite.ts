// track the searches made by user

import { Client, Databases, ID, Query } from "react-native-appwrite";

// save movies 



const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_T_COLLECTION_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const SAVED_ID = process.env.EXPO_PUBLIC_APPWRITE_S_COLLECTION_ID!;

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)

const database = new Databases(client);

// update search count 
export const updateSearchCount = async (query: string, movie: Movie) => {

    // query


    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ])
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

            await database.createDocument(DATABASE_ID, COLLECTION_ID, movie.id.toString(), {
                searchTerm: query,
                title: movie.title,
                movie_id: movie.id,
                count: 1,
                poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.Co/600x400/1alala/ffffff.png'
            })
        }
        // console.log("successfully updated")
    } catch (err) {
        console.log(err);
        throw new Error('An error occured ' + err);

    }

}

// get trending movies 
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])
        return result.documents as unknown as TrendingMovie[]
    } catch (error) {
        console.log(error);
        return undefined;

    }
}


export const checkExisting = async (movie_id: string, user_id: string): Promise<boolean> => {

    const existing = await database.listDocuments(
        DATABASE_ID,
        SAVED_ID,
        [
            Query.equal("movie_id", parseInt(movie_id)),
            Query.equal("user_id", user_id),
        ]
    );

    return existing.documents.length > 0;
}


export const saveMovie = async (
    movie_id: string,
    user_id: string,
    title: string | undefined,
    poster_url: string | null | undefined
) => {
    try {
        // Step 1: Check if this user already saved this movie
        const existing = await database.listDocuments(
            DATABASE_ID,
            SAVED_ID,
            [
                Query.equal("movie_id", parseInt(movie_id)),
                Query.equal("user_id", user_id),
            ]
        );


        if (existing.documents.length > 0) {
            // Step 2: Delete the existing document (toggle off)
            await database.deleteDocument(
                DATABASE_ID,
                SAVED_ID,
                existing.documents[0].$id
            );
            // console.log("Deleted");
        } else {
            // Step 3: Save the movie (toggle on)
            await database.createDocument(
                DATABASE_ID,
                SAVED_ID,

                ID.unique(),
                {
                    movie_id: parseInt(movie_id),
                    user_id,
                    title,
                    poster_url: poster_url
                        ? `https://image.tmdb.org/t/p/w500${poster_url}`
                        : "https://placehold.co/600x400/1alala/ffffff.png",
                }
            );

            // console.log("Saved");
        }
    } catch (error: any) {
        console.error("Error in saveMovie:", error.message || error);
    }
};


// get saved movies

export const getSavedMovies = async (userId: string): Promise<savedMovie[] | undefined> => {

    try {

        const result = await database.listDocuments(
            DATABASE_ID,
            SAVED_ID.toString(),
            [
                Query.equal('user_id', userId || '')
            ]
        )
        return result.documents as unknown as savedMovie[];
    }
    catch (err) {
        console.log(err);
        return undefined;
    }


}