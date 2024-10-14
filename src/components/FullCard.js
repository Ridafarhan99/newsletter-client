import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../style/Card.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export function FullCard({ open, onClose, title, content, comments }) {
  return (
    <div>
      <React.Fragment>
        <BootstrapDialog
          open={open} // Dialog visibility controlled by the 'open' prop
          onClose={onClose}
          className="full-card-component"
          PaperProps={{
            style: {
              width: 700, // Set the dialog width
              height: 500, // Set the dialog height
            },
          }} // Close the dialog when this function is called
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {title}
          </DialogTitle>

          <DialogContent dividers>
            <Typography gutterBottom>{content}</Typography>
          </DialogContent>

          <DialogActions>
            <Button autoFocus onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    </div>
  );
}
