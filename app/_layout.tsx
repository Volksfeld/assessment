import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="modules/home/presentation/screens/home-screen/index" 
            options={{
              headerShown: false,
          }}/>
          <Stack.Screen name="modules/travel-destination/presentation/screens/travel-destination-screen/index" 
            options={{
              headerShown: false,
          }}/>
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
