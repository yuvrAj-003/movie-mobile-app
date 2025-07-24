/* eslint-disable react-hooks/exhaustive-deps */

import SavedCard from '@/components/SavedCard'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { getSavedMovies } from '@/services/appwrite'
import { account } from '@/services/auth'
import useAuth from '@/services/useAuth'
import useFetch from '@/services/useFetch'
import { router, useFocusEffect } from 'expo-router'
import React, { useCallback } from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Saved = () => {


    const { user, loading: AuthLoading } = useAuth(account);


    const { data: movies,

        error: movieError,

        loading: movieLoading,
        refetch: getMovies

    } = useFetch(() => getSavedMovies(user?.$id))

    useFocusEffect(
        useCallback(() => {
            if (user?.$id) getMovies(user.$id);
        }, [user?.$id])
    )

    return (
        <View className="flex-1 bg-primary">

            <Image source={images.bg} className="absolute w-full z-0 top-0" />
            {
                (!user && !AuthLoading) ?
                    <View className='h-full w-full flex-1 flex-col items-center justify-center'>

                        <Text className='text-white text-3xl font-bold'>
                            You are not authenticated
                        </Text>
                        <TouchableOpacity
                            className='mt-10 ml-3 w-3/6 bg-accent rounded-full px-4 py-4'
                            onPress={() => router.push("/Auth/Login")}

                        >
                            <Text className='text-xl font-bold text-center'>Login Or Register</Text>
                        </TouchableOpacity>
                    </View>
                    :

                    <ScrollView
                        className="flex-1 p-5"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            minHeight: "100%",
                            paddingBottom: 10
                        }}
                    >
                        <Image source={icons.logo} className="w-12 mt-20 mb-5 mx-auto z-0" />


                        {movieError &&
                            <View className="h-screen absolute w-full flex-row justify-center items-center">
                                <Text className="text-gray-500 mt-5 mb-5 text-center">Error : {movieError?.message}</Text>
                            </View>
                        }

                        {movies?.length === 0 ?

                            <View className="h-screen absolute w-full flex-row justify-center items-center">
                                <Text className="text-gray-500 mt-5 mb-5 text-center">No Saved Movies</Text>
                            </View>

                            :

                            <FlatList
                                data={movies}
                                renderItem={({ item, index }) => (
                                    <SavedCard movie={item} index={index} />
                                )}
                                keyExtractor={(item) => item.movie_id.toString()}
                                numColumns={2}
                                scrollEnabled={false}
                                columnWrapperStyle={{
                                    justifyContent: "space-between",
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10
                                }}

                                className="mt-5 pb-32"

                                ListHeaderComponent={
                                    <>

                                        {movieLoading && <ActivityIndicator size='large' color='white' className='mt-3 mb-5 ' />}

                                        <Text className='text-white font-bold ml-2'>Saved Movies</Text>


                                    </>
                                }
                            />
                        }
                    </ScrollView>
            }
        </View>
    )
}

export default Saved
