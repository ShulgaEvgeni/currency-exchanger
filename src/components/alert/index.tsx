import { observer } from 'mobx-react-lite';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

interface AlertProps {
  open: boolean;
  handleClose: () => void;
  status: AlertColor;
  message: string;
}

const CustomAlert = observer((props: AlertProps) => {
  const { open, handleClose, status, message } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert className={`alert ${status}`} elevation={6} variant="filled" severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
});

export default CustomAlert;
