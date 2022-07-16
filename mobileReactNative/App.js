import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter } from "react-router-native";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { Routes, Route } from "react-router-dom";
import { NavigationContainer } from "@react-navigation/native";

import { selectIsLoggedIn } from "./src/features/sessions/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthFlow from "./src/features/authFlow/AuthFlow";
import {
  useFonts,
  Inconsolata_200ExtraLight,
  Inconsolata_300Light,
  Inconsolata_400Regular,
  Inconsolata_500Medium,
  Inconsolata_600SemiBold,
  Inconsolata_700Bold,
  Inconsolata_800ExtraBold,
  Inconsolata_900Black,
} from "@expo-google-fonts/inconsolata";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inconsolata_200ExtraLight,
    Inconsolata_300Light,
    Inconsolata_400Regular,
    Inconsolata_500Medium,
    Inconsolata_600SemiBold,
    Inconsolata_700Bold,
    Inconsolata_800ExtraBold,
    Inconsolata_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <AuthFlow />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
