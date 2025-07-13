import { Stack } from "expo-router";
import { StatusBar } from "react-native";
export default function RootLayout() {

  return <>
    <StatusBar backgroundColor={'white'} />
    <Stack>

      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="movies/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  </>
}
