import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails && postDetails.userId) {
        const db = getFirestore(firebase); // Initialize Firestore
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('id', '==', postDetails.userId));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } else {
        console.warn("postDetails or userId is undefined:", postDetails);
      }
    };

    fetchUserDetails();
  }, [firebase, postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.url}
          alt={postDetails?.name || "Product Image"}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.manufac}</p>
          <span>{postDetails?.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.name}</p>
            <p>{userDetails.phone}</p>
            <p>{userDetails.address}</p>
            <p>{userDetails.pincode}</p>



          </div>
        )}
      </div>
    </div>
  );
}

export default View;
