import React from 'react';

// Public Components
import Hero from '../components/Hero/Hero';
import ValuesStrip from '../components/ValuesStrip/ValuesStrip';
import Intro from '../components/Intro/Intro';
import StatsBar from '../components/StatsBar/StatsBar';
import Testimonials from '../components/Testimonials/Testimonials';
import Newsletter from '../components/Newsletter/Newsletter';

const Home = ({ content, heroIndex, setHeroIndex, syncHeroSlide, submitTestimonial }) => {
    return (
        <>
            <Hero content={content.hero} onSlideChange={setHeroIndex} />
            <div id="hero"></div>
            <ValuesStrip content={content.hero} activeIndex={heroIndex} onTabClick={syncHeroSlide} />
            
            <section id="intro">
                <Intro content={content.intro} />
            </section>
            
            <StatsBar content={content.stats} />
            
            <Testimonials content={content.testimonials} onSubmit={submitTestimonial} />
            
            <section id="contato">
                <Newsletter content={content.newsletter} />
            </section>
        </>
    );
};

export default Home;
