import { Link } from 'expo-router';
import React from 'react';

import { Image, Platform, Text, TouchableOpacity } from 'react-native';

const SavedCard = ({ movie, index }: any) => {
    return (

        <Link href={`/movies/${movie?.movie_id}`} asChild>

            <TouchableOpacity className={`${Platform.OS === 'android' ? 'w-44' : 'w-48'} relative mt-5`}>


                <Image
                    source={{
                        uri: movie.poster_url || 'https://placehold.Co/600x400/1alala/ffffff.png'
                    }}
                    className='w-full h-64 rounded-lg z-0'
                    resizeMode='cover'
                />



                <Text className='text-white font-bold mt-2' numberOfLines={1}>{movie?.title}</Text>


            </TouchableOpacity>
        </Link>

    )
}

export default SavedCard