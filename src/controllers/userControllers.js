import User from "../models/user.js";

export const deleteAllUsers = async (req, res) =>{ 
    try {
        const result = await User.deleteMany({});
        if(!result || result.length === 0){
            console.log("error al elimninar usuarios")
            const response = {message:"error al elimninar usuarios", status:"Error delete users"}
            return res.status(401).json(response)
        }
        const response = {message:"usuarios eliminados con exito", status:"Delete users succes"}
        return res.status(200).json(response)

    } catch (error) {
        console.error(error)
    }
}

export const getAllUsers = async (req, res) =>{ 
    try {
        const result = await User.find();
        if(!result){
            console.log("error al encontrar usuarios")
            const response =  {message:"error al encontrar usuarios", status:"Error find users", result}
            return res.status(401).json(response)
        }
        if(result.length === 0){
            console.log("no se registran usuarios")
            const response =  {message:"no se registran usuarios", status:"Not have users"}
            return res.status(200).json(response)
        }
        const response =  {message:"usuarios encontrados con exito", status:"Find users succes", result}
        return res.status(200).json(response)

    } catch (error) {
        console.error(error)
    }
}
