import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./components/Home";

export default function Index() {
  const queryClient = new QueryClient()

  return (
    <View style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </View>
  );
}
