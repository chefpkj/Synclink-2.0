import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    unique: true
  },
  name:{
    type:String,
    required:true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends:[
    {
      userId:{
        type: String,
      },
      userName:{
        type:String
      },
      email: { type: String },
      name:{
        type:String,
      }

    }
  ],
  sharedNotes:[
    {
      note: {
        type: String
      },
      sharedBy:{
        userId:String,
        userName:String,
        email:String,
      },
      createdAt: { // This is the new attribute you wanted to add
        type: Date,
        default: Date.now // This will automatically set the date when a new sharedNote is created
      }
    }
  ],
  notes: [
    {
      note: {
        type: String
      }
    }
  ]
});

const Users = mongoose.model('Users', userSchema);

export default Users;

