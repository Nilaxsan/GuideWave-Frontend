import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Avatar,
} from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define common form values
interface FormValues {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "tourist" | "guide";
  profile: string;
  experience?: string; // Guide specific
  location?: string; // Guide specific
  country?: string; // Tourist specific
}

// Define the schema validation for Tourist and Guide
const schemaTourist = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  profile: z.string().min(1, "Profile is required"),
  role: z.enum(["tourist", "guide"]),
  country: z.string().min(1, "Country is required").optional(),
});

const schemaGuide = schemaTourist.extend({
  experience: z.string().min(1, "Experience is required"),
  location: z.string().min(1, "Location is required"),
});

const SignupModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [role, setRole] = useState<string>("tourist");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(role === "tourist" ? schemaTourist : schemaGuide),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedRole = event.target.value as string;
    setRole(selectedRole);
    reset(); // Reset the form when role changes
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxHeight: "90vh", 
            overflowY: "auto", 
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
          Sign Up
        </Typography>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            alignSelf: "center",
            width: 70,
            height: 70,
          }}
        >
          <HowToRegIcon />
        </Avatar>

        <TextField
          label="Full Name"
          fullWidth
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone Number"
          fullWidth
          {...register("phoneNumber")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Profile"
          fullWidth
          {...register("profile")}
          error={!!errors.profile}
          helperText={errors.profile?.message}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            label="Role"
            {...register("role", { onChange: handleRoleChange })}
          >
            <MenuItem value="Tourist">Tourist</MenuItem>
            <MenuItem value="guide">Guide</MenuItem>
          </Select>
        </FormControl>

        {/* Conditional Fields */}
        {role === "tourist" ? (
          <TextField
            label="Country"
            fullWidth
            {...register("country")}
            error={!!errors.country}
            helperText={errors.country?.message}
            sx={{ mb: 2 }}
          />
        ) : (
          <>
            <TextField
              label="Experience"
              fullWidth
              {...register("experience")}
              error={!!errors.experience}
              helperText={errors.experience?.message}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Location"
              fullWidth
              {...register("location")}
              error={!!errors.location}
              helperText={errors.location?.message}
              sx={{ mb: 2 }}
            />
          </>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit(onSubmit)}
          sx={{ mb: 2 ,borderRadius: 50 }}
        >
          Sign Up as {role}
        </Button>
      </Box>
    </Modal>
  );
};

export default SignupModal;
