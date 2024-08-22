import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Create = () => {
  const { firebase } = useContext(FirebaseContext); // Firebase should be initialized in FirebaseContext
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [kilometer, setKm] = useState('');
  const [category, setCategory] = useState('');
  const [manufac, setManufac] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // Initial state should be null instead of an empty string
  const date = new Date();
  const navigate = useNavigate(); // Initialize useNavigate


  const handleSubmit = () => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    const storage = getStorage(firebase); // Initialize storage
    const firestore = getFirestore(firebase); // Initialize Firestore

    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: Handle upload progress here
      },
      (error) => {
        console.error("Upload failed: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("File available at", url);
          addDoc(collection(firestore, 'products'), {
            name,
            category,
            kilometer,
            price,
            manufac,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          })
            .then(() => {
              alert("Document successfully written!");
              navigate('/')

              // Optional: Reset form fields or navigate to another page
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Model Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="Name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
            <select
            className="input"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
            <option value="" disabled>Select category</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Others">Others</option>

            </select>
          <br />
          <label htmlFor="fname">Kilometer Run</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            value={kilometer}
            onChange={(e) => setKm(e.target.value)}
            name="kilometer"
          />
          <label htmlFor="fname">Manufature Date</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              value={manufac}
              onChange={(e) => setManufac(e.target.value)}
              onBlur={() => {
                if (manufac.length !== 4) {
                  alert('Manufacture date must be exactly 4 digits long');
                }
              }}
              name="manufac"
            />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ''}
          />
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
