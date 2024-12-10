import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from '../utilities/image.png';
import GetInTouch from '../utilities/get-in-touch3.jpg';
import AboutUs from '../utilities/about-us2.jpg';

import './Home.css';
import Footer from '../components/Footer';
// import { CarouselCaption } from 'react-bootstrap';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const typingText = "Welcome to the Kids Adventure Club!";

  const ref = useRef(null); // For About Us section
  const isInView = useInView(ref, { once: true });

  // Handle form submission for Contact Us
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Query submitted: ${email} - ${query}`);
    setEmail('');
    setQuery('');
  };

  // cards text 
  const cards = [
    { 
        title: "Arts & Crafts", 
        description: "Discover a world of colors, textures, and ideas with hands-on activities that ignite creativity and teach new skills.", 
        imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDd3nv9NT4Fg8PAeC_Uy2RjrD9Fx123JVvJg&s" 
    },
    { 
        title: "Storytelling", 
        description: "Dive into captivating tales and magical adventures that stimulate the imagination and build a love for storytelling.", 
        imageSrc: "https://hbr.org/resources/images/article_assets/2021/05/A_May21_14_Storytelling-4-Ways_Ruby-Taylor.png" 
    },
    { 
        title: "Music & Dance", 
        description: "Get moving with energetic beats, learn exciting dance steps, and explore the joy of music through rhythm and melody.", 
        imageSrc: "https://timemaster.ae/uploads/news_article/how-music-and-dance-can-help-your-child-s-development_2022_05_11_08_40_37.webp" 
    },
    // { 
    //     title: "Outdoor Adventures", 
    //     description: "Embark on thrilling outdoor experiences, connect with nature, and create lasting memories through fun-filled activities.", 
    //     imageSrc: "https://www.familyvacationcritic.com/wp-content/uploads/2021/03/outdoor_activities_for_kids.jpg" 
    // }
];


  // Carousel 
  // Owl Carousel options
  const testimonials = [
    {
      name: "Sreeniva Rao",
      position: "Partner",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCixyM2urliFC1w0DyNMJpBRMOXFizr3FR8aRIFfcDUGBzEaXcV6mt4gVWRqGAqqu4PI&usqp=CAU",
      text: "This app transformed our routine! My kids are motivated to complete tasks and learn the value of hard work.",
    },
    {
      name: "Harshitha",
      position: "Partner",
      img: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid",
      text: "A lifesaver for parents! The rewards system keeps my kids engaged while teaching essential life skills. Highly recommend it.",
    },
    {
      name: "Rohini",
      position: "Partner",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6h3O-7VlFrE8Om3Wl072rKhG4IJfY792YNyOoAT2wYpXoVRhHnJbIwpP9p80zIZGznHY&usqp=CAU",
      text: "Amazing app! It reduced screen time, encouraged healthy habits, and helped my kids understand the importance of time and effort.",
    },
  ];

  // count numbers 
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"; // Converts to "k" format with one decimal
    }
    return num; // For numbers less than 1000, just return as is
  };

  useEffect(() => {
    const statsSection = document.getElementById("stats-section");

    const animateCount = (id, target) => {
      let count = 0;
      const interval = setInterval(() => {
        if (count < target) {
          count++;
          document.getElementById(id).innerText = formatNumber(count);
        } else {
          clearInterval(interval);
        }
      }, 5);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCount("happyClientCount", 423);
          animateCount("membersCount", 198);
          animateCount("staffsCount", 550);
          animateCount("followersCount", 201);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div>

      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://as2.ftcdn.net/v2/jpg/09/14/74/09/1000_F_914740970_632S5ov9u387NLcP8VYV8vXsHzg8g4QH.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px', // Ensuring enough height for background image to show
          // marginTop: '100px'
          height: '100vh',

        }}
        className="container-fluid d-flex justify-content-center align-items-center border border-primary rounded-3"
      >
        <div className="text-center text-white">
          <h1 className='text-white'>Welcome To Parenting App</h1>
          <p className='my-5 text-white py-5 home-text'>
          Transform your parenting experience with our innovative app! Teach your kids the value of time, money, and hard work through engaging routines and a rewards-based system. Motivate them to complete daily tasks, build responsibility, and develop healthy habits while reducing screen time. Empower your children for a brighter, balanced future
          </p>
          <button className="get-start btn btn-primary">Get Started</button>
        </div>
      </div>



      {/* Home Section with Typing Text */}
      <div className="container-fluid text-center pt-3 pb-5">
        {/* <motion.h1
          className="typing-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {typingText}
        </motion.h1> */}
        <div>
          <h1 className='text-head pt-3'>Welcome to the Kids Adventure Club!</h1>
        </div>

        {/* Horizontal Scrolling Cards (Removed the Slider) */}
        <div className="container-fluid px-5">
          <div className="row">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="col-lg-4 col-md-6 col-sm-12"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="card">
                  <img
                    src={card.imageSrc}
                    className="card-img-top pb-3"
                    alt={`Card ${index + 1}`}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* About Us Section */}
      <div
        className="about-us-container section-bg d-flex flex-column align-items-center justify-content-center py-5"
        ref={ref}
      >
        <center><div className='text-head'>About Us</div></center>
        <motion.div
          className="row container"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Image Section */}
          <div className="col-md-6 d-flex justify-content-center">
            <motion.img
              src={AboutUs} // Replace with your image URL
              alt="About Us"
              className="img-fluid rounded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          {/* Text Section */}
          <div className="col-md-6 d-flex flex-column justify-content-center text-center">
            <motion.h2
              // className="display-4"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              About Us
            </motion.h2>
            <motion.p
              // className="lead"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            >
              We are dedicated to creating a safe and enjoyable environment for your family.
              Explore our wide range of activities, events, and experiences.
            </motion.p>
            <center>
              <motion.button
                className="btn btn-primary w-50 mt-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                onClick={()=>{

                }}
              >
                Learn More
              </motion.button>
            </center>
          </div>
        </motion.div>
      </div>

      {/* 3 cards section */}
      <div className="site-section container-fluid py-5">
        <center><div className="text-head">Our Core Values</div></center>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="block-2">
                <span className="wrap-icon">
                  <span className="icon-home"><i class="bi bi-house-check-fill"></i></span>
                </span>
                <h2>Indoor Games</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima nesciunt, mollitia, hic enim id culpa.</p>
              </div>
            </div>
            <div className="col-lg-4 ">
              <div className="block-2">
                <span className="wrap-icon">
                  <span className="icon-person"><i class="bi bi-person-fill"></i></span>
                </span>
                <h2>Outdoor Game And Event</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima nesciunt, mollitia, hic enim id culpa.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="block-2">
                <span className="wrap-icon">
                  <span className="icon-cog"><i class="bi bi-gear-fill"></i></span>
                </span>
                <h2>Camping for Kids</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima nesciunt, mollitia, hic enim id culpa.</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Our client says  */}
      <div className="container-fluid justify-content-center row">
        <div className='col-lg-8 col-md-10 col-sm-11 col-11 '>
          <h2 className="text-center text-head my-5">What Our Client Says About Us</h2>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay
            interval={3000}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-5 d-flex flex-column align-items-center text-center bg-primary text-white">
                <img
                  src={testimonial.img}
                  alt={`${testimonial.name}`}
                  className="rounded-circle mb-3"
                  style={{ width: "80px", height: "80px" }}
                />
                <h3 className='text-white'>{testimonial.name}</h3>
                <p className="text-muted text-white">{testimonial.position}</p>
                <p className='text-white'>{testimonial.text}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* contact us form  */}

      <div className="container py-5" style={{ paddingButton: '30px' }}>
        <h2 className="text-center mb-4 text-head">Get In Touch</h2>
        <div className="row">
          {/* Image Section */}
          <div className="col-lg-6">
            <img
              src={GetInTouch}
              alt="Contact Us Image"
              className="img-fluid rounded"
            />
          </div>

          {/* Form Section */}
          <div className="col-lg-6">
            <form action="#" method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea className="form-control" id="message" rows="3" placeholder="Write your message" required></textarea>
              </div>
              <center><button type="submit" className="btn btn-primary w-50">Submit</button></center>
            </form>
          </div>
        </div>
      </div>


      <div className="row mx-3 my-5 py-5 justify-content-center">
        <div className="col-8">
          <div className="row" id="stats-section">
            <div className="col-lg-3 text-center">
              <span id="happyClientCount" className="text-teal h2 d-block">0</span>
              <span>Happy Client</span>
            </div>
            <div className="col-lg-3 text-center">
              <span id="membersCount" className="text-yellow h2 d-block">0</span>
              <span>Members</span>
            </div>
            <div className="col-lg-3 text-center">
              <span id="staffsCount" className="text-success h2 d-block">0</span>
              <span>Staffs</span>
            </div>
            <div className="col-lg-3 text-center">
              <span id="followersCount" className="text-danger h2 d-block">0</span>
              <span>Our Followers</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
