import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync } from "./postSlice";
import { resetShifts, selectShifts } from "./shifts/shiftSlice";
import { createNotificationBlueprint } from "../notifications/notificationBlueprintAPI";
import { Heading, VStack, FormControl, Button, TextArea } from "native-base";
import Money from "../posts/money/Money";
import Shift from "./shifts/Shift";
import { CScrollBackground, CContentTile } from "../layout/LayoutComponents";
import { compareAsc, format, addMinutes } from "date-fns";

function PostForm({ route, navigation }) {
  const dispatch = useDispatch();
  const shifts = useSelector(selectShifts);
  const { date, groupId, groupName, reserve, returnScreen } = route.params;
  const [formData, setData] = useState({});
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [invalidShiftIds, setInvalidShiftIds] = useState([]);

  function submitPost() {
    let post = {
      body: description,
      ends_at: date,
      group_id: groupId,
      reserve: reserve,
      shifts_attributes: shifts,
    };
    dispatch(createPostAsync(post));

    // if above succeeds ..?
    let notification_blueprint = {
      notificationable_type: "Group",
      notificationable_id: groupId,
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

    if (shifts.length === 0) {
      newErrors["shifts"] = "At least one Shift is requried";
      valid = false;
    }
    if (description === "") {
      newErrors["description"] = "Description required";
      valid = false;
    }
    if (shifts.length > 0) {
      let invalidShifts = shifts.filter((shift) =>
        compareAsc(new Date(shift.start), new Date(date)) === -1 ? true : false
      );
      setInvalidShiftIds(invalidShifts.map((shift) => shift.tempId));
      if (invalidShifts.length > 0) {
        newErrors["shifts"] = "Some shifts start before the post ends";
        valid = false;
      }
    }
    if (!dateIsValid()) {
      newErrors["date"] = "Post must be at least half an hour in the future";
      valid = false;
    }
    if (groupId === 0) {
      newErrors["group"] = "Need to pick a group";
      valid = false;
    }

    setErrors({ ...errors, ...newErrors });
    if (valid) {
      submitPost();
      navigation.navigate({
        name: returnScreen,
        merge: true,
      });
    }
  };

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  function dateIsValid() {
    return compareAsc(new Date(date), addMinutes(Date.now(), 30)) === 1
      ? true
      : false;
  }

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
            <FormControl.Label mb="0">Group</FormControl.Label>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="Unstyled"
              display="flex"
              justifyContent="start"
              borderColor={errors["group"] ? "error.600" : "muted.300"}
              borderWidth="1"
              p="2"
              mt="2"
              mx="1"
              borderRadius="10"
              onPress={() => {
                navigation.navigate("Group Search", {
                  initGroupId: groupId,
                });
                setErrors({ ...errors, group: null });
              }}
            >
              {groupName}
            </Button>
            <FormControl.ErrorMessage>{errors.group}</FormControl.ErrorMessage>
            <FormControl.Label mb="0">Post Ends</FormControl.Label>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="Unstyled"
              display="flex"
              justifyContent="start"
              borderColor={errors["date"] ? "error.600" : "muted.300"}
              borderWidth="1"
              p="2"
              mt="2"
              mx="1"
              borderRadius="10"
              onPress={() => {
                navigation.navigate("Time and Date", {
                  initDate: date,
                  returnType: "date",
                  returnScreen: "Post Form",
                  text: "Post will end at",
                });
                setErrors({ ...errors, date: null });
              }}
            >
              {format(new Date(date), "EEE do LLL")}

              {format(new Date(date), "p")}
            </Button>
            <FormControl.ErrorMessage>{errors.date}</FormControl.ErrorMessage>

            <FormControl.Label mb="0">Shifts</FormControl.Label>
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
              colorScheme="indigo"
              onPress={() => {
                navigation.navigate("Add Shift", {
                  start: new Date(date).toString(),
                  end: new Date(date).toString(),
                  endsAt: new Date(date).toString(),
                  initPosition: "",
                  editingMode: false,
                  returnScreen: "Post Form",
                });
                setErrors({ ...errors, shifts: null });
              }}
            >
              Add Shift
            </Button>

            <FormControl.Label mb="0">Reserve</FormControl.Label>
            <FormControl.HelperText>
              {reserve < 0
                ? "Maximum you are willing to pay"
                : "Minimum you will accept"}
            </FormControl.HelperText>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="Unstyled"
              display="flex"
              justifyContent="start"
              borderColor="muted.300"
              borderWidth="1"
              p="2"
              mt="2"
              mx="1"
              borderRadius="10"
              onPress={() =>
                navigation.navigate("Add Reserve", {
                  reserve: reserve,
                  returnScreen: "Post Form",
                })
              }
            >
              <Money microDollars={reserve} />
            </Button>

            <FormControl.Label mb="0">Description</FormControl.Label>
            <TextArea
              borderRadius="10"
              h={20}
              placeholder="Add Description here.."
              value={description}
              onChange={(e) => {
                setDescription(e.nativeEvent.text);
                setErrors({ ...errors, description: null });
              }}
              isInvalid={errors["description"]}
            />
            <FormControl.ErrorMessage>
              {errors.description}
            </FormControl.ErrorMessage>
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
