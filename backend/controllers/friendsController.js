import friendsDbLayer from "../databaseLayer/friendsDbLayer.js";

const addFriend= async(req,res)=>{
    //logic for adding friends
    const result=await friendsDbLayer.addFriend(req.body);
    if (result.status === 500) {
        return res.status(500).json({status:500,message:"Something failed in adding new friend."});
    }
    else if(result.status===200){
        return res.status(200).json({status:200,message:result});
    }
    else{
        return res.status(result.status).json({status:result.status,message:result.message});
    }
};

const searchFriend=async(req,res)=>{
    const result=await friendsDbLayer.searchFriend(req.body);
    if(result?.status===200){
        return res.status(200).json({status:200,message:result?.body});
    }
    else{
        return res.status(result.status).json({status:result.status,message:result.message});
    }
}


const getAllFriends=async(req,res)=>{
    const result=await friendsDbLayer.getAllFriends(req.body);
    if(result.status===200){
        return res.status(200).json({status:200,message:result?.message})
    }
    else{
        return res.status(result.status).json({status:result?.status,message:result?.message})
    }
}

const deleteFriend=async(req,res)=>{
    const result=await friendsDbLayer.deleteFriend(req.body);
    if(result.status===200){
        return res.status(200).json({status:200,message:result?.message})
    }
    else{
        return res.status(result.status).json({status:result?.status,message:result?.message})
    }

}

const friendsController={
    addFriend,
    searchFriend,
    getAllFriends,
    deleteFriend
}

export default friendsController;