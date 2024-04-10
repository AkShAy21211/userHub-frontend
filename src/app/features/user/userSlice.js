import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/api";

const initialState = {
  user: null,
  token:null,
  isLoading: false,
  success:null,
  errors: null,
};

export const login = createAsyncThunk("auth/login", async (formData) => {
  try {
    const response = await instance.post("/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
});



export const profile = createAsyncThunk("auth/profile", async (_, thunkAPI) => {
  try {
    console.log('frontend',thunkAPI.getState().auth.user.token);
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


export const updateProfile = createAsyncThunk("auth/updateProfile", async (formData,thunkAPI) => {
  try {
        const token = thunkAPI.getState().auth.token;
    const response = await instance.post("/profile", formData,{
      headers: {
         Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
});


const userSlice = createSlice({

    name:"auth",
    initialState,
    reducers:{

      authenticate:(state)=>{
      state.user =  JSON.parse(localStorage.getItem('user-token'));
        
      },
     
},

    extraReducers:(builder)=>{

        builder.addCase(login.pending,(state)=>{

            state.isLoading= true;
            state.errors = null;
            state.success = null;
            state.token = null
        })
        .addCase(login.fulfilled,(state,action)=>{

            state.isLoading = false;
            state.user = action.payload;
            state.success = action.payload.message
            state.token = action.payload.token
            localStorage.setItem('user-token',JSON.stringify(action.payload))
            
        })
        .addCase(login.rejected,(state,action)=>{

              state.isLoading = false;
              state.errors = action.error.message;
              state.success = null;
              state.token = null


        })



        builder.addCase(profile.pending,(state)=>{
           state.isLoading= true;
            state.errors = null;
            state.success = null;
        })
        .addCase(profile.fulfilled,(state,action)=>{
            state.isLoading = false;
            console.log(action.payload);
            state.user = action.payload;
            state.success = action.payload.message

        })
         .addCase(profile.rejected,(state,action)=>{

              state.isLoading = false;
              state.errors = action.error.message;
              state.success = null;

        })

        builder.addCase(updateProfile.pending,(state)=>{
            state.isLoading= true;
            state.errors = null;
            state.success = null;

        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload;
            state.success = action.payload.message

        })
         .addCase(updateProfile.rejected,(state,action)=>{

              state.isLoading = false;
              state.errors = action.error.message;
              state.success = null;

        })
        
    }


})

export default userSlice.reducer;
export const {authenticate} = userSlice.actions
