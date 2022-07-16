import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Spacer,
  Flex,
} from "native-base";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { selectDollars, setMoney } from "./moneySlice";

function MoneyScroll(props) {
  // get props of 'type' which determines functionality i suppose, moneyArr
  const dispatch = useDispatch();
  const currentDollars = useSelector(selectDollars);

  function handleScroll(event) {
    dispatch(
      setMoney({
        money:
          props.moneyArr[Math.round(event.nativeEvent.contentOffset.y / 100)],
        moneyType: props.moneyType,
      })
    );
  }

  function handleMoneyText(type, money) {
    if (type == "cents") {
      return handleSmallCents(money) + "c";
    }
    return handleDollarsNegative(money);
  }

  function handleDollarsNegative(dollars) {
    if (dollars < 0) {
      return "$" + dollars * -1;
    }
    return "$" + dollars;
  }

  function handleSmallCents(cents) {
    if (cents == 0) {
      return "00";
    } else if (cents == 5) {
      return "05";
    }
    return cents;
  }

  return (
    <Box
      h="400px"
      w="100px"
      m="4"
      bgColor={currentDollars < 0 ? "rose.200" : "success.200"}
      borderRadius="10%"
      shadow="6"
    >
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
          "rgba(256,256,256, 1)",
          "rgba(256,256,256, 0)",
          "rgba(0,0,0, 0.5)",
        ]}
        style={styles.background}
      >
        <ScrollView
          snapToInterval="100"
          snapToalignment="center"
          centerContent
          decelerationRate="fast"
          contentOffset={{ x: 0, y: 10000 }}
          onScroll={handleScroll}
          scrollEventThrottle="100"
        >
          <View py="150px" w="100px">
            {props.moneyArr.map((money, i) => {
              return (
                <Center
                  key={i}
                  h="100px"
                  w="100px"
                  borderColor="coolGray.300"
                  borderWidth="1"
                >
                  <Text
                    fontSize="4xl"
                    fontFamily="body"
                    fontWeight={400}
                    fontStyle="normal"
                  >
                    {handleMoneyText(props.moneyType, money)}
                  </Text>
                </Center>
              );
            })}
          </View>
        </ScrollView>
      </LinearGradient>
    </Box>
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
    borderRadius: "10%",
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

export default MoneyScroll;
