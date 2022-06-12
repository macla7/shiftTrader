import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, selectUsers } from "./userSlice";

function Search() {
  const users = useSelector(selectUsers);
  const [userList, setUserList] = useState("");
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  function filterUsers(users, searchQuery = null) {
    if (!searchQuery) {
      return users;
    }
    searchQuery = searchQuery.toLowerCase();

    return users.filter((user) => {
      let userEmail = user.email.toLowerCase();
      return userEmail.includes(searchQuery);
    });
  }

  function listUsers(users) {
    setUserList(users.map((user) => <li key={user.id}>{user.email}</li>));
  }

  // Members
  useEffect(() => {
    console.log("in group search useEffect, fetch Users");
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    listUsers(filterUsers(users, searchQuery));
  }, [users, searchQuery]);

  return (
    <div>
      <form action="/" method="get">
        <label htmlFor="header-search">
          <span className="visually-hidden"></span>
        </label>
        <input
          type="text"
          id="header-search"
          placeholder="Search people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          name="s"
        />
        <button type="submit">Add</button>
      </form>
      <div>{userList}</div>
    </div>
  );
}

export default Search;
