import React, { useState } from "react";
import "../Style/ReactContact.css";
import { toast } from "react-toastify";

const Reactcontact = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  let name, value;
  const getUserData = (event) => {
    // event.PreventDefault();
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, address, message } = user;

    if (name && email && phone && address && message) {
      const res = await fetch(
        "https://fir-form-6ffa9-default-rtdb.firebaseio.com/firebase form.json",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address,
            message,
          }),
        }
      );
      if (res) {
        setUser({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
        toast.success("Data Successfully Stored in Firebase");
      }
    } else {
      toast.error("Please fill all the Data fields");
    }
  };

  return (
    <>
      <div className="container">
        <div className="text">Contact us Form</div>
        <form action="#" method="POST">
          <div className="form-row">
            <div className="input-data">
              <div className="underline"></div>
              <input
                type="text"
                required
                name="name"
                value={user.name}
                onChange={getUserData}
              />
              <label htmlFor="">First Name</label>
            </div>
            <div className="input-data">
              <input
                type="text"
                required
                name="email"
                value={user.email}
                onChange={getUserData}
              />
              <div className="underline"></div>
              <label htmlFor="">Email Address</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                type="tel"
                required
                name="phone"
                value={user.phone}
                onChange={getUserData}
              />
              <div className="underline"></div>
              <label htmlFor="">Mobile Number</label>
            </div>
            <div className="input-data">
              <input
                type="text"
                required
                name="address"
                value={user.address}
                onChange={getUserData}
              />
              <div className="underline"></div>
              <label htmlFor="">Address</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data textarea">
              <textarea
                rows="8"
                cols="80"
                required
                name="message"
                value={user.message}
                onChange={getUserData}
              ></textarea>
              <br />
              <div className="underline"></div>
              <label htmlFor="">Write your message</label>
              <br />
            </div>
          </div>

          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner"></div>
              <input type="submit" value="submit" onClick={postData} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Reactcontact;
