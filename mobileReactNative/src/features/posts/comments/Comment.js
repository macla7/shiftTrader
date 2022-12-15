import React from "react";
import { VStack, HStack, Text, View, Box } from "native-base";
import { formatDistanceToNow } from "date-fns";
import DP from "../../layout/DP";
import { CInternalBorderTile } from "../../layout/LayoutComponents";

function Comment(props) {
  return (
    <Box>
      <Box width="100%" p="2">
        <HStack width="100%">
          {props.comment.avatar_url ? (
            <DP uri={`${props.comment.avatar_url}`} />
          ) : (
            ""
          )}
          <Box ml="2" flexGrow={1}>
            <VStack>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
              >
                {props.comment.commentor_name}
              </Text>
              <HStack justifyContent="space-between">
                <Text>
                  {format(new Date(props.comment.created_at), "d MMM")}
                </Text>
                <HStack alignItems="center">
                  <FontAwesomeIcon icon={faClock} color="#171717" />
                  <Text ml="1">
                    Ends in{" "}
                    {formatDistanceToNow(new Date(props.comment.ends_at))}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

export default Comment;
