import React, { useEffect, useState } from "react";
import ButtonGroup from "./ButtonGroup";

function Post(props) {
  return (
    <div>
      <div></div>
      <p>Group: {props.post.group_id}</p>
      <p>{props.post.body}</p>
      <p>Ends at: {props.post.ends_at}</p>
    </div>
  );
}

export default Post;
