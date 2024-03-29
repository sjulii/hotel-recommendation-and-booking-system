const Hotel = require("../models/hotel");
const User = require("../models/user");
const RegisteredHotel = require("../models/registeredHotels");
const fs = require("fs");

const createHotel = async (req, res) => {
  
  console.log("req fields",req.fields)
  // console.log("req files",req.files)

  try {
    let fields = req.fields;
    let files = req.files;
    console.log(files.image.contentType);
    console.log(fields)

    let hotel = new Hotel(fields);
    let id=req.user._id
    hotel.postedBy = req.user._id;

    let room=await RegisteredHotel.findByIdAndUpdate(id,{$push:{hotels:hotel._id}},{new:true})
    
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
      hotel.save((err, result) => {
        if (err) {
          console.log("saving hotel error", err);
          res.status(400).send("error saving");
        }
        res.json(result);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const hotels = async (req, res) => {
  console.log(req)
  let all = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  let all1 = all.filter(function (item) {
    return item.isavailable === false;
  });
  console.log(all1);
  res.json(all1);
};

const image = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelID).exec();
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set("Content-Type", hotel.image.contentType);
    return res.send(hotel.image.data);
  } else {
    res.status(400).send("image dont found");
  }
};

const sellerHotels = async (req, res) => {
  
  let all = await Hotel.find({ postedBy: req.user._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.send(all);
};

const read = async (req, res) => {
  console.log(req.params.hotelID);
  let hotel = await Hotel.findById(req.params.hotelId)
    .select("-image.data")
    .exec();
    console.log(hotel)
  res.json(hotel);
};

const registerHotel = async (req, res) => {
  console.log("req fields", req.fields);
  try {
    // console.log("req fields",req.fields.pan_number)

    let fields = req.fields;
    let email = fields.email;
    console.log(pan_number);
    let hotelExist = await RegisteredHotel.findOne({ email }).exec();
    if (hotelExist) return res.status(400).send("hotel is already registered");
    let seller = await User.findById(req.user._id);
    seller.isSeller = true;
    seller.save((err, result) => {
      if (err) {
        console.log("registering hotel error", err);
        res.status(400).send("error saving");
      }
    });

    console.log(seller);
    let hotel = new RegisteredHotel(fields);
    hotel.registeredBy = req.user._id;
    hotel.save((err, result) => {
      if (err) {
        console.log("registering hotel error", err);
        res.status(400).send("error saving");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    let fields = req.fields;

    let files = req.files;
    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;
      data.image = image;
    }
    console.log(req.params.hotelID);
    let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
      new: true,
    })
      .select("-image.data")
      .exec();

    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

const searchListing = async (req, res) => {
  const { location, date, bed } = req.body;
  console.log(location, date, bed);
  let result = "";
  if (location !== "") {
    result = await Hotel.find({ location }).select("-image.data").exec();
  } else {
    result = await Hotel.find({}).limit(20).select("-image.data").exec();
  }

  if (bed !== "") {
    result = result.filter((h) => h.bed == bed);
  }

  if (date !== "") {
    let fromDate=date.split(",")
    result = result.filter((h) => h.from >= new Date(fromDate[0]));
  }

  res.json(result);
};



module.exports = {
  createHotel,
  hotels,
  image,
  sellerHotels,
  read,
  registerHotel,
  update,
  searchListing,
};
