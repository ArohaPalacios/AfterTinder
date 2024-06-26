import React, { useState, useEffect } from "react";
import axios from 'axios';
import{useNavigate } from "react-router-dom"

export default function PartnersData({updateUserLoveLanguages}) {
    const navigate = useNavigate()
    const [partnersData, setPartnersData]= useState([])
    useEffect(() => {
        //Make sure partnersData is empty before populating it with db data.
        setPartnersData([])
        getPartnersData()
        
        }, []);
    
    
      //Fetch data from DB
      //Populate partnersData with the hours of sleep of the user.
    const getPartnersData = async () => {
         //get the token from the local storage
        const token = localStorage.getItem("token");
          try {
            //when creating the frontend routes to nested children, the path to the backend was not valid anymore
            //had to write the right specific path to the 4000 port
            //axios.get doesn't need to specify the method.
            //we need to pass the token in the headers.
            const {data} = await axios("http://localhost:4000/users/partners_data", {
              headers: {
                authorization: `Bearer ${token}`,
              }
            })
            isThereData(data)
            //setData with received data
            setPartnersData(data)
        
            }catch (err) {
                console.error("Error fetching partners data:", err);
                //console.log(err)
                window.alert("failed to get your data")
                //set data to null if something goes wrong
                setPartnersData(null)
            }
          };
    
    function isThereData (data) {
        if (!data.length) {
            window.alert("We couldn't find an active relationship. You will be able to access this section when both you and your partner have registered the relationship")
            navigate("/")
            
        } else{ 
          sendLoveLanguageToParent(data)}
    }

    function sendLoveLanguageToParent(data){
        updateUserLoveLanguages(data)

    }

    return 
};