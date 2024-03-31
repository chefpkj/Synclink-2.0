import Users from "../models/users.js";
import mongoose from 'mongoose';

const getAllNotes = async (req_body_id) => {
  //getting the user information to send ALLNotes
  const user = await Users.findById(req_body_id);
  return user?.notes;
};

const addNotes = async (req_body) => {
  try {
    let user = await Users.findById(req_body?.id);
    console.log(user,"end")
    user.notes = [...user?.notes, {
      note:req_body?.note
    }
    ];
    const result = await user.save();
    return result;
  } catch (err) {
    console.log("Error in addNotes (dbLayer notes)", err);
    return 500;
  }
};

const getSpecificNotes = async (req_body) => {
  try {
    let user = await Users.findById(req_body?.id);
   const noteId = req_body?.notesId;
   const note = user.notes.find(note => note._id.toString() === noteId);

    if (!note) {
      return {
        status: 400,
        details: "Note with given Id not found.",
      };
    } else {
      return {
        status: 200,
        details: note,
      };
    }
  } catch (err) {
    console.log("Error in getSpecificNotes(dbLayer notes)", err);
    return {
      status: 500,
      details: err,
    };
  }
};

const updateNotes = async (req_body) => {
  try {
    //getting user from Db
    const user = await Users.findById(req_body?.id);
    //checking if notes id is pesent or not
    const noteId = req_body?.notesId;
   const note = user.notes.find(note => note._id.toString() === noteId);
   if (!note) {
    return {
      status: 400,
      details: "Note with given Id not found.",
    };
  }
    //if note is present make the update

   user.notes=user?.notes?.map((eachNotes)=>{
    if(eachNotes?._id===noteId){
      eachNotes.note=req_body?.updatedNotes
    }
    return eachNotes;
   })
    // user?.notes[req_body?.notesId] = req_body?.updatedNotes; 
    const SavedResult = await user.save();
    return {
      status: 200,
      details: SavedResult,
    };
  } catch (err) {
    console.log("Error in updateNotes(dbLayer notes)", err);
    return {
      status: 500,
      details: err,
    };
  }
};

const deleteNotes = async (req_body) => {
  try {
    //getting user from Db
    const user = await Users.findById(req_body?.id);
    //checking if notes id is pesent or not
    // const result = user?.notes[req_body?.notesId];
    const noteId = req_body?.notesId;
    const result=user?.notes.find(note => note._id.toString() === noteId);
    if (!result) {
      return {
        status: 400,
        details: "Note with given Id not found.",
      };
    }
    //if note is present delete the notes
    user.notes.splice(user.notes.indexOf(result), 1);
    await user.save();
    return {
      status: 200,
      details: "Deleted successfully.",
    };
  } catch (err) {
    console.log("Error in deleteNotes(dbLayer notes)", err);
    return {
      status: 500,
      details: err,
    };
  }
};

const shareNotes = async (req_body) => {
  try {
    //getting user from Db
    const user = await Users.findById(req_body?.id);
    //checking if notes id is pesent or not
    const result = user?.notes[req_body?.notesId];
    if (result === undefined) {
      return {
        status: 400,
        details: "Note with given Id not found.",
      };
    }
    //if note is present share it with others users
    const AllUsers = await Users.find({ id: { $ne: req_body?.id } });
    AllUsers.map(async (eachUser) => {
      eachUser.notes.push(result);
      const tempResult = await eachUser.save();
    });

    return {
      status: 200,
      details: "Note have been successfully shared with all users.",
    };
  } catch (err) {
    console.log("Error in shareNotes(dbLayer notes)", err);
    return {
      status: 500,
      details: err,
    };
  }
};

const search = async (req_body) => {
  try {
    //getting user from Db

    const user = await Users.findById(req_body?.id);
    const result = [];
    
    //searh logic
    user?.notes.map((eachNotes) => {
      let position = eachNotes.search(new RegExp(req_body?.keyword, "i"));
      if (position != -1) {
        result.push(eachNotes);
      }
    });
    return {
      status: 200,
      details: result,
    };
  } catch (err) {
    console.log("Error in search(dbLayer notes)", err);
    return {
      status: 500,
      details: err,
    };
  }
};

const notesDbLayer = {
  getAllNotes,
  addNotes,
  getSpecificNotes,
  updateNotes,
  deleteNotes,
  shareNotes,
  search,
};

export default notesDbLayer;
