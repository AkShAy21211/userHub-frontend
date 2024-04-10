import { useState } from "react";
import { instance } from "../services/api";

export const useRegister = () => {
  const [errors, setErrors] = useState('');
  const [loader, setLoader] = useState(false);

  const register = async (formData) => {
    try {
      setLoader(true);
      setErrors('');

      const response = await instance.post("/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      setLoader(false);
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      if (error.response) {
        setErrors(error.response.data.message);
      } else {
        setErrors("An unexpected error occurred.");
      }
    }
  };

  return { register, loader, errors };
};
