import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "./sessionSlice";
import { StyleSheet, View, TextInput, Alert } from "react-native";
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

export default function App() {
  const dispatch = useDispatch();
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
    const formData = new FormData();

    // formData.append("user[avatar]", e.target.avatar.files[0]);
    formData.append("user[email]", data.email);
    formData.append("user[password]", data.password);
    formData.append(
      "user[client_id]",
      "mBd4U-YMBIDZ-uM89ReLdszoMUCJ6WkdCHBuTuKForU"
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
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" colorScheme="indigo">
            Sign up
          </Button>
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
    //   {errors.firstName && <Text>This is required.</Text>}

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

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgb(0, 0, 0)",
    backgroundColor: "rgba(255, 255, 255, 255)",
    color: "red",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});

// function Register() {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [avatar, setAvatar] = useState("");

//   // function handleRegister(e) {
//   //   e.preventDefault();

//   //   const data = new FormData();

//   //   data.append("user[avatar]", e.target.avatar.files[0]);
//   //   data.append("user[email]", e.target.email.value);
//   //   data.append("user[password]", e.target.password.value);
//   //   data.append("user[password]", e.target.password.value);
//   //   data.append(
//   //     "user[client_id]",
//   //     "mBd4U-YMBIDZ-uM89ReLdszoMUCJ6WkdCHBuTuKForU"
//   //   );

//   //   dispatch(registerUserAsync(data));
//   // }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label htmlFor="email">Email</label>
//       <input {...register("email")} />
//       <label htmlFor="password">Password</label>
//       <input
//         type="password"
//         id="password"
//         name="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         {...register("password")}
//       />
//       <label htmlFor="avatar">Avatar</label>
//       <input
//         type="file"
//         id="avatar"
//         name="avatar"
//         onChange={(e) => setAvatar(e.target.files[0])}
//         {...register("avatar")}
//       />
//       <input type="submit" value="Sign up" />
//     </form>
//   );
// }

// export default Register;
