import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';

import { Image, Text, TouchableOpacity, View } from 'react-native';

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
    return (
        <Link href={`/movies/${movie?.movie_id}`} asChild>

            <TouchableOpacity className='w-32 relative pl-5'>


                <Image
                    source={{
                        uri: movie.poster_url || 'https://placehold.Co/600x400/1alala/ffffff.png'
                    }}
                    className='w-full h-48 rounded-lg z-0'
                    resizeMode='cover'
                />

                <View className='absolute bottom-8'>
                    <MaskedView maskElement={
                        <Text className='font-bold text-white text-6xl'>{index + 1}</Text>
                    } >
                        <Image source={images?.rankingGradient} className='size-14' resizeMode='cover' />
                    </MaskedView>
                </View>

                <Text className='text-white font-bold mt-1' numberOfLines={1}>{movie?.title}</Text>


            </TouchableOpacity>
        </Link>

    )
}

export default TrendingCard