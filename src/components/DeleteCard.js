import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import axios from "axios";
import { styled } from "@mui/material/styles";

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

export function DeleteCard({
  open,
  onClose,
  title,
  id,
  onConfirmDelete,
  refreshPage,
}) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/news/${id.timestamp.timestamp}`, // Using the correct ID for deletion
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Delete response:", response.data);

      // Trigger parent method after delete is successful
      onConfirmDelete();
      onClose();

      if (refreshPage) {
        refreshPage(); // Ensure refreshPage exists and is a function
      } else {
        console.error("refreshPage is not a function");
      }
    } catch (error) {
      console.error("Error deleting the news:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          width: 700,
          height: 200,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="alert-dialog-title">
        {"Confirm Deletion"}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this newsletter titled "{title}"?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="success">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="warning"
          variant="contained"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
