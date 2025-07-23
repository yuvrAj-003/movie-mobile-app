// track the searches made by user

import { Client, Databases, Query } from "react-native-appwrite";

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
        console.log("successfully updated")
    } catch (error) {
        console.log(error)

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

// save movies 

export const saveMovie = async (
    movie_id: string,
    user_id: string,
    title: string | undefined,
    poster_url: string | null | undefined
) => {
    try {
        // try deleting first
        await database.deleteDocument(
            DATABASE_ID,
            SAVED_ID.toString(),
            movie_id
        );
        console.log('Deleted');
    } catch (error: any) {
        if (error.code === 404) {
            try {
                await database.createDocument(
                    DATABASE_ID,
                    SAVED_ID.toString(),
                    movie_id,
                    {
                        movie_id: parseInt(movie_id),
                        user_id: parseInt(user_id),
                        title: title,
                        poster_url: poster_url
                            ? `https://image.tmdb.org/t/p/w500${poster_url}`
                            : 'https://placehold.co/600x400/1alala/ffffff.png',
                    }
                );
                console.log('Saved');
            } catch (createErr) {
                console.error('Create Error:', createErr);
            }
        } else {
            console.error('Get Error:', error);
        }
    }
};