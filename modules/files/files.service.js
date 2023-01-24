const { fileUpload } = require("../../aws-service/aws.service");
const { insertUpdateDelete } = require("../../query/query.service");

let imageUrl = "https://omermediabucket.s3.ap-southeast-1.amazonaws.com/"
async function uploadFile(req,res){
    try {
        if(req.files && req.files.length>0){
            req.files[0].imageUrl = imageUrl;
            fileUpload(req.files[0]);
            insertUpdateDelete("insert into media (name, size, url, type, createdAt, updatedAt) values (?,?,?,?,now(),now())",[req.files[0].originalname,req.files[0].size,req.files[0].imageUrl+req.files[0].originalname,req.files[0].originalname]);
            return res.json({message:"File Uploaded Sucessfully",success:true});
        }
        return res.json({message:"Error on uploading error",success:false})
        
    } catch (error) {
        return res.json({message:error.message,expection:error?.stack,success:false})
    }
}
module.exports = {uploadFile}
