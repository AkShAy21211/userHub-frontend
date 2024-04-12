import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/api";

const initialState = {
 
  user:null,
  error:null
};




export const profile = createAsyncThunk("profile/profile", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const response = await instance.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
});


export const updateProfile = createAsyncThunk("profile/updateProfile", async (formData,thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const response = await instance.post("/profile", formData,{
      headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type":"multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
});


const userProfile = createSlice({

    name:"profile",
    initialState,

    extraReducers:(builder)=>{

       

        builder.addCase(profile.pending,(state)=>{
            state.user = null
            state.error = null
        })
        .addCase(profile.fulfilled,(state,action)=>{

            state.user = action.payload;
            state.error = null;

        })
         .addCase(profile.rejected,(state,action)=>{

              state.user = null;
              state.error = action.error.message;

        })

        

        builder.addCase(updateProfile.pending,(state)=>{
            state.user = state.error
            state.error = null

        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
           
            state.user = action.payload;
            state.error = null;

        })
         .addCase(updateProfile.rejected,(state,action)=>{

            
              state.user = null;
              state.error = action.error.message;

        })
        
    }


})

export default userProfile.reducer;
