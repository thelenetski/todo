import { createPortal } from "react-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modal/slice";
import { selectIsOpenModal } from "../../redux/modal/selectors";

const ModalWindow = ({ onSuccess, children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);

  const onClose = () => dispatch(closeModal());

  return createPortal(
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Повідомлення
          </Typography>
          {children}
          <Button
            onClick={onSuccess}
            variant="contained"
            color="success"
            sx={{ mr: 2, mt: 2 }}
          >
            Підтвердити
          </Button>
          <Button
            onClick={onClose}
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
          >
            Відмінити
          </Button>
        </Box>
      </Modal>
    </>,
    document.getElementById("modal-root")
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "1px solid #777",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default ModalWindow;
