import React, { useEffect, useState, useRef } from "react";
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
  FlatList,
  View,
} from "native-base";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

function MoneyInput() {
  const ref = useRef();

  let cents = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
    95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
    90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80,
    85, 90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75,
    80, 85, 90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
    75, 80, 85, 90, 95, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65,
    70, 75, 80, 85, 90, 95,
  ];
  const [dollars, setDollars] = useState(dollarRange(0));
  const [currentDollar, setCurrentDollar] = useState(0);
  const [currentCents, setCurrentCents] = useState(0);

  function dollarRange(value) {
    let arr = [];
    for (let i = value - 100; i <= value + 100; i++) {
      if (i < 0) {
        arr.push("-$" + i * -1);
      } else {
        arr.push("$" + i);
      }
    }
    return arr;
  }

  // useEffect(() => {
  //   ref.current.scrollTo({ y: 4776 });
  // });

  function handleScroll(event) {
    setCurrentDollar(
      dollars[Math.round(event.nativeEvent.contentOffset.y / 100)]
    );
  }

  function handleCents(event) {
    setCurrentCents(cents[Math.round(event.nativeEvent.contentOffset.y / 100)]);
  }

  // useEffect(() => {
  //   setDollars((prevDollars) => {
  //     dollarRange(prevDollars);
  //   });
  //   console.log(dollarRange(0));
  // }, []);

  return (
    <Center w="100%" bgColor="cyan.100" h="100%">
      <Box p="2" py="8" w="90%" maxW="290" h="100%">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Money Input
        </Heading>
        <Text>{currentDollar + "." + currentCents}</Text>

        <HStack h="400px" bgColor="white" w="200px">
          <Box h="400px" w="100px">
            {/* <FlatList
            data={dollars}
            renderItem={(dollar) => <Box>{dollar}</Box>}
            keyExtractor={(dollar) => dollar.id}
          /> */}
            <LinearGradient
              // Button Linear Gradient
              colors={[
                "rgba(0,0,0, 0.5)",
                "rgba(256,256,256, 0)",
                "rgba(256,256,256, 0)",
                "rgba(0,0,0, 0.5)",
              ]}
              style={styles.background}
            >
              <ScrollView
                ref={ref}
                snapToInterval="100"
                snapToalignment="center"
                centerContent
                decelerationRate="fast"
                contentOffset={{ x: 0, y: 10000 }}
                onScroll={handleScroll}
              >
                <View py="150px" w="100px">
                  {dollars.map((dollar) => {
                    return (
                      <Center
                        key={dollar}
                        h="100px"
                        w="100px"
                        borderColor="coolGray.300"
                        borderWidth="1"
                        bgColor="transparent"
                      >
                        <Text fontSize="4xl">{dollar}</Text>
                      </Center>
                    );
                  })}
                </View>
              </ScrollView>
            </LinearGradient>
          </Box>
          <Box h="400px" w="50%" px="2">
            {/* <FlatList
            data={dollars}
            renderItem={(dollar) => <Box>{dollar}</Box>}
            keyExtractor={(dollar) => dollar.id}
          /> */}
            <LinearGradient
              // Button Linear Gradient
              colors={[
                "rgba(0,0,0, 0.5)",
                "rgba(256,256,256, 0)",
                "rgba(256,256,256, 0)",
                "rgba(0,0,0, 0.5)",
              ]}
              style={styles.background}
            >
              <ScrollView
                ref={ref}
                snapToInterval="100px"
                snapToalignment="center"
                centerContent
                decelerationRate="fast"
                contentOffset={{ x: 0, y: 6000 }}
                onScroll={handleCents}
              >
                <View py="150px">
                  {cents.map((cent, i) => {
                    return (
                      <Center
                        key={i}
                        h="100px"
                        borderColor="coolGray.300"
                        borderWidth="1"
                        bgColor="transparent"
                      >
                        <Text fontSize="4xl">
                          {(cent == 0 ? "00" : cent) + "c"}
                        </Text>
                      </Center>
                    );
                  })}
                </View>
              </ScrollView>
            </LinearGradient>
          </Box>
        </HStack>
      </Box>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    position: "absolute",
    height: "100%",
    width: 100,
    zIndex: 1,
    pointerEvents: "none",
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});

export default MoneyInput;
