import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const GenericModal = ({ open, onClose, title, content, caption, style }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="generic-modal-title"
      sx={{ zIndex: 50, outline:"none", overflow: "scroll" ,
      
      overflow: "scroll",
    '& .MuiBox-root': {
      border: 'none',
      // other styles...
    },
    '&:focus-visible': {
      outline: 'none',
      // Add your custom styles here
    },
      }}>
      <Box style={{ ...style }} sx={{border: 'none'}} className="absolute h-fit inset-0 m-auto  w-full max-w-2xl p-5 flex flex-col items-center space-y-1.25 rounded-xl bg-white shadow-lg">
        <div className="self-end">
          <CloseIcon className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="w-full">
          <h2 id="generic-modal-title" className="text-center text-2xl font-semibold">{title}</h2>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            className="text-center text-gray-500 font-roboto">
            {caption}
          </Typography>
        </div>
        {content}
      </Box>
    </Modal>
  );
};

export default GenericModal;