import mongoose from "mongoose";

const validateMongoDbId = (id: string) =>{
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new Error("Invalid Id found")
}

export default validateMongoDbId