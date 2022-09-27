import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Card() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const [file, setNewFile] = useState("");
  const API = "http://localhost:3005";
  const getApiData = async (url) => {
    try {
      const res = await axios.get(url);
      setMyData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getApiData(`${API}/card`);
  }, []);

  const postData = (e) => {
    axios
      .post(`http://localhost:3005/card`, {
        fname,
        lname,
        email,
        file,
      })
      .then((res) => console.log("posting data", res))
      .catch((error) => console.log(error));
  };
//   function preview_image(event) {
//     if (event.target.files) {
//       var reader = new FileReader();
//       reader.readAsDataURL(event.target.files[0]);
//       reader.onload = function () {
//         let myimg  = new Image();
//         myimg.src = event.target.result;
//         setImage(myimg.src)
//         console.log(myimg.src)
//       };
      
//     }
//   }
  function handleSetImagePath(e) {
    if (e.target.files) {
      let imageFile = e.target.files[0]; //here we get the image file
      var reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) {
        let myImage = new Image(); // Creates image object
        myImage.src = e.target.result;
        setNewFile(myImage.src);
      }
    }
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary m-5"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Create Card
      </button>

      {isError !== "" && <h2>{isError}</h2>}
      <div className="row">
        {myData.map((post) => {
          const { id, fname, lname, email, file } = post;
          return (
            <div key={id} className="col-4">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      id="output_image"
                      className="img-fluid rounded-start"
                      alt="..."
                      src={file}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{fname}</h5>
                      <p className="card-text">{lname}</p>
                      <p className="card-text">
                        <small className="text-muted">{email}</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="  m-auto">Your Info here</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-10">
                  <label htmlFor="validationCustom01" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Mark"
                    value={fname}
                    required
                    onChange={(e) => setFname(e.target.value)}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-10">
                  <label htmlFor="validationCustom02" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Otto"
                    value={lname}
                    required
                    onChange={(e) => setLname(e.target.value)}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-10">
                  <label
                    htmlFor="validationCustomUsername"
                    className="form-label"
                  >
                    Username
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">
                      @
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please choose a username.
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    File Upload
                  </label>
                  <input type="file" id="img" name="img" accept="image/*" onChange={e => { handleSetImagePath(e) }} />
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={postData}
                  >
                    Submit form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
