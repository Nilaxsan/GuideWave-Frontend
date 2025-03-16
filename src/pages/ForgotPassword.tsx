import { TextField, Button, CircularProgress } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import CustomCard from "../components/Auth/CustomCard";
import { useState } from "react";
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
}

const initialState: FormValues = {
  email: "",
};

const schemaReset = z.object({
  email: z.string().min(1, "Email is required").email("Enter valid email"),
});
const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      const response = await axios.post("https://localhost:7015/api/Auth/forgot-password", data);
      console.log(response.data);
      toast.success("OTP sent to your email");
      setIsLoading(false);
      navigate("/verify-otp");
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
        title="Forgot Password"
        description="Enter your registered  email address and we'll send you  OTP to your email."
        icon={<LockResetIcon fontSize="large" />}
      >
        <TextField
          label="Email Address"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          variant="outlined"
          sx={{ mb: 3 }}
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
          {isLoading ? " Sending " : "Send OTP "}
        </Button>
      </CustomCard>
    </form>
  );
};

export default ForgotPassword;
