import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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

