import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ResumeDisplay from '../components/Resumedisplay';

function ViewDetails() {
  const { userId: paramUserId } = useParams(); 
  const [candidateData, setCandidateData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getStoredUserId() {
    const userId = localStorage.getItem('userId'); 

    if (userId) {
  
      console.log('User ID:', userId);
      return userId;
    } else {
      console.log('User ID not found in localStorage');
      return null;
    }
  }
  

  const getCandidateInfo = (paramUserId) => {
    if (paramUserId) {
      axios.get(`/fetchcandidateinfo/${paramUserId}`) // Use paramUserId here
        .then((response) => {
          setCandidateData(response.data.result);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setError("User profile not found");
          setLoading(false);
        });
    }
  }

  // Use useEffect to fetch candidateData when the component mounts or when userid changes
  useEffect(() => {
    const loggedInUserId = getStoredUserId();
    getCandidateInfo(loggedInUserId);
  }, []);


  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ResumeDisplay candidateData={candidateData} />
      )}
    </div>
  );
}

export default ViewDetails;
