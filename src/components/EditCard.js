import React, { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "../style/Card.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "600px",
  },
  "& .MuiTextField-root": {
    width: "90%",
    align: "center",
  },
}));

export function EditCard({
  open,
  onClose,
  refreshPage,
  initialTitle,
  initialContent,
  id,
}) {
  const [content, setContent] = useState(initialContent || "");
  const [title, setTitle] = useState(initialTitle || "");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  useEffect(() => {
    setIsSubmitDisabled(!(title.trim() && content.trim()));
  }, [title, content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      console.error("No valid ID provided");
      return;
    }

    const newsData = {
      title: title,
      content: content,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/news/${id.timestamp.timestamp}`,
        newsData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from API:", response.data);

      // Reset fields and close the dialog
      setTitle("");
      setContent("");
      onClose();

      // Trigger refresh to fetch the updated list
      if (refreshPage) {
        refreshPage(); // Ensure refreshPage exists and is a function
      } else {
        console.error("refreshPage is not a function");
      }
    } catch (err) {
      console.error("There was an error sending the data!", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
      }
    }
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      className="add-news"
      PaperProps={{
        style: {
          width: 700,
          height: 500,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit Newsletter
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom component="div">
          <TextField
            required
            id="outlined-basic-title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <TextField
            required
            id="standard-textarea"
            label="Content"
            placeholder="Content"
            multiline
            variant="standard"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="warning" variant="outlined">
          Close
        </Button>
        <Button
          autoFocus
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
