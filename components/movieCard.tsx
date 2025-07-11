import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({ id, poster_path, title, vote_average, release_date, original_language }: Movie) => {
    return (

        <View className='w-full flex-1'>
            <Link href={`/movies/${id}`} asChild>
                <TouchableOpacity className='w-full'>

                    {/* image  */}
                    <Image
                        source={{
                            uri: poster_path ?
                                `https://image.tmdb.org/t/p/w500${poster_path}`
                                :
                                'https://placehold.Co/600x400/1alala/ffffff.png'
                        }}
                        className='w-full h-52 rounded-lg'
                        resizeMode='cover'

                    />

                    {/* title  */}
                    <Text className='flex-row items-center justify-start mt-2 text-white font-bold' numberOfLines={1}>{title}</Text>

                    {/* star ratings  */}
                    <View className='flex-row items-center justify-start gap-x-1 '>
                        <Image className="size-3" source={icons.star} />
                        <Text className='text-white text-xs font-bold'>{Math.round(vote_average / 2)}</Text>
                    </View>

                    <View className='flex-row items-center justify-between'>
                        <Text className='text-xs text-light-300'>{release_date?.split('-')[0]}</Text>

                        <Text className='text-xs text-light-300'>{original_language}</Text>

                    </View>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

export default MovieCard