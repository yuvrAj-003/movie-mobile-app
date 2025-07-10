import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import "../globals.css";

export default function Index() {

  const router = useRouter();

  const {
    data: movies,
    loading: movieLoading,
    error: movieError
  } = useFetch(() => fetchMovies({ query: '' }))

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" />


      <ScrollView
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb=5 mx-auto z-0" />

        {/* movies data */}
        {movieLoading ?
          (<ActivityIndicator
            size={5} className="mt-5" />
          ) : movieError ? (
            <Text className="text-white font-bold mt-5 mb-5">Error : {movieError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                onPress={() => router.push("/search")}
                onChange={() => router.push("/search")}
              />

              <Text className="text-white mt-5 font-bold mb-5"> Latest movies</Text>

              {/* list rendered  */}
              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <Text className="text-white">{item.title}</Text>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
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
