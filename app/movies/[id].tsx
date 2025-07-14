import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';


interface MovieInfoProps {
    label: string,
    value?: string | number | null

}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className='flex-col items-start justify-center mt-5'>
        <Text className='text-light-200 font-normal text-sm'>
            {label}
        </Text>

        <Text className='text-light-100 font-bold text-sm mt-2'>
            {value || 'N/A'}
        </Text>

    </View>
)
const MovieDetails = () => {


    const { id } = useLocalSearchParams();

    const {
        data: movie,
        loading: movieLoading,
        error: movieError
    } = useFetch(() => fetchMovieDetails(id as string))


    return (

        <View className='bg-primary flex-1'>
            {/* movie loading   */}
            {movieLoading &&
                <View className='h-screen absolute w-full flex-row justify-center items-center'>
                    <ActivityIndicator size='large' color='white' className='mt-3 mb-5 ' />
                </View>
            }

            {/* movie details  */}
            {!movieLoading && movieError ?
                (
                    <View className="h-screen absolute w-full flex-row justify-center items-center">
                        <Text className="text-gray-500 mt-5 mb-5 text-center">Error : {movieError?.message}</Text>
                    </View>
                ) :


                (
                    <ScrollView

                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 80
                        }}>

                        <View>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
                                className='w-full h-[550px]'
                                resizeMode='stretch'
                            />
                        </View>

                        <View className='flex-col items-start justify-center mt-5 px-5'>
                            <Text className='text-white font-bold text-xl'>{movie?.title}</Text>

                            <View className='flex-row items-center gap-x-1 mt-2'>
                                <Text className='text-light-200 text-sm'>
                                    {movie?.release_date?.split('-')[0]}
                                </Text>

                                <Text className='text-light-200 text-sm'>
                                    {movie?.runtime}m
                                </Text>
                            </View>

                            <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                                <Image source={icons.star} className='size-4' />

                                <Text className='text-white font-bold text-sm'>
                                    {Math.round(movie?.vote_average ?? 0)}/10
                                </Text>

                                <Text className='text-white font-bold text-sm'>
                                    ({movie?.vote_count})
                                </Text>
                            </View>

                            <MovieInfo label="Overview" value={movie?.overview} />

                            <MovieInfo label="Genre" value={movie?.genres?.map((g) => g.name).join(" - ") || 'N/A '} />

                            <View className='flex flex-row justify-between w-1/2'>

                                <MovieInfo label="Budget" value={movie?.budget ? `$${Math.round((movie?.budget) / 1_000_000)} million` : 'unknown'} />

                                <MovieInfo label="Revenue" value={movie?.revenue ? `$${Math.round((movie?.revenue) / 1_000_000)} million` : 'unknown'} />


                            </View>

                            <MovieInfo label="Production Companies" value={movie?.production_companies.map((c) => c.name).join(" - ") || 'N/A'} />
                        </View>
                    </ScrollView>
                )
            }

            {/* back button  */}
            <TouchableOpacity
                className='bg-light-100 absolute bottom-8 left-0 right-0 mx-5 rounded-lg py-3.5 flex flex-row gap-x-1 justify-center items-center z-50'
                onPress={router.back}
            >
                <Image source={icons.arrow} className='size-5 rotate-180' />
                <Text className='font-bold text-primary'>Go Back</Text>
            </TouchableOpacity>

        </View>
    )
}

export default MovieDetails