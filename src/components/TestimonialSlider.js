import React, { useState, useEffect } from 'react';
// Core modules imports are same as usual
// import function to register Swiper custom elements
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// register Swiper custom elements
import './css/ImageSlider.css'
import axios from 'axios';
import config from './config.json';
import Testimonial from "./Testimonial";
function TestimonialSlider(){
    const [testimonials, setTestimonials] = useState([]);
    const getAllTestimonials = async () => {
        const prefix = config.endpoint;
        const response = await axios.get(`${prefix}/testimonial`);
        setTestimonials(response.data);
    }
      
    useEffect(() => {
        getAllTestimonials();
    }, []);

    const endpointImage = config.endpointImage;
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={window.innerWidth > 1199.99 ? 2 : 1}
            navigation={true}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
        >
            {testimonials.slice(-10).reverse().map((testimonial, index) => (
                <SwiperSlide key={index}>  
                     <Testimonial 
                        name = {testimonial.name}
                        photoTestimonial = {endpointImage + "testimonial/" +testimonial.img}
                        testimonial = {testimonial.content}
                        relation = {testimonial.relation}/>
                </SwiperSlide>
                ))}
           
        </Swiper>
    );
}
export default TestimonialSlider;