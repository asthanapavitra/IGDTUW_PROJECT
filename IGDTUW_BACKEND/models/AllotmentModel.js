const mongoose=require('mongoose');
const allotmentSchema=new mongoose.Schema(
{
    department:String,
     subject:{
      type:String,
     },
     section:String,
     semester:String,
  }
)
module.exports=mongoose.model('Allotment',allotmentSchema);