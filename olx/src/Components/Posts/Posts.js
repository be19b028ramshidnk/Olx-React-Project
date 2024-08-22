import React, { useEffect, useContext, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of Navigate

function Posts() {
  const { firebase } = useContext(FirebaseContext); // Ensure that Firebase is correctly initialized
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore(firebase); // Get Firestore instance
        const querySnapshot = await getDocs(collection(db, 'products')); // Get documents from 'products' collection
        const allPosts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(allPosts); // Set the state with the fetched data
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              onClick={() => {
                setPostDetails(product);
                navigate('/view');
                console.log(product) // Use navigate to change the route
              }}
              className="card"
              key={product.id}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">Km {product.kilometer}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map((product) => (
            <div
              onClick={() => {
                setPostDetails(product);
                navigate('/view');
                console.log(product) // Use navigate to change the route
              }}
              className="card"
              key={product.id}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">Km {product.kilometer}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
        </div>
        </div>
  );
}

export default Posts;
