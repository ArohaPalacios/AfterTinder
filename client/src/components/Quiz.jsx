import React, { useState, useEffect, useParams } from "react";
import axios from "axios";
import quizData from "../assets/lovelanguagequiz";
//useNavigate will take the user to the view we want programmatically. 
//That means it doesn't depend on a user action. It depends on if a condition is met or not.
//UseLocation is a react context and it allows us to  keep track of some data, like the URL path.
//I will modify this 
import { useNavigate, useLocation } from "react-router-dom";

export default function Quiz() {
    const navigate = useNavigate()
    const location = useLocation();
    //this gets the path we're in(quizQuestions/:index) and will help us map through the json quiz object based on the index of the path.
    const pathIndex = parseInt(location.pathname.split("/")[2]);
    const radioButtonElements = document.getElementsByName("options");
    const isChecked = Array.from(radioButtonElements).some(element => element.checked);
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState({
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0
    });
  
//Get the selection from the user and update the userAnswers state.
//The userAnswers state is an object where the key is the index of the question, and the value is the answer of the user.
//if the user changes their mind and go back, this will store the updated data.
//it doesn't matter if the user goes back with the "previous" button or with the browser. it works bothways.
function handleOptionSelect(event) {
    const value = event.target.value;
    const key = pathIndex
    setUserAnswers(prevState => ({
        ...prevState,
        [key]: value
      }));       
}

function clearInput(){
    for(let i=0;i<radioButtonElements.length;i++)
    radioButtonElements[i].checked = false;
}
//the buttons "<<" and ">>" send a previous or next action.
//"previous" will take you to the previous question. And if you keep clicking it will take you to the instructions.
//"next" will take you to next question. And if you already finished all questions, it will trigger the function to calculate results.
function handleClick(action) {
    clearInput()
    let nextIndex = pathIndex + 1
    let prevIndex = pathIndex -1
    
    if (action === "next") {
        if(!isChecked){
            window.alert("please, select an option")
            return
        } else if (pathIndex===quizData[0].Quiz.Options.length -1 && Object.keys(userAnswers).length ===quizData[0].Quiz.Options.length ) {
            const answers = Object.values(userAnswers);
            console.log(answers)
            calculateResults(answers);
            
         } else {navigate(`/QuizQuestions/${nextIndex}`)
    }  
        
    } else if (action === "prev") {
        if (pathIndex > 1) {
            navigate(`/QuizQuestions/${prevIndex}`)
        } else {navigate("/QuizInstructions")}
    }
}

    function calculateResults(answers) {
        const count = {
            A: 0,
            B: 0,
            C: 0,
            D: 0,
            E: 0
        };

        Object.values(answers).forEach(answer => {
            count[answer]++;
        });

        const totalQuestions = quizData[0].Quiz.Options.length;
        const maxScore = 12;
        const percentageResults = {};
        Object.keys(count).forEach(letter => {
            percentageResults[letter] = ((count[letter] / totalQuestions) * maxScore * 100 / maxScore).toFixed(0);
        console.log(percentageResults)
        });
//converting the percentage strings obtainted from percentages
//into integers using parseInt
        const loveLanguageScores = {
            qualityTime: parseInt(percentageResults['A']),
            touch: parseInt(percentageResults['B']),
            wordsOfAffirmation: parseInt(percentageResults['C']),
            actsOfService: parseInt(percentageResults['D']),
            receiveGifts: parseInt(percentageResults['E'])
        };
        console.log(loveLanguageScores)
        // setResults(percentageResults); -->we don't need to store the results in a state variable  because we don't need them in the frontend. But how are they stored then? temporarily?
        //we send them directly to the backend, because the component that fetches the user results, calls to the database directly.
        addDataToEntriesDB(loveLanguageScores) 
     }

     async function addDataToEntriesDB(loveLanguageScores) {
        const token = localStorage.getItem("token");
        try {
            console.log("Sending request to backend..."); // Add console log here
            await axios.post("http://localhost:4000/users/loveLanguage", loveLanguageScores, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Request successful!"); 
            navigate("/QuizResults")
        } catch (error) {
            console.error("Error adding data to entries:", error); 
        }
    }
    

    return (
        <>
           <h3>{quizData[0].Quiz.Statement}</h3>
            {Object.entries(quizData[0].Quiz.Options[pathIndex]).map(([letter, option], index) => (
                <div key={index}> 
                <input 
                    key={index}
                    value={letter}
                    type="radio"
                    name="options"
                    onChange={handleOptionSelect} />
                    <label>{option}</label>
                    </div>
            ))}
            <button type="button" onClick={() => handleClick("prev")}>‹‹</button>
            <button type="button" onClick={() => handleClick("next")}>››</button>
            
            <h4>User Answers:</h4>
        <ul>
            {Object.entries(userAnswers).map(([questionIndex, selectedAnswer]) => (
                <li key={questionIndex}>
                    Question {parseInt(questionIndex)}: {selectedAnswer}
                </li>
            ))}
        </ul>
    
            <h4>Results:</h4>
            <ul>
                {Object.entries(results).map(([letter, percentage]) => (
                    <li key={letter}>{letter}: {percentage}%</li>
                ))}
            </ul>
        </>
    )
} 