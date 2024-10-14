import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { FullCard } from "../components/FullCard";
import "../style/Card.css";
import { useState } from "react";
import Box from "@mui/material/Box"; // Import Box
import { EditCard } from "../components/EditCard";
import { DeleteCard } from "../components/DeleteCard";

export default function SampleCard({
  id,
  title,
  content,
  comments,
  refreshNews,
}) {
  const [showFullCardComponent, setShowFullCardComponent] = useState(false);
  const [showCardEdit, setShowCardEdit] = useState(false);
  const [showCardDelete, setShowCardDelete] = useState(false);

  const handleClickOpenFullCard = () => {
    setShowFullCardComponent(true);
  };
  const handleCloseFullCard = () => {
    setShowFullCardComponent(false);
  };

  const handleClickOpenEdit = () => {
    setShowCardEdit(true);
  };
  const handleCloseEdit = () => {
    setShowCardEdit(false);
  };

  const handleClickOpenDelete = () => {
    setShowCardDelete(true);
  };
  const handleCloseDelete = () => {
    setShowCardDelete(false);
  };

  const handleConfirmDelete = () => {
    // Call the API to delete the newsletter here, passing the 'id'
    console.log(`Deleting newsletter with id: ${id}`);
    // After deletion, refresh the news or perform any other action
    refreshNews();
    handleCloseDelete(); // Close the dialog
  };

  return (
    <Box sx={{ width: 400, height: 250, margin: 1 }}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardActionArea sx={{ flex: 1, backgroundColor: "#63c7b2" }}>
          <div className="card-content">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  whiteSpace: "nowrap",
                }}
              >
                {content}
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
        <CardActions
          sx={{ justifyContent: "flex-end", backgroundColor: "#263D42" }}
        >
          <Button
            size="small"
            color="info"
            variant="contained"
            onClick={handleClickOpenFullCard}
          >
            Open
          </Button>

          <Button
            size="small"
            color="info"
            variant="contained"
            onClick={handleClickOpenEdit}
          >
            Edit
          </Button>

          <Button
            size="small"
            color="info"
            variant="contained"
            onClick={handleClickOpenDelete}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      {showFullCardComponent && (
        <FullCard
          open={showFullCardComponent}
          onClose={handleCloseFullCard}
          title={title}
          content={content}
          comments={comments}
        />
      )}

      {showCardEdit && (
        <EditCard
          open={showCardEdit}
          onClose={handleCloseEdit}
          initialTitle={title}
          initialContent={content}
          id={{ timestamp: id }} // Pass the id directly
          refreshPage={refreshNews}
        />
      )}

      <DeleteCard
        open={showCardDelete}
        onClose={handleCloseDelete}
        title={title}
        onConfirmDelete={handleConfirmDelete}
        refreshPage={refreshNews}
        id={{ timestamp: id }}
      />
    </Box>
  );
}
