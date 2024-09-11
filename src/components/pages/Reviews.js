import React, { useEffect, useState } from "react";
import '../styling/Reviews.css';
import {firestore} from '../../firebase/Firebase';
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from "firebase/firestore"; // Import Firestore methods

// ICONS

import { IoIosStar } from "react-icons/io";

export default function Reviews() {
  const [accommodationsWithReviews, setAccommodationsWithReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = firestore;

  // Fetch accommodations with reviews
  useEffect(() => {
    const fetchAccommodationsWithReviews = async () => {
      setLoading(true);

      try {
        // Query to fetch accommodations where reviews field exists and is not empty
        const accommodationsQuery = query(
          collection(db, "accommodations"),
          where("reviews", "!=", []) // Fetch accommodations that have reviews
        );

        const querySnapshot = await getDocs(accommodationsQuery);

        const fetchedAccommodations = [];

        querySnapshot.forEach((doc) => {
          const accommodationData = doc.data();
          // If there are reviews, add them to the array
          if (accommodationData.reviews && accommodationData.reviews.length > 0) {
            accommodationData.reviews.forEach((review) => {
              fetchedAccommodations.push({
                ...review,
                accommodationId: doc.id, 
                accommodationName: accommodationData.title,
                location: accommodationData.location,
                image: accommodationData.images[0],
              });
            });
          }
        });

        setAccommodationsWithReviews(fetchedAccommodations); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accommodations with reviews:", error);
        setLoading(false);
      }
    };

    fetchAccommodationsWithReviews();
  }, [firestore]);

  // Delete a specific review
  const handleDeleteReview = async (accommodationId, UniqueReviewId) => {
    try {
      // Create a reference to the accommodation document
      const accommodationRef = doc(firestore, "accommodations", accommodationId);
      
      // Fetch the accommodation document
      const accommodationDoc = await getDoc(accommodationRef);
  
      if (accommodationDoc.exists()) { // Check if the document exists
        const accommodationData = accommodationDoc.data();
  
  
        if (accommodationData.reviews) {
    
          const updatedReviews = accommodationData.reviews.filter(
            (review) => review.UniqueReviewId !== UniqueReviewId
          );
  
          // Update Firestore document with the new reviews array
          await updateDoc(accommodationRef, { reviews: updatedReviews });
          alert("Successfully deleted a review");
  
          // Update state to reflect the deleted review
          setAccommodationsWithReviews((prevReviews) =>
            prevReviews.filter(
              (review) => review.accommodationId !== accommodationId || review.UniqueReviewId !== UniqueReviewId
            )
          );
        } else {
          console.error("No reviews found for this accommodation.");
          alert("No reviews found for this accommodation.");
        }
      } else {
        console.error("Accommodation document not found.");
        alert("Accommodation document not found.");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Error deleting review:");
    }
  };
  
  
  
  return (
    <div className="reviews-overlay">

        <div className="review-header">
            <h1>Reviews</h1>
        </div>
      <div className="reviews-content">
        
        {/* REVIEWS SECTION */}
        <div className="reviews">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="reviews-gallery">
              {/* REVIEWS CARDS */}
              {accommodationsWithReviews.map((review, index) => (
                <div className="reviews-card" key={index}>
                  <div className="reviews-card-image">
                    <img src={review.image} alt={review.accommodationName} />
                  </div>
                  <div className="reviews-card-review">
                    <p>{review.review}</p>
                    <br></br>
                    <p><strong>Date: </strong> {review.createdAt}</p>
                  </div>
                  <div className="reviews-card-user">
                    <p>
                        <strong>{review.fullName}</strong>
                      
                        <br></br>
                        {review.location}
                    </p>

                    <div className="star-box">
                        <p>{review.rating}</p>
                        <IoIosStar className="star"/>
                    </div>
                  </div>
                  <button className="delete-image" onClick={() => handleDeleteReview(review.accommodationId, review.UniqueReviewId)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
