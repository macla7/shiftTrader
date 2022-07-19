import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CBackground, CTile, CContentTile } from "../layout/LayoutComponents";
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
  TextArea,
  View,
  Image,
} from "native-base";
import { Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { updateUserAsync } from "./userSlice";
import {
  selectAuthToken,
  selectUserEmail,
  selectUserId,
  selectUserAvatarUrl,
  selectIsLoggedIn,
} from "../sessions/sessionSlice";

function Profile() {
  const userId = useSelector(selectUserId);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const userAvatarUrl = useSelector(selectUserAvatarUrl);

  // Method from expo docs https://docs.expo.dev/versions/latest/sdk/imagepicker/
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function onSubmit() {
    const formData = new FormData();
    let uriParts = image.split(".");
    let fileType = uriParts[uriParts.length - 1];

    formData.append("user[id]", userId);
    formData.append("user[avatar]", {
      uri: image,
      name: `profilePictureUser${userId}.${fileType}`,
      type: `image/${fileType}`,
    });
    // formData.append(
    //   "user[client_id]",
    //   "mBd4U-YMBIDZ-uM89ReLdszoMUCJ6WkdCHBuTuKForU"
    // );

    dispatch(updateUserAsync(formData));
  }

  console.log(userAvatarUrl);

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <CBackground>
        <CContentTile>
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Profile Picture
          </Heading>
          <Image
            source={{
              uri: userAvatarUrl,
            }}
            style={{ width: 200, height: 200 }}
            alt="avatar"
          />
          <Text>{userAvatarUrl}</Text>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {
              onSubmit();
            }}
          >
            Save
          </Button>
          <Button onPress={pickImage}>Edit</Button>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
              alt="prospective dp"
            />
          )}
          <Text>{image}</Text>
        </CContentTile>
      </CBackground>
    </Pressable>
  );
}

export default Profile;
