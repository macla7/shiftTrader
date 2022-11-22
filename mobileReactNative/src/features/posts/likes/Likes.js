import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLikeAsync, destroyLikeAsync } from "../postSlice";
import { createNotificationBlueprint } from "../../notifications/notificationBlueprintAPI";
import { FavouriteIcon, Pressable, Text, HStack, Box } from "native-base";

function Likes(props) {
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const userId = useSelector((state) => state.sessions.user.id);
  const dispatch = useDispatch();
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  let likeDetails = {
    post_id: props.postId,
    user_id: userId,
  };

  function action(e) {
    e.preventDefault();
    if (!currentUserLiked) {
      likePost();
    } else {
      unlikePost();
    }
  }

  function likePost() {
    setCurrentUserLiked(true);
    dispatch(createLikeAsync(likeDetails));
    createNotification();
    setNumberOfLikes((prevCount) => prevCount + 1);
  }

  function unlikePost() {
    setCurrentUserLiked(false);
    dispatch(destroyLikeAsync(likeDetails));
    setNumberOfLikes((prevCount) => prevCount - 1);
  }

  function createNotification() {
    let notification_blueprint = {
      notificationable_type: "Post",
      notificationable_id: props.postId,
      notification_type: 7,
    };
    createNotificationBlueprint(notification_blueprint);
  }

  // Fetch Likes
  useEffect(() => {
    setNumberOfLikes(props.likes.length);
    hasCurrentUserLiked();
  }, [dispatch]);

  function hasCurrentUserLiked() {
    if (props.likes.filter((like) => like.user_id === userId).length > 0) {
      setCurrentUserLiked(true);
    }
  }

  return (
    <>
      <Pressable onPress={(e) => action(e)} borderColor="">
        <Box
          // borderColor="coolGray.200"
          // borderWidth="1"
          // bgColor="white"
          // shadow="1"
          p="1"
          mb="1"
          mx="1"
          borderRadius="10"
        >
          <HStack alignItems="center">
            <FavouriteIcon color={currentUserLiked ? "red.500" : "light.300"} />
            <Text> {numberOfLikes}</Text>
          </HStack>
        </Box>
      </Pressable>
    </>
  );
}

export default Likes;
