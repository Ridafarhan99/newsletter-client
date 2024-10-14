import React, { useState } from "react";
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
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

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

export function CreateNews({ open, onClose, refreshNews }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newsData = {
      content: content,
      title: title,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/news`,
        newsData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle(""); // Clear the title text box
      setContent("");
      refreshNews(); // Refresh the news list in App.js
      onClose();
    } catch (err) {
      console.error("There was an error sending the data!", err);
    }
  };

  // Accept `open` and `onClose` as props
  return (
    <BootstrapDialog open={open} onClose={onClose} className="add-news">
      {""}
      {/* Pass the `open` and `onClose` props */}
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add Newsletter
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
        <Button autoFocus variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
