import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { instance } from "../../../services/api";


const initialState = {
    sussess: null,
    error :null,
    posts:[]
}

export const createPost =  createAsyncThunk('post/createPost',async(postData,thunkAPI)=>{

     try {
    const token = thunkAPI.getState().auth.user.token;
    const response = await instance.post("/create",postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":"multipart/form-data"

      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
})
export const getPost =  createAsyncThunk('post/getPost',async(_,thunkAPI)=>{

     try {
    const token = thunkAPI.getState().auth.user.token;
    const response = await instance.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
})

export const deletePost =  createAsyncThunk('post/deletePost',async(postID,thunkAPI)=>{

     try {
    const token = thunkAPI.getState().auth.user.token;
    const response = await instance.delete(`/delete/${postID}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data.message : error.message;
  }
})

const postSlice = createSlice({

    name:"post",
    initialState,
    extraReducers:(builder)=>{

        builder.addCase(createPost.pending,(state)=>{

            state.error=null;
            state.sussess=null;
        })
         .addCase(createPost.fulfilled,(state,action)=>{

            state.sussess ='Post created duccessfully';
            state.error = null;
        })
         .addCase(createPost.rejected,(state,action)=>{

            state.error=action.error.message;
            state.sussess = null;
        })

        
       builder.addCase(getPost.pending,(state)=>{

            state.error=null;
            state.sussess=null;
            state.posts = null;
        })
         .addCase(getPost.fulfilled,(state,action)=>{

             state.posts = action.payload;
             state.error=null;


        })
         .addCase(getPost.rejected,(state,action)=>{

            state.error=action.error.message;
            state.posts =null;
        
        })

          builder.addCase(deletePost.pending,(state)=>{

            state.error=null;
            state.sussess=null;
        })
         .addCase(deletePost.fulfilled,(state,action)=>{

             state.error=null;
             state.sussess = action.payload.msg;
             state.posts = action.payload.posts;

        })
         .addCase(deletePost.rejected,(state,action)=>{

            state.error=action.error.message;
        
        })
    }
})



export default postSlice.reducer; 