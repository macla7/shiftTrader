import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createShift, editShift } from "./shiftSlice";
import { VStack, FormControl, Button, TextArea } from "native-base";
import { CScrollBackground, CContentTile } from "../../layout/LayoutComponents";
import { format, compareAsc } from "date-fns";

// Design is to be able to add multiple shifts to a post
function ShiftForm({ navigation, route }) {
  const { start, end, initPosition, editingMode, tempId, endsAt } =
    route.params;
  const dispatch = useDispatch();
  const { returnScreen } = route.params;
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});

  function submitForm() {
    if (editingMode) {
      const shift = {
        position: formData.position,
        start: start.toString(),
        end: end.toString(),
        tempId: tempId,
      };
      dispatch(editShift(shift));
    } else {
      const shift = {
        position: formData.position,
        start: start.toString(),
        end: end.toString(),
      };
      dispatch(createShift(shift));
    }
  }

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (formData.position === "") {
      newErrors["position"] = "Position is required";
      valid = false;
    }
    if (new Date(start).getTime() < new Date(endsAt).getTime()) {
      newErrors["start"] = "Start time cannot be before when the Post ends";
      valid = false;
    }
    if (compareAsc(new Date(end), new Date(start)) !== 1) {
      newErrors["end"] = "End time must be after the Shift starts";
      valid = false;
    }

    setErrors({ ...errors, ...newErrors });
    if (valid) {
      submitForm();
      navigation.navigate({
        name: returnScreen,
        merge: true,
      });
    }
    return valid;
  };

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  useEffect(() => {
    setData({ ...formData, start: start, end: end, position: initPosition });
  }, []);

  return (
    <CScrollBackground>
      <CContentTile>
        <VStack w="100%">
          <FormControl
            isInvalid={["position", "start", "end"].some((error) =>
              Object.keys(errors).includes(error)
            )}
          >
            <FormControl.Label mb="-1">Position</FormControl.Label>
            {errors["position"] ? (
              <FormControl.ErrorMessage>
                {errors.position}
              </FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText>Details of shift</FormControl.HelperText>
            )}
            <TextArea
              mt="2"
              borderRadius="10"
              h={20}
              isInvalid={errors["position"]}
              placeholder="Add Description here.."
              name="position"
              value={formData.position}
              onChangeText={(value) => {
                setData({ ...formData, position: value });
                setErrors({ ...errors, position: null });
              }}
            />

            <FormControl.Label mb="-1">Shift start time</FormControl.Label>
            {errors["start"] ? (
              <FormControl.ErrorMessage>
                {errors.start}
              </FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText>
                Needs to be after the Post finishes.
              </FormControl.HelperText>
            )}
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="Unstyled"
              display="flex"
              justifyContent="flex-start"
              borderColor={errors["start"] ? "error.600" : "muted.300"}
              borderWidth="1"
              p="2"
              mt="2"
              mx="1"
              borderRadius="10"
              onPress={() => {
                navigation.navigate("Time and Date", {
                  initDate: start,
                  returnType: "start",
                  returnScreen: "Add Shift",
                  text: "Shift starts",
                });
                setErrors({ ...errors, start: null });
              }}
            >
              {format(new Date(start), "EEE do LLL")}

              {format(new Date(start), "p")}
            </Button>

            <FormControl.Label mb="-1">Shift end time</FormControl.Label>
            {"end" in errors ? (
              <FormControl.ErrorMessage>{errors.end}</FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText>
                Needs to be after the start time.
              </FormControl.HelperText>
            )}
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="Unstyled"
              display="flex"
              justifyContent="flex-start"
              borderColor={errors["end"] ? "error.600" : "muted.300"}
              borderWidth="1"
              p="2"
              mt="2"
              mx="1"
              borderRadius="10"
              onPress={() => {
                navigation.navigate("Time and Date", {
                  initDate: end,
                  returnType: "end",
                  returnScreen: "Add Shift",
                  text: "Shift ends",
                });
                setErrors({ ...errors, end: null });
              }}
            >
              {format(new Date(end), "EEE do LLL")}

              {format(new Date(end), "p")}
            </Button>
          </FormControl>

          <Button mt="2" colorScheme="indigo" onPress={onSubmit}>
            {editingMode ? "Edit Shift" : "Add Shift"}
          </Button>
        </VStack>
      </CContentTile>
    </CScrollBackground>
  );
}

export default ShiftForm;
