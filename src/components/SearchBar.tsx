import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, SearchFormData } from "../schemas/searchSchema";

const SearchBar: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    console.log("Search Data:", data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: -4,
        p: 2,
        backgroundColor: "white",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <TextField
        label="Location"
        {...register("location")}
        error={!!errors.location}
        helperText={errors.location?.message}
        variant="outlined"
      />
      <TextField
        label="Distance"
        {...register("distance")}
        error={!!errors.distance}
        helperText={errors.distance?.message}
        variant="outlined"
      />
      <TextField
        label="Price Range"
        {...register("priceRange")}
        error={!!errors.priceRange}
        helperText={errors.priceRange?.message}
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
