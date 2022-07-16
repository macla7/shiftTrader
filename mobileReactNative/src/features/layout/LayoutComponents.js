import React, { useEffect, useState } from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Text,
  Link,
  ScrollView,
  Pressable,
  View,
} from "native-base";

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
    <ScrollView
      w="100%"
      h="100%"
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#064e3b", "#ecfdf5"]}
        width="100%"
        height="100%"
      >
        <Center w="100%" h="100%">
          <Center p="2" w="100%" h="100%">
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
