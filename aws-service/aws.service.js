const fs = require('fs');
var AWS = require('aws-sdk');
var s3 = new AWS.S3({
  accessKeyId:"AKIA54GFP4UZWAJCOKOF",
  secretAccessKey:"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"
});
var myBucket = 'omermediabucket';
async function fileUpload(file){
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  params = {Bucket: myBucket, Key: file.originalname, Body: file.buffer};
  return s3.putObject(params,(err,data)=>{
    if(err) return err;
    console.log(data);
    return data;
  });
}
module.exports = {fileUpload}
