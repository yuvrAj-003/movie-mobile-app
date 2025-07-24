/* eslint-disable react-hooks/exhaustive-deps */
import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import { checkExisting, saveMovie } from '@/services/appwrite';
import { account } from '@/services/auth';
import useAuth from '@/services/useAuth';
import useFetch from '@/services/useFetch';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';

import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';


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

    const [isSaved, setIsSaved] = useState<boolean>(false);



    const { id } = useLocalSearchParams();

    const { user } = useAuth(account);

    useFocusEffect(
        useCallback(() => {
            async function check() {

                const existing = await checkExisting(id.toString(), user?.$id)
                setIsSaved(existing);
            }

            check()
        }, [isSaved, user?.$id])
    )


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
                        }}
                    >

                        <View>
                            <Image
                                source={{ uri: movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : 'https://placehold.Co/600x400/1alala/ffffff.png' }}
                                className='w-full h-[550px]'
                                resizeMode='stretch'
                            />
                        </View>


                        <Toast />

                        <View className='flex-col items-start justify-center mt-5 px-5'>

                            <View className='w-full flex-row justify-between items-center'>
                                {/* title  */}
                                <Text className='text-white font-bold text-xl w-3/4' numberOfLines={1}>{movie?.title}</Text>

                                {/* saved  */}
                                {user && <TouchableOpacity
                                    className='p-3 bg-dark-200 rounded-xl flex-row gap-x-2 items-center justify-center'
                                    onPress={async () => {

                                        if (user) {

                                            await saveMovie(
                                                id.toString(),
                                                user.$id,
                                                movie?.title,
                                                movie?.poster_path
                                            )

                                            setIsSaved(!isSaved);

                                            if (isSaved) {
                                                Toast.show({
                                                    type: 'error',
                                                    text1: 'Removed',
                                                    position: 'top',
                                                    topOffset: 60,

                                                });
                                            }
                                            else {
                                                Toast.show({
                                                    type: 'success',
                                                    text1: 'Saved',
                                                    position: 'top',
                                                    topOffset: 60,

                                                });

                                            }
                                        }
                                        else {
                                            router.push("/")
                                        }

                                    }}
                                >
                                    <Image
                                        source={icons.sve} className='size-5'
                                        tintColor={isSaved ? '#D6C6FF' : 'white'}
                                    />

                                </TouchableOpacity>}
                            </View>

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