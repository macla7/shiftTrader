import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroupAsync, fetchGroupsAsync, selectGroups } from "./groupSlice";
import { CBackground, CContentTile } from "../layout/LayoutComponents";
import { Input, Button, Pressable, VStack, FormControl } from "native-base";
import { Keyboard } from "react-native";

function GroupForm({ route, navigation }) {
  const dispatch = useDispatch();
  const { returnScreen } = route.params;
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const groups = useSelector(selectGroups);

  useEffect(() => {
    dispatch(fetchGroupsAsync());
  }, [dispatch]);

  function groupNameExists(name) {
    const allGroupNames = groups.map((group) => group.name);

    return allGroupNames.includes(name);
  }

  function submitGroup() {
    const data = {
      group: {
        name: formData.name,
      },
    };
    dispatch(createGroupAsync(data));
  }

  const validate = () => {
    if (formData.name === undefined || formData.name === "") {
      setErrors({ ...errors, name: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    } else if (groupNameExists(formData.name)) {
      setErrors({ ...errors, name: "Name already taken" });
      return false;
    }
    submitGroup();
    navigation.navigate({
      name: returnScreen,
    });
    return true;
  };

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <CBackground>
        <CContentTile>
          <VStack width="90%" mx="3" maxW="300px">
            <FormControl isRequired isInvalid={"name" in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Name
              </FormControl.Label>
              <Input
                placeholder="Your Workplace"
                onChangeText={(value) => setData({ ...formData, name: value })}
              />
              {"name" in errors ? (
                <FormControl.ErrorMessage>
                  {errors.name}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Name should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <Button colorScheme="indigo" onPress={onSubmit} mt="5">
              Submit
            </Button>
          </VStack>
        </CContentTile>
      </CBackground>
    </Pressable>
  );
}

export default GroupForm;
