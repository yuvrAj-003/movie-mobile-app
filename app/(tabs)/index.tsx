import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { account } from "@/services/auth";
import useAuth from "@/services/useAuth";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../globals.css";

export default function Index() {

  const router = useRouter();


  const {
    data: trendingMovie,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies)

  const trendingMovies = trendingMovie ?? []
  const {
    data: movies,
    loading: movieLoading,
    error: movieError
  } = useFetch(() => fetchMovies({ query: '' }))

  const { user, loading: AuthLoading } = useAuth(account);

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



        {/* header  */}

        <View className="w-full flex-row h-10 mt-20 mb-5 mx-auto justify-between items-center">

          {/* regsiter sign out  */}
          {(!user && !AuthLoading) &&
            <>
              <TouchableOpacity
                className="bg-dark-200 rounded-full px-5 py-2"
                onPress={() => router.push("/Auth/Register")}
              >
                <Text className="text-accent">Register</Text>
              </TouchableOpacity>


              <TouchableOpacity
                className="bg-dark-200 rounded-full px-5 py-2"
                onPress={() => router.push("/Auth/Login")}
              >
                <Text className="text-accent">Login</Text>
              </TouchableOpacity>
            </>
          }

          {/* profile icon  */}
          {user &&
            <>

              <TouchableOpacity
                className="w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center"
                onPress={() => router.push("/profile")}
              >
                <Image source={icons.profile} resizeMode="cover" className="size-8" />
              </TouchableOpacity>

            </>
          }

          {/* logo  */}
          <View className="w-full absolute">
            <Image source={icons.logo} className="w-12 mx-auto" />
          </View>

        </View>





        {/* movies data */}

        {/* loading indicator */}
        {movieLoading || trendingLoading || AuthLoading ?
          (<ActivityIndicator
            size={5} className="mt-5" />
          ) : movieError || trendingError ? (

            <View className="h-screen absolute w-full flex-row justify-center items-center">
              <Text className="text-gray-500 mt-5 mb-5 text-center">Error : {movieError?.message || trendingError?.message}</Text>
            </View>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                onPress={() => router.push("/search")}
                onChangeText={() => router.push("/search")}
                value={''}
              />

              {/* trending */}
              {trendingMovies?.length > 0 && (
                <View className="mt-10">
                  <Text className="text-white  font-bold mb-5"> Trending Movies</Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                    data={trendingMovies}
                    renderItem={({ item, index }) => (
                      <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item, index) => (item.movie_id - index).toString()}
                    className="mt-2"
                  />
                </View>
              )}


              {/* latest movies data  */}

              <Text className="text-white mt-6 font-bold mb-5"> Latest Movies</Text>
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
              />
            </View>
          )
        }
      </ScrollView>
    </View>
  );
}
