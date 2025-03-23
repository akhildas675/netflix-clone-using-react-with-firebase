import React, { useEffect, useState } from 'react'; 
import './Home.css';
import Navbar from '../../Components/Navbar/Navbar';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../Components/TitleCards/TitleCards';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
    const [banner, setBanner] = useState(null);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTM3NjgyZjMwODcwYTQzYTRhMmQ1NDljNDU0ZmQ3ZiIsIm5iZiI6MTc0MDY1Nzg0OS45MzQsInN1YiI6IjY3YzA1NGI5MTBlNzljMzQyNGEyNGYzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i-9Bc5icIB1SKaP5YALDegaloHoqAgUIHzjBzwQS6B0' // Replace with your TMDb API token
        }
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
            .then(res => res.json())
            .then(res => {
                if (res.results.length > 0) {
                    setBanner(res.results[0]); // Set the first trending movie as the banner
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className='home'>
            <Navbar />
            <div className="hero">
                {banner && (
                    <>
                        <img src={`https://image.tmdb.org/t/p/original${banner.backdrop_path}`} alt="" className='banner-img' />
                        <div className="hero-caption">
                            <h1 className='caption-title'>{banner.title}</h1>
                            <p>{banner.overview}</p>
                            <div className="hero-btns">
                                <button className='btn'><img src={play_icon} alt="" /> Play</button>
                                <button className='btn dark-btn'><img src={info_icon} alt="" /> More Info</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="more-cards">
                <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
                <TitleCards title={"Only on Netflix"} category={"popular"} />
                <TitleCards title={"Upcoming"} category={"upcoming"} />
                <TitleCards title={"Top Picks for You"} category={"now_playing"} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
