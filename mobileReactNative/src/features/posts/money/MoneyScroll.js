import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Center, Box, Text, View } from "native-base";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { setMoney, selectMoney } from "./moneySlice";

function MoneyScroll(props) {
  const dispatch = useDispatch();
  const currentMicroDollars = useSelector(selectMoney);
  const [color, setColor] = useState("");

  function handleScroll(event) {
    dispatch(
      setMoney({
        money:
          props.money[
            Math.round((event.nativeEvent.contentOffset.y + 550) / 100)
          ],
      })
    );
  }

  function handleDollarsNegative(dollars) {
    if (dollars < 0) {
      return "$" + (dollars * -1) / 1000000;
    }
    return "$" + dollars / 1000000;
  }

  function pickColor() {
    if (props.type == "reserve") {
      return currentMicroDollars < 0 ? "rose.200" : "success.200";
    } else {
      return currentMicroDollars > 0 ? "rose.200" : "success.200";
    }
  }

  useEffect(() => {
    setColor(pickColor());
  }, [currentMicroDollars]);

  return (
    <Box
      h="400px"
      w="200px"
      m="4"
      bgColor={color}
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
          contentOffset={
            props.type == "reserve" ? { x: 0, y: 10000 } : { x: 0, y: 0 }
          }
          // onMomentumScrollEnd={handleScroll}
          onScroll={handleScroll}
          scrollEventThrottle="100"
        >
          <View w="200px">
            {props.money.map((money, i) => {
              return (
                <Center
                  key={i}
                  h="100px"
                  w="200px"
                  borderColor="coolGray.300"
                  borderWidth="1"
                  mt={i == 0 ? "-450px" : "0"}
                >
                  {i == 5 ? (
                    <Text fontSize="xl" fontWeight={400}>
                      Current Bid
                    </Text>
                  ) : null}
                  <Text fontSize="4xl" fontWeight={400}>
                    {handleDollarsNegative(money)}
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
  background: {
    position: "absolute",
    height: "100%",
    width: 200,
    zIndex: 1,
    pointerEvents: "none",
    borderRadius: "10%",
  },
});

export default MoneyScroll;
