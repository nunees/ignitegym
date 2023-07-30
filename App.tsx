import { View, StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { LogBox } from "react-native";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { AuthContext } from "@contexts/AuthContext";

import { Loading } from "@components/Loading";
import { THEME } from "./src/theme";

import { Routes } from "./src/routes";
import { Home } from "@screens/Home";

export default function App() {
  LogBox.ignoreLogs([
    "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
  ]);
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContext.Provider
        value={{
          id: "1",
          name: "Felipe",
          email: "felipe@test.com",
          avatar: "felipe.png",
        }}
      >
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
