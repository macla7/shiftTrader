import React, { useEffect, useState } from "react";
import ButtonGroup from "./ButtonGroup";

function Post(props) {
  const [body, setBody] = useState(props.post.body);
  const [isEditing, setIsEditing] = useState(
    props.postToEdit === props.post.id
  );

  useEffect(
    () => setIsEditing(props.postToEdit === props.post.id),
    [props.postToEdit, props.post.id]
  );

  function submitHandler(e) {
    e.preventDefault();
    const formData = {
      post: {
        id: props.post.id,
        body: body,
      },
    };
    props.submitEdit(formData);
    resetState();
  }

  function resetState() {
    setBody(props.post.body);
  }

  const bodyElement = <p>{body}</p>;

  const editableBody = (
    <textarea value={body} onChange={(e) => setBody(e.target.value)} />
  );

  const submitButton = (
    <button type="submit" onClick={(e) => submitHandler(e)}>
      Submit
    </button>
  );

  return (
    <div>
      <div>
        <div>
          <ButtonGroup
            post_id={props.post.id}
            dispatch={props.dispatch}
            toggleEditForm={props.toggleEditForm}
          />
        </div>
      </div>
      <div>
        <div>{isEditing ? editableBody : bodyElement}</div>
      </div>
      <div>
        <div>{isEditing ? submitButton : ""}</div>
      </div>
    </div>
  );
}

export default Post;
