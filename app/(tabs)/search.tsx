/* eslint-disable react-hooks/exhaustive-deps */
import MovieCard from '@/components/movieCard'
import SearchBar from '@/components/searchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native'

const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: movies,
        loading: movieLoading,
        error: movieError,
        refetch: loadMovies,
        reset
    } = useFetch(() => fetchMovies({ query: searchQuery }), false)


    useEffect(() => {

        const movieTimeout = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies('');
            }
            else {
                reset()
            }
        }, 500)

        return () => clearTimeout(movieTimeout)

    }, [searchQuery])

    useEffect(() => {
        if (movies?.length > 0 && movies?.[0]) {
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies])
    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className="absolute w-full z-0 top-0" />



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

                {/* search results  */}
                <FlatList
                    data={movies}
                    renderItem={({ item }) => (
                        <MovieCard {...item} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    scrollEnabled={false}
                    columnWrapperStyle={{
                        justifyContent: "flex-start",
                        gap: 20,
                        paddingRight: 5,
                        marginBottom: 10
                    }}


                    className="mt-2 pb-32"

                    ListHeaderComponent={
                        <>
                            <View className='my-5'>
                                <SearchBar
                                    value={searchQuery}
                                    onChangeText={(text: string) => {
                                        setSearchQuery(text)
                                    }}
                                    onPress={() => { }}
                                />
                            </View>


                            {movieLoading && <ActivityIndicator size='large' color='white' className='mt-3 mb-5 ' />}

                            {
                                !movieLoading && !movieError
                                && searchQuery.trim()
                                && movies?.length > 0
                                &&
                                (<Text
                                    className="text-xl text-white font-bold mb-2">
                                    Search Results for{' '}
                                    <Text className="text-accent">{searchQuery.toUpperCase()}</Text>
                                </Text>)

                            }

                        </>
                    }

                    ListEmptyComponent={
                        !movieLoading && !movieError ? (

                            <View className='mt-10 px-5'>
                                <Text className='text-center text-gray-500'>
                                    {searchQuery.trim() ? 'No Movies Found' : 'Search For a Movie'}
                                </Text>
                            </View>


                        ) : null
                    }
                />
            </ScrollView>
        </View>
    )
}

export default Search
