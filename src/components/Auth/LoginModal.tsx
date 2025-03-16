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
  Link,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import Visibility from "@mui/icons-material/Visibility"; // Import Visibility icon
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Import VisibilityOff icon
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"; // Import LockOutlinedIcon
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link as RouterLink ,useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  password: string;
  email: string;
  role: string;
}

const initialState: FormValues = {
  password: "",
  email: "",
  role: "",
};

const schemaStudent = z.object({
  email: z.string().min(1, "Email is required").email("Enter valid email"),
  // password: z
  //   .string()
  //   .min(8, "Password must have at least 8 characters")
  //   .regex(/[0-9]/, "Password must contain at least one number")
  //   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  //   .regex(
  //     /[^a-zA-Z0-9]/,
  //     "Password must contain at least one special character"
  //   ),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z.string().min(1, "Role is required"),
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
  const navigate = useNavigate();

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const endpoint =
        data.role === "Guide"
          ? "https://localhost:7015/api/Guide/login"
          : "https://localhost:7015/api/Tourists/login";
      const response = await axios.post(endpoint, {
        email: data.email,
        password: data.password,
      });
      console.log("Response:", response.data);
      const responseData = response.data;
      const decodedToken: any = jwtDecode(responseData.token);

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("Id", decodedToken.id); 
      localStorage.setItem("Role", decodedToken.role); 
      toast.success("Login successful");
      onClose();

      // Redirect to the appropriate home page
      if (decodedToken.role === "Guide") {
        navigate("/guide-home");
      } else {
        navigate("/tourist-home");
      }

    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const errorResponse = error.response.data;
        toast.warning(errorResponse);
      } else {
        toast.error("Login failed. Please try again.");
      }
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
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
            width: 400,
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
          <TextField
            select
            label="Role"
            fullWidth
            {...register("role")}
            error={!!errors.role}
            helperText={errors.role?.message}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <MenuItem value="Guide">Guide</MenuItem>
            <MenuItem value="Tourist">Tourist</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            endIcon={isLoading ? <CircularProgress size="1rem" /> : null}
            sx={{ mb: 2, borderRadius: 50 }}
          >
            {isLoading ? " Logging In " : "Login "}
          </Button>
         
          <Typography align="center">
            <Link component={RouterLink} to="/forgot-password" variant="body2">Forgot password?</Link>
          </Typography>
        </Box>
      </form>
    </Modal>
  );
};

export default LoginModal;
