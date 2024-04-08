import Users from "../models/users.js";

const addFriend=async (req_body)=>{
    try{
        let user = await Users.findById(req_body?.id);
       user.friends=[...user.friends,{
        userId:req_body?.userId,
        email:req_body?.email,
        name:req_body?.name,
        userName:req_body?.userName
       }]
       const result=await user.save();
        return {status:200, message:"Successfully added friend", body:result};
    }
    catch(err){
        console.log("Error in addFriends (dbLayer friends)", err);
    return {status:500, message:"Something went wrong"};

    }
}

const searchFriend=async (req_body)=>{
    try{
        const user=await Users.findOne({ $or: [{ email: req_body?.query }, { userName: { $regex: new RegExp('^' + req_body?.query + '$', 'i') } }] })
        if(!user){
            return {status:400,message:"No user found!!"}
        }
        return {status:200,body:user}
    }
    catch(err){
       console.log("Error in searchFriend (dbLayer friends)", err);
       return {status:500, message:"Something went wrong"};

    }
}

const getAllFriends=async (req_body)=>{
    try{
        const user= await Users.findById(req_body?.id);
        return {status:200,message:user?.friends}
    }
    catch(err){
        console.log("Error in getAllFriends (dbLayer friends)",err);
        return {status:500, message:"Something went wrong"};
    }
}

const deleteFriend=async (req_body)=>{
    try{
        //get the user details
        const user=await Users.findById(req_body?.id);
        
        //check if the IDtoDelete is present in friends list or not
        const friendDetail=user?.friends.find(eachFriend => eachFriend?.userId === req_body?.IDtoDelete);
        if(!friendDetail){
            return {status:400,message:"No Friend Found with specific ID!"}
        }
        console.log({
            "initial":user?.friends
        })
        user.friends.splice(user.friends.indexOf(friendDetail));
        console.log({
            "final":user?.friends
        })
        const result=await user.save();
        console.log({
            "finalp":user
        })
        return {status:200,message:result};
        
    }
    catch(err){
        console.log("Error in deleteFriend (dbLayer friends)",err);
        return {status:500, message:"Something went wrong"};

    }
}



const friendsDbLayer={
    addFriend,
    searchFriend,
    getAllFriends,
    deleteFriend
}

export default friendsDbLayer;