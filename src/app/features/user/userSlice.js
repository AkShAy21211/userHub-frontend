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
    console.log('formdata...',formData);
    const response = await instance.post("/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.message;
  }
});





const userSlice = createSlice({

    name:"auth",
    initialState,
    reducers:{

      authenticate:(state)=>{
      state.user =  JSON.parse(localStorage.getItem('user-token'));
        
      },

      logout:(state)=>{

        state.user = null
        state.token=null
        state.isLoading=null
        state.success=null
        state.errors= null
        localStorage.removeItem('user-token')
      }
     
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

        
    }


})

export default userSlice.reducer;
export const {authenticate,logout} = userSlice.actions
