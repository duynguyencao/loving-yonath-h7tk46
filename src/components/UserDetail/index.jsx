import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchModel(`/api/user/${userId}`).then(setUser);
  }, [userId]);

  if (!user) {
    return (
      <Typography variant="h6" color="error">
        User not found
      </Typography>
    );
  }

  return (
    <div className="user-detail">
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Location:</strong> {user.location}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Occupation:</strong> {user.occupation}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Description:</strong> {user.description}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/photos/${userId}`}
        style={{ marginTop: "20px" }}
      >
        View Photos
      </Button>
    </div>
  );
};

export default UserDetail;
