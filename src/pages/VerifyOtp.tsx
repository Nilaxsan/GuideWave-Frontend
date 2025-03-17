import { TextField, Button, CircularProgress } from "@mui/material";
import SecurityIcon from '@mui/icons-material/Security';
import CustomCard from "../components/Auth/CustomCard";
import { useState } from "react";
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface FormValues {
  otp: string;
}

const initialState: FormValues = {
  otp: "",
};

const schemaReset = z.object({
  otp: z.string().min(1, "Otp is required"),
});
const VerifyOtp = () => {
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
      const response = await axios.post("https://localhost:7015/api/Auth/verify-otp", data);
      console.log(response.data);
      toast.success("Otp verified successfully");
      setIsLoading(false);
      navigate("/reset-password");
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
        title="Enter OTP"
        description="Enter your OTP sent to your email address."
        icon={<SecurityIcon fontSize="large" />}
        >
        <TextField
          label="Enter your Otp"
          fullWidth
          {...register("otp")}
          error={!!errors.otp}
          helperText={errors.otp?.message}
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
          {isLoading ? " Verifying " : "Verify OTP"}
        </Button>
      </CustomCard>
    </form>
  );
};

export default VerifyOtp;
