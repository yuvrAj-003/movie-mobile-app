import { Stack } from "expo-router";
import { StatusBar } from "react-native";
export default function RootLayout() {

  return <>
    <StatusBar hidden={true} />

    <Stack>

      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="movies/[id]"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Auth"
        options={{ headerShown: false }}

      />

    </Stack>
  </>
}
