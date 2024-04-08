import sharedNotesDbLayer from "../databaseLayer/sharedNotesDbLayer.js";

const getAllSharedNotes=async (req,res)=>{
    const result=await sharedNotesDbLayer.getAllNotes(req.body);
    
    if(result?.status===200){
        return res.status(200).json({status:200,message:result?.message});
    }
    else{
        return res.status(result.status).json({status:result.status,message:result.message});
    }
    
}

const getSpecificSharedNotes=async(req,res)=>{
    req.body.noteId=req.params?.id;
    const result=await sharedNotesDbLayer.getSpecificSharedNotes(req.body);
    console.log({
        "t=pkj":result
    })
    if(result?.status===200){
        return res.status(200).json({status:200,message:result?.message});
    }
    else{
        return res.status(result.status).json({status:result.status,message:result.message});
    }
}

const addShareNotes=async(req,res)=>{

    const result=await sharedNotesDbLayer.addShareNotes(req.body);
    if(result?.status===200){
        return res.status(200).json({status:200,message:result?.message});
    }
    else{
        return res.status(result.status).json({status:result.status,message:result.message});
    }
}
const deleteShareNotes=async(req,res)=>{

    const result=await sharedNotesDbLayer.deleteShareNotes(req.body);
    if(result?.status===200){
        return res.status(200).json({status:200,message:result?.message});
    }
    else{
        return res.status(result.status).json({status:result.status,message:result.message});
    }

}



const sharedNotesController={
    getAllSharedNotes,
    addShareNotes,
    deleteShareNotes,getSpecificSharedNotes
}

export default sharedNotesController;