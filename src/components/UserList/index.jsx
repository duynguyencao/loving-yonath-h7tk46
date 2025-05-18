import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Badge,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of project #5
 */
const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchModel("/api/user/list").then(setUsers);
  }, []);

  return (
    <div>
      <Typography variant="h6" component="h2" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user._id} component={Link} to={`/users/${user._id}`}>
            <ListItemText primary={`${user.first_name} ${user.last_name}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
