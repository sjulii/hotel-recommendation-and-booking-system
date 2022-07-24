import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
//import Algoliaplaces from "algolia-places-react";
import { useSelector } from "react-redux";

import { DatePicker, Select } from "antd";
import moment from "moment";
import "antd/dist/antd.css";

import { createHotel } from "../actions/hotel";

// const config={
//   appId:process.env.REACT_APP_ALGOILA_APP_ID,
//   apiKey:process.env.REACT_APP_ALGOILA_API_KEY,
//   language:'en',
//   countires:[]
// }
const { Option } = Select;
const NewHotel = () => {
const {auth}=useSelector((state)=>({...state}))
const {token}=auth

  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    bed: "",
    from: "",
    to: "",
  });

  const { title, content, location, image, price, bed, from, to } = values;

  const [preview, setPreview] = useState(
    "https:/abc.com/50x50.png?text=PREVIEW"
  );

  const handleSubmit = async(e) => {

    e.preventDefault()
    //console.log(values)
  let hotelData=new FormData()
  hotelData.append("title",title);
  hotelData.append("content",content);
  hotelData.append("location",location);
  hotelData.append("price",price);
  hotelData.append("bed",bed);
  hotelData.append("from",from);
  hotelData.append("to",to);
  image && hotelData.append("image",image);

 
  console.log([...hotelData])
  let res=await createHotel(token,hotelData)
  console.log("hote create re",res)
  toast("new hotel is posted")
  setTimeout(()=>{window.location.reload()},1000)
  };


  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const hotelForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            
            hidden
          ></input>
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        ></input>
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="content"
          className="form-control m-2"
          value={content}
        />
        {/* <Algoliaplaces
       className="form-control ml-2 mr-2"
       placeholder="location"
       defaultValues={location}
       options={config}
       onChange={({suggestion})=>setValues({...values,location:suggestion.value})}

       style={{height:'50px'}} /> */}

        <input
          type="text"
          name="location"
          onChange={handleChange}
          placeholder="location"
          className="form-control m-2"
          value={location}
        ></input>

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="price"
          className="form-control m-2"
          value={price}
        ></input>
        {/* <input
          type="number"
          name="bed"
          onChange={handleChange}
          placeholder="Number of beds"
          className="form-control m-2"
          value={bed}
        ></input> */}
        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="number of beds"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
        </Select>
        <DatePicker
          placeholder="from date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
        <DatePicker
          placeholder="to date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, to: dateString })
          }
          disabledDate=
        {(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
        />
        
      </div>
      <button className="btn btn-outline-primary m-2">save</button>
    </form>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1> NewHotel</h1>
      </div>
      <div className="containr-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            {hotelForm()}
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
