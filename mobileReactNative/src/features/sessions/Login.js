import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "./sessionSlice";
import { useForm, Controller } from "react-hook-form";
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
} from "native-base";
// import { Link } from "react-router-native";

function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    const registerUserDetails = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginUserAsync(registerUserDetails));
  }

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            {/* <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link> */}
          </FormControl>
          <Button mt="2" colorScheme="indigo">
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Text
              fontSize="xs"
              fontWeight="500"
              color="indigo.500"
              onPress={() => navigation.navigate("Register")}
            >
              Sign up
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Center>
    // <View>
    //   <Controller
    //     control={control}
    //     rules={{
    //       required: true,
    //     }}
    //     render={({ field: { onChange, onBlur, value } }) => (
    //       <TextInput
    //         style={styles.input}
    //         onBlur={onBlur}
    //         onChangeText={onChange}
    //         value={value}
    //       />
    //     )}
    //     name="email"
    //   />
    //   {errors.email && <Text>This is required.</Text>}
    //   <Controller
    //     control={control}
    //     rules={{
    //       maxLength: 100,
    //     }}
    //     render={({ field: { onChange, onBlur, value } }) => (
    //       <TextInput
    //         style={styles.input}
    //         onBlur={onBlur}
    //         onChangeText={onChange}
    //         value={value}
    //       />
    //     )}
    //     name="password"
    //   />

    //   <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    // </View>
  );
}

export default Login;
