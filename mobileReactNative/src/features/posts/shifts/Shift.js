import React from "react";
import { Box, VStack, HStack, Text } from "native-base";
import { format } from "date-fns";
import { InternalBorderTile } from "../../layout/LayoutComponents";

function Shift(props) {
  let day = "";
  function getDays(item) {
    if (
      format(new Date(item.start), "EEE do LLL") !==
      format(new Date(item.end), "EEE do LLL")
    ) {
      return (
        <>
          <Text>Across Days:</Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            {format(new Date(item.start), "EEE do LLL")}
          </Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            {format(new Date(item.end), "EEE do LLL")}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Text>Day:</Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            {format(new Date(item.start), "EEE do LLL")}
          </Text>
        </>
      );
    }
  }
  return (
    <Box w="100%">
      {props.shifts.map((item, index) => {
        return (
          <InternalBorderTile>
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
                <VStack>{getDays(item)}</VStack>
                <VStack>
                  <Text>Time:</Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {format(new Date(item.start), "p")}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {format(new Date(item.end), "p")}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </InternalBorderTile>
        );
      })}
    </Box>
  );
}

export default Shift;
