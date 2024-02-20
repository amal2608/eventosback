const mongoose = require("mongoose")


let pl = mongoose.Schema;
const fooddetailsschema = new pl({
    fdid: String,
    fdname: String,
    fdtype: String,
    
    price: Number,
    description: String,
 
    plantphoto:{
        data : Buffer,
        contentType:String,
    },
    status:String
});

var fooddetailsmodel = mongoose.model("Food", fooddetailsschema)
module.exports = fooddetailsmodel;