import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import "../globals.css";

export default function Index() {

  const router = useRouter();
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

        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            onChange={() => router.push("/search")}
          />
        </View>

      </ScrollView>
    </View>
  );
}
