import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Link,
  Container,
  Box,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of Project 4.
 */
const UserPhotos = () => {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchModel(`/api/photo/photosOfUser/${userId}`).then(setPhotos);
    fetchModel(`/api/user/${userId}`).then(setUser);
  }, [userId]);

  if (!user) {
    return (
      <Typography variant="h6" color="error">
        User not found
      </Typography>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="h6">
        No photos found for {user.first_name} {user.last_name}
      </Typography>
    );
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  return (
    <Box
      className="user-photos"
      sx={{
        height: "calc(100vh - 100px)",
        overflow: "auto",
        padding: "20px",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Photos of {user.first_name} {user.last_name}
        </Typography>

        {photos.map((photo) => (
          <Card
            key={photo._id}
            sx={{
              marginBottom: "20px",
              maxWidth: "100%",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                position: "relative",
                maxHeight: "500px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardMedia
                component="img"
                image={`/images/${photo.file_name}`}
                alt={`Photo by ${user.first_name}`}
                sx={{
                  maxHeight: "500px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Posted on {formatDate(photo.date_time)}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                Comments
              </Typography>

              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <Box
                    key={comment._id}
                    sx={{
                      marginBottom: 2,
                      padding: 1,
                      borderLeft: "3px solid #e0e0e0",
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      {comment.user && (
                        <Link
                          component={RouterLink}
                          to={`/users/${comment.user._id}`}
                          color="primary"
                          sx={{ fontWeight: "medium" }}
                        >
                          {comment.user.first_name} {comment.user.last_name}
                        </Link>
                      )}
                      {" - "}
                      {formatDate(comment.date_time)}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 0.5 }}>
                      {comment.comment}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No comments yet
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default UserPhotos;
