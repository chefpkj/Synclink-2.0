import Users from "../models/users.js";

const getAllNotes=async (req_body)=>{
    try{
        const user=await Users.findById(req_body?.id);
        console.log({
            "user":user
        })
        return {status:200,message:user?.sharedNotes};
    }
    catch(err){
        console.log("Error in getAllNotes (dbLayer sharedNotes)",err);
        return {status:500, message:"Something went wrong"};
    }
}

const getSpecificSharedNotes=async (req_body)=>{
    try{
        let user = await Users.findById(req_body?.id);
        const specificSharedNotes=user.sharedNotes.find(eachNote=>eachNote?._id.toString()===req_body?.noteId);

        if (!specificSharedNotes) {
            return {
              status: 400,
              message: "Note with given Id not found.",
            };
          } else {
            return {
              status: 200,
              message: specificSharedNotes,
            };
          }

    }
    catch(err){
        console.log("Error in getSpecificSharedNotes(dbLayer sharedNotes)", err);
       return {
        status: 500,
        message: err,
       };

    }
}

const addShareNotes=async (req_body)=>{
    try{
         //check if the user's firend exists or not
    const user=await Users.findById(req_body?.userId);
    if(!user){
        return {status:400,message:"Friend with provided userId not found!"}
    }
    user.sharedNotes.push({
        note:req_body?.note,
        sharedBy:{
            userId:req_body?.id,
            userName:req_body?.myUserName,
            email:req_body?.myEmail
        }
    })
    const result=await user.save();
    
    return {status:200,message:result}

    }
    catch(err){
        console.log(err);
        return {status:500,message:"Error in getAllNotes (dbLayer sharedNotes)"};

    }

}

const deleteShareNotes=async(req_body)=>{
    try{
       
   const user=await Users.findById(req_body?.id);
   console.log({
    "my pkj":user?.sharedNotes
   })
   const targetedNotes=user?.sharedNotes.find((eachNotes)=>{
    console.log({
        "each":eachNotes?._id,
        "postman":req_body?.notesId
    })

    return eachNotes?._id.toString()===req_body?.notesId;


   }
    
   )
   //if requested notes is not in the user's sharedNotes 
   if(!targetedNotes){
    return {status:404,message:"Shared Notes not found with given ID."}
   }
   user.sharedNotes.splice(user?.sharedNotes.indexOf(targetedNotes),1);
  
   const result=await user.save();
   
   return {status:200,message:result}

   }
   catch(err){
       console.log(err);
       return {status:500,message:"Error in getAllNotes (dbLayer sharedNotes)"};

   }

}



const sharedNotesDbLayer={
    getAllNotes,
    addShareNotes,
    deleteShareNotes,
    getSpecificSharedNotes
}

export default sharedNotesDbLayer;