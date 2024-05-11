import React from "react";
import LoveQuote from './LoveQuote';
import Hero from "./Hero";


export default function Home() {
    return (
        <div>
            <Hero /> 
        <div className="container mt-5">
            <h4 className="text-center mb-4">Home Page</h4>
            <div className="row">
                <div className="col-md-12">
                    <LoveQuote />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Quizzes</h5>
                            <p className="card-text">Start with our Love Languages Quiz to discover more about your relationship.</p>
                            <button className="btn custom-btn">Start Quiz</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Relationships</h5>
                            <p className="card-text">Manage your relationships and settings here.</p>
                            <button className="btn custom-btn">Manage Relationships</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Romantic Ideas</h5>
                            <p className="card-text">Need ideas? Start a chat with our AI to get personalized romantic ideas based on your love language.</p>
                            <button className="btn custom-btn">Chat with AI</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
