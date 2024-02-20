const mongoose = require("mongoose")


let pl = mongoose.Schema;
const packagedetailsschema = new pl({
    packid: String,
    packname: String,
    pprice: Number,

    pdescription: String,
    status: String,
    image: {
        data: Buffer,
        contentType: String,
    }
});

var packagedetailsmodel = mongoose.model("Package", packagedetailsschema)
module.exports = packagedetailsmodel;