import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import video1 from "./demo.mp4";
import video2 from "./demo2.mp4";
import video3 from "./demo3.mp4";
import video4 from "./demo4.mp4";

const videos = [
    {
        src: video1,
        text: "________demo 1__________",
    },
    { src: video2, text: "________demo 2__________" },
    { src: video3, text: "________demo 3__________" },
    { src: video4, text: "________demo 4__________" },
];

function App() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [showContactScreen, setShowContactScreen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex(
                (prevIndex) => (prevIndex + 1) % videos.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const toggleContactScreen = () => {
        setShowContactScreen(!showContactScreen);
    };

    return (
        <div className="App">
            <nav>
                <h2 className="logo">BLUE RIDGE</h2>
                <button className="btn" onClick={toggleContactScreen}>
                    Contact
                </button>
            </nav>

            {showContactScreen ? (
                <div className="contact-screen">
                    <h1>Contact Us</h1>
                    <h3>Blueridgevijay@gmail.com</h3>
                </div>
            ) : (
                <>
                    <VideoPlayer src={videos[currentVideoIndex].src} />

                    <p>{videos[currentVideoIndex].text}</p>
                    <div className="pagination">
                        {videos.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${
                                    index === currentVideoIndex ? "active" : ""
                                }`}
                                onClick={() => setCurrentVideoIndex(index)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function VideoPlayer({ src }) {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.src = src;
            ref.current.load();
        }
    }, [src]);
    // useEffect(() => {
    //     if (ref.current) {
    //         ref.current.src = src;
    //         ref.current.load();
    //     }
    // }, [src]);

    return (
        <video className="background-video" ref={ref} autoPlay loop muted>
            <source src={src} type="video/mp4" />
        </video>
    );
}

export default App;
