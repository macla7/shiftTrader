import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "../postSlice";

// Design is to be able to add multiple shifts to a post
function ShiftForm(props) {
  const [end, setEnd] = useState("");
  const [start, setStart] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [shiftsList, setShiftsList] = useState("");
  const userId = useSelector((state) => state.sessions.user.id);
  const dispatch = useDispatch();

  function listShifts(shifts) {
    return shifts.map((shift) => (
      <li key={shift.id}>
        Shift: {shift.id} - Price: {shift.price}
      </li>
    ));
  }

  useEffect(() => {}, [dispatch]);

  return (
    <div>
      <label>
        Position:
        <input
          type="text"
          name="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        ></input>
      </label>
      <br />
      <label>
        Starts:
        <input
          type="datetime-local"
          name="end"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        ></input>
      </label>
      <br />
      <label>
        Ends:
        <input
          type="datetime-local"
          name="ends"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        ></input>
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
    </div>
  );
}

export default ShiftForm;
