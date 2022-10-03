import React, { useState, useCallback } from "react";
import { Center, Box } from "native-base";
import { RefreshControl, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function CBackground({ children }) {
  return (
    <Center w="100%" h="100%">
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#064e3b", "#ecfdf5"]}
        width="100%"
        height="100%"
      >
        <Center p="2" w="100%" h="100%">
          {children}
        </Center>
      </LinearGradient>
    </Center>
  );
}

export function CScrollBackground({ children }) {
  return (
    <ScrollView w="100%" minHeight="100%">
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#064e3b", "#ecfdf5"]}
        width="100%"
        minHeight="100%"
      >
        <Center w="100%" minHeight="100%">
          <Center p="2" w="100%" minHeight="100%">
            {children}
          </Center>
        </Center>
      </LinearGradient>
    </ScrollView>
  );
}

export function CScrollBackgroundRefresh({ children, refreshAction }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
    refreshAction();
  }, []);

  return (
    <ScrollView
      w="100%"
      minHeight="100%"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#064e3b", "#ecfdf5"]}
        width="100%"
        minHeight="100%"
      >
        <Center w="100%" minHeight="100%">
          <Center p="2" w="100%" minHeight="100%">
            {children}
          </Center>
        </Center>
      </LinearGradient>
    </ScrollView>
  );
}

export function CTile({ children }) {
  return (
    <Center p="1" m="2" w="95%" borderRadius="5%" bgColor="white" shadow="6">
      {children}
    </Center>
  );
}

export function CContentTile({ children }) {
  return (
    <Center p="8" m="2" w="95%" borderRadius="5%" bgColor="white" shadow="6">
      {children}
    </Center>
  );
}

export function CWholeSpaceTile({ children }) {
  return (
    <Center m="2" w="95%" borderRadius="5%" h="95%" bgColor="white" shadow="6">
      {children}
    </Center>
  );
}

export function InternalBorderTile({ children }) {
  return (
    <Box
      borderWidth="1"
      _dark={{
        borderColor: "gray.600",
      }}
      borderColor="coolGray.200"
      p="2"
      my="2"
      mx="1"
    >
      {children}
    </Box>
  );
}
