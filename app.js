const express = require("express")
const app = express();

// airbnb
const mongoose = require("mongoose")
const Listing = require("./models/listing.js");
const path = require("path");
const { request } = require("http");
app.use(express.urlencoded({extended:true}));
const methodOveride = require("method-override");
app.use(methodOveride("_method"));

const ejsMate = require("ejs-mate");
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));






const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
main().then(()=>{
    console.log("connected To database")
}).catch(err=>{
    console.log("not connected")
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(request,responce)=>{
    responce.send("Hi i am pranav khaire");
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// index route
app.get("/listings", async(request,responce)=>{
    const allListings = await Listing.find({});
    responce.render("./listings/index.ejs",{allListings});
});

// new route
app.get("/listings/new", async(request,responce)=>{
    responce.render("./listings/new.ejs");
});

// show route
app.get("/listings/:id", async(request,responce)=>{
    let {id} = request.params;
    const listing = await Listing.findById(id);
    responce.render("./listings/show.ejs",{listing});
});

// Edit route
app.get("/listings/:id/edit",async(request,responce)=>{
    let {id} = request.params;
    const listing = await Listing.findById(id);
    responce.render("./listings/edit.ejs",{listing});
});



//Update Route
app.put("/listings/:id",async(request,response)=>{
    let {id} = request.params;
    await Listing.findByIdAndUpdate(id,{...request.body.listing});
    response.redirect(`/listings/${id}`);
});

// Delete route
app.delete("/listings/:id",async(request,response)=>{
    let {id} = request.params;
    let deleteListings = await Listing.findByIdAndDelete(id);
    console.log(deleteListings);
    response.redirect("/listings");
})


app.post("/listings",async(request,response)=>{
    const newListing = new Listing(request.body.listing);
    await newListing.save();
    response.redirect("/listings");
});



  


// app.get("/testListing", async (request,responce)=>{
//     let sampleListing = new Listing({
//         title : "Khaire House",
//         description : "Super Cool",
//         price : 1500,
//         location : "Harsul , Nashik",
//         country : "India",
//     })
//     await sampleListing.save();
//     console.log("sample was save.");
//     responce.send("successfully testing");
// });


app.listen(8080,()=>{
    console.log("Sever is listing to post 8080");
});