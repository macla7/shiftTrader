import { destroyPostAsync } from "./postSlice";
import {
  Box,
  Text,
  Flex,
  HStack,
  VStack,
  Center,
  Button,
  AspectRatio,
} from "native-base";
import Likes from "./likes/Likes";
import BidIcon from "../../assets/noun-auction-4831153.svg";

function ButtonGroup({ postId, minPrice, navigation, likes }) {
  function handleClick(e) {
    const payload = {
      post: {
        post_id: props.post_id,
      },
    };
    props.dispatch(destroyPostAsync(payload));
  }
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      h="10"
      borderTopWidth="1"
      borderColor="coolGray.200"
    >
      <Button flex="1" variant="unstyled" p="0">
        <Likes likes={likes} postId={postId} />
      </Button>
      <Button flex="1" variant="unstyled" p="0">
        Comment
      </Button>
      <Button
        flex="1"
        variant="unstyled"
        p="0"
        onPress={() =>
          navigation.navigate("Bid", {
            reserve: minPrice,
            returnScreen: "Home Feed",
            postId: postId,
          })
        }
      >
        <HStack h="100%">
          <AspectRatio ratio={{ base: 1 / 1, md: 1 / 1 }}>
            <BidIcon width="100%" height="100%" fill="#14532d" />
          </AspectRatio>
          <Center>
            <Text>Bid</Text>
          </Center>
        </HStack>
      </Button>
    </Flex>
  );
}

export default ButtonGroup;
