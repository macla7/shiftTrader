import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter } from "react-router-native";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { Routes, Route } from "react-router-dom";
import Home from "./src/features/home/Home.js";

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            {/* <Route path="groups" element={<Groups />} /> */}
          </Route>
        </Routes>
      </NativeRouter>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="groups" element={<Groups />} />
            <Route path="groups/:groupId" element={<Group />} />
            <Route
              path="*"
              element={
                <main>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
