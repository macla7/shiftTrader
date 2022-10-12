import React, { useState, useCallback } from "react";
import { Center, Box, Text } from "native-base";
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#064e3b", "#ecfdf5"]}
        width="100%"
        flex="1"
        paddingVertical={20}
      >
        <Center w="100%" p="0" flex="1">
          {children}
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
        end={{ x: 1, y: 0 }}
        colors={["#064e3b", "#059669"]}
        width="100%"
        minHeight="100%"
      >
        <Box p="0" w="100%" minHeight="100%">
          {children}
        </Box>
      </LinearGradient>
    </ScrollView>
  );
}

export function CContentTile({ children }) {
  return (
    <Center p="4" m="2" w="95%" borderRadius="10" bgColor="white" shadow="6">
      {children}
    </Center>
  );
}

export function CWholeSpaceContentTile({ children }) {
  return (
    <Center w="100%" borderRadius="10" h="95%" bgColor="white" shadow="6">
      {children}
    </Center>
  );
}

export function CWholeSpaceRefreshTile({ children, refreshAction }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
    refreshAction();
  }, []);

  return (
    <Box w="100%" borderRadius="10" h="95%" bgColor="white" shadow="6">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Center>{children}</Center>
      </ScrollView>
    </Box>
  );
}

export function CInternalBorderTile({ children }) {
  return (
    <Box
      borderWidth="1"
      _dark={{
        borderColor: "gray.600",
      }}
      borderColor="coolGray.200"
      px="2"
      my="2"
      mx="1"
      borderRadius="10"
    >
      {children}
    </Box>
  );
}

export function CInternalBorderHeaderTile({ children }) {
  return (
    <Center
      borderWidth="1"
      _dark={{
        borderColor: "gray.600",
      }}
      borderColor="coolGray.200"
      mt="2"
      mx="1"
      borderRadius="10"
    >
      {children}
    </Center>
  );
}
