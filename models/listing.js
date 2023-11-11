const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        type : String,
        default :  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bsr.org%2Fen%2Ffocus%2Fnature&psig=AOvVaw36TLjyoZufHIbRczsLErqk&ust=1698152566556000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiPo72cjIIDFQAAAAAdAAAAABAD",
        set: (v) => (v === "" ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bsr.org%2Fen%2Ffocus%2Fnature&psig=AOvVaw36TLjyoZufHIbRczsLErqk&ust=1698152566556000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiPo72cjIIDFQAAAAAdAAAAABAD" : v),
    },
    price : Number,
    location : String,
    country : String
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;


