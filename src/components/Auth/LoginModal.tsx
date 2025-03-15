import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import Visibility from "@mui/icons-material/Visibility"; // Import Visibility icon
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Import VisibilityOff icon
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"; // Import LockOutlinedIcon
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  password: string;
  email: string;
}

const initialState: FormValues = {
  password: "",
  email: "",
};

const schemaStudent = z.object({
  email: z.string().min(1, "Email is required").email("Enter valid email"),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaStudent),
    defaultValues: initialState,
  });

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    console.log(data);
    toast.success("Login successful");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            paddingTop: "20px",
          }}
        >
          {/* X icon at the top right */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 15,
              fontSize: "1.5rem",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" gutterBottom align="center">
            Login
          </Typography>

          <Avatar
            sx={{
              bgcolor: "primary.main",
              alignSelf: "center",
              width: 70,
              height: 70,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>

          <TextField
            label="Email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  color="primary"
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            endIcon={isLoading ? <CircularProgress size="1rem" /> : null}
            sx={{ mb: 2, borderRadius: 50 }}
          >
            {isLoading ? " Logging In " : "Login " }
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default LoginModal;
