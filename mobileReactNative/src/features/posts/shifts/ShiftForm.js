import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createShift, editShift } from "./shiftSlice";
import { VStack, FormControl, Button, TextArea } from "native-base";
import { CScrollBackground, CContentTile } from "../../layout/LayoutComponents";

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
            <FormControl.Label>Position</FormControl.Label>
            <TextArea
              isInvalid={errors["position"]}
              h={20}
              placeholder="Add Description here.."
              name="position"
              value={formData.position}
              onChangeText={(value) => {
                setData({ ...formData, position: value });
                setErrors({ ...errors, position: null });
              }}
            />
            {errors["position"] ? (
              <FormControl.ErrorMessage>
                {errors.position}
              </FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText>Details of shift</FormControl.HelperText>
            )}
            <FormControl.Label>Shift start time</FormControl.Label>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              borderColor={errors["start"] ? "error.600" : "muted.300"}
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
              {start}
            </Button>
            {errors["start"] ? (
              <FormControl.ErrorMessage>
                {errors.start}
              </FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText>
                Needs to be after the Post finishes.
              </FormControl.HelperText>
            )}
            <FormControl.Label>Shift end time</FormControl.Label>
            <Button
              fontSize="md"
              fontWeight="400"
              color="coolGray.800"
              variant="outline"
              onPress={() =>
                navigation.navigate("Time and Date", {
                  initDate: end,
                  returnType: "end",
                  returnScreen: "Add Shift",
                  text: "Shift ends",
                })
              }
            >
              {end}
            </Button>
            {"end" in errors ? (
              <FormControl.ErrorMessage>{errors.end}</FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText>
                Needs to be after the start time.
              </FormControl.HelperText>
            )}
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
