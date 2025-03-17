import { TextField, Button, CircularProgress, IconButton } from "@mui/material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CustomCard from "../components/Auth/CustomCard";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormValues {
  newpassword: string;
}

const initialState: FormValues = {
    newpassword: "",
};

const schemaReset = z.object({
    newpassword: z.string().min(1, "password is required"),
});
const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaReset),
    defaultValues: initialState,
  });
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7015/api/Auth/reset-password",
        data
      );
      console.log(response.data);
      toast.success("Password reset successfully");
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomCard
        title="Enter new password"
        description="Set a new password to secure your account."
        icon={<VpnKeyIcon fontSize="large" />}
      >
        <TextField
          label="New Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          {...register("newpassword")}
          error={!!errors.newpassword}
          helperText={errors.newpassword?.message}
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
          {isLoading ? " Loading " : "Reset Password"}
        </Button>
      </CustomCard>
    </form>
  );
};

export default ResetPassword;
