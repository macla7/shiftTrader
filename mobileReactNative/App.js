import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { NativeRouter } from "react-router-native";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { Routes, Route } from "react-router-dom";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
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
import { NativeBaseProvider, Text, View } from "native-base";
import { theme } from "./theme";

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

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

  console.log(theme.fontWeights);

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <NativeBaseProvider theme={theme}>
          <View bgColor="primary.200"></View>
          <AuthFlow />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
