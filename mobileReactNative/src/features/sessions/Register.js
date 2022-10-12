import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "./sessionSlice";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
} from "native-base";

export default function App() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [avatar, setAvatar] = useState("");

  function onSubmit() {
    const formData = new FormData();

    // formData.append("user[avatar]", e.target.avatar.files[0]);
    formData.append("user[email]", email);
    formData.append("user[password]", password);
    formData.append(
      "user[client_id]",
      "53wEXQ6wJazdFYa5VdYPuExU-ap8VkO7CRqIyzP1zGk"
    );

    dispatch(registerUserAsync(formData));
  }

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.nativeEvent.text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
            />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={() => onSubmit()}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
