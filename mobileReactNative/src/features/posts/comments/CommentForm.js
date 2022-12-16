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
  Pressable,
} from "native-base";
import { Keyboard } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons/faPaperPlane";

function CommentForm() {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("testing");

  return (
    <Box p="2">
      <FormControl>
        <HStack alignItems="center" justifyContent="center">
          <Input
            flex="1"
            m="0"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.nativeEvent.text)}
          />
          <Button ml="2">
            <FontAwesomeIcon icon={faPaperPlane} color="#171717" />
          </Button>
        </HStack>
      </FormControl>
    </Box>
  );
}

export default CommentForm;
