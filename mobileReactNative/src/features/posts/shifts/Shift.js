import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "../postSlice";
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
} from "native-base";
import { parse, format } from "date-fns";

function Shift(props) {
  const shifts = useSelector((state) => state.shifts.shifts);

  return (
    <Box>
      {shifts.map((item) => {
        return (
          <Box
            borderWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            key={item.id}
            p="2"
            my="2"
          >
            <VStack>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
              >
                {item.position}
              </Text>
              <HStack space={3} justifyContent="space-between">
                <VStack>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {format(item.start, "EEE do LLL")}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {format(item.start, "p")}
                  </Text>
                </VStack>
                <VStack>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {format(item.end, "EEE do LLL")}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {format(item.end, "p")}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        );
      })}
    </Box>
  );
}

export default Shift;
