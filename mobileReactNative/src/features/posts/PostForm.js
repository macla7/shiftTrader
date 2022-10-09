import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync } from "./postSlice";
import { resetShifts, selectShifts } from "./shifts/shiftSlice";
import { createNotificationBlueprint } from "../notifications/notificationBlueprintAPI";
import { Heading, VStack, FormControl, Button, Text } from "native-base";
import Shift from "./shifts/Shift";
import { CScrollBackground, CContentTile } from "../layout/LayoutComponents";
import { format } from "date-fns";

function PostForm({ route, navigation }) {
  const dispatch = useDispatch();
  const shifts = useSelector(selectShifts);
  const { date, group, description, reserve } = route.params;
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [invalidShiftIds, setInvalidShiftIds] = useState([]);

  function submitPost() {
    let post = {
      body: description,
      ends_at: date,
      group_id: group.id,
      reserve: reserve,
      shifts_attributes: shifts,
    };
    dispatch(createPostAsync(post));

    // if above succeeds ..?
    let notification_blueprint = {
      notificationable_type: "Group",
      notificationable_id: group.id,
      notification_type: 4,
    };

    createNotificationBlueprint(notification_blueprint);
    dispatch(resetShifts());
  }

  useEffect(() => {
    dispatch(resetShifts());
  }, []);

  useEffect(() => {
    setData({ ...formData, endsAt: date });
  }, []);

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (shifts.length > 0) {
      let invalidShifts = shifts.filter(
        (shift) => new Date(shift.start).getTime() < new Date(date).getTime()
      );
      setInvalidShiftIds(invalidShifts.map((shift) => shift.tempId));
      newErrors["shifts"] = "Some shifts start before the post ends";
      valid = false;
    }

    setErrors({ ...errors, ...newErrors });
    // if (valid) {
    //   submitForm();
    //   navigation.navigate({
    //     name: returnScreen,
    //     merge: true,
    //   });
    // }
  };

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  return (
    <CScrollBackground>
      <CContentTile>
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Create Post
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
          To sell or pay someone to take your shifts
        </Heading>
      </CContentTile>
      <CContentTile>
        <VStack w="100%">
          <FormControl
            isInvalid={["shifts"].some((error) =>
              Object.keys(errors).includes(error)
            )}
          >
            <FormControl.Label>Group</FormControl.Label>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              onPress={() =>
                navigation.navigate("Group Search", {
                  group: group,
                })
              }
            >
              {group.name}
            </Button>
            <FormControl.Label>Post Ends</FormControl.Label>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              onPress={() =>
                navigation.navigate("DateTimePicker", {
                  initDate: date,
                  returnType: "date",
                  returnScreen: "Post Form",
                })
              }
            >
              {format(new Date(date), "EEE do LLL")}

              {format(new Date(date), "p")}
            </Button>

            <FormControl.Label>Shifts</FormControl.Label>
            <Shift
              shifts={shifts ? shifts : []}
              navigation={navigation}
              editable={true}
              invalidShiftIds={invalidShiftIds}
            />
            {errors["shifts"] ? (
              <FormControl.ErrorMessage>
                {errors.shifts}
              </FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText>Time and Position</FormControl.HelperText>
            )}
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              onPress={() =>
                navigation.navigate("Add Shift", {
                  start: new Date(date).toString(),
                  end: new Date(date).toString(),
                  endsAt: new Date(date).toString(),
                  initPosition: "",
                  editingMode: false,
                  returnScreen: "Post Form",
                })
              }
            >
              Add Shift
            </Button>

            <FormControl.Label>Reserve</FormControl.Label>
            <Text>{reserve}</Text>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              onPress={() =>
                navigation.navigate("Add Reserve", {
                  reserve: reserve,
                  returnScreen: "Post Form",
                })
              }
            >
              Add Reserve
            </Button>

            <FormControl.Label>Description</FormControl.Label>
            <Text>{description}</Text>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              onPress={() =>
                navigation.navigate("Add Description", {
                  initDescription: "",
                  returnScreen: "Post Form",
                })
              }
            >
              Add Description
            </Button>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={onSubmit}>
            Make Post
          </Button>
        </VStack>
      </CContentTile>
    </CScrollBackground>
  );
}

export default PostForm;
