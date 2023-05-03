module.exports.fileUpload = async (req , res) => {
    try {
        if(req.file){
            return res.status(200).json({
                message:"file uploaded successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message,
        })
    }
}