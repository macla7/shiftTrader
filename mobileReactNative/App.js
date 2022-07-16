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
import { useFonts, OpenSans_400Regular } from "@expo-google-fonts/open-sans";
import { Inconsolata_400Regular } from "@expo-google-fonts/inconsolata";
import { NativeBaseProvider, extendTheme } from "native-base";

const theme = extendTheme({
  fontConfig: {
    Inconsolata: {
      400: {
        normal: "Inconsolata-Regular",
      },
      // Add more variants
      //   700: {
      //     normal: 'Roboto-Bold',
      //   },
      //   800: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
      //   900: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Inconsolata",
    body: "Inconsolata",
    mono: "Inconsolata",
  },
});

export default function App() {
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
