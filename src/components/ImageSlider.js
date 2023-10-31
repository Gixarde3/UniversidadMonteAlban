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
import Modal from './Modal'; // Importa el componente Modal
import axios from 'axios';
import config from './config.json';
function ImageSlider(){
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [slides, setSlides] = useState([]);
  const endpointImage = config.endpointImage;
  const getAllSlides = async () => {
    const prefix = config.endpoint;
    const response = await axios.get(`${prefix}/slider`);
    console.log(response.data);
    setSlides(response.data);
  }
  
  useEffect(() => {
    getAllSlides();
  }, []);

  const openModal = (imageSrc, imageAlt, title, description) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt, title, description });
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <section id="slider">
      <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
    >
      {slides.map((slide, index) => (
          <SwiperSlide key={index}>  
            <img
              src={endpointImage+slide.img}
              alt={slide.legend}
              className="img_sld"
              
              style={{
                maxHeight: '100%',
                height: '100%',
                width: 'auto',
                maxWidth: '100%',
              }}
              onClick={() =>
                openModal(endpointImage+slide.img, slide.legend, slide.title, slide.description)
              }
            />
          </SwiperSlide>
        ))}
    </Swiper>
      <Modal
        isOpen={modalOpen}
        closeModal={closeModal}
        imageSrc={selectedImage ? selectedImage.src : ''}
        title={selectedImage ? selectedImage.title : ''}
        imageAlt={selectedImage ? selectedImage.alt : ''}
        description={selectedImage ? selectedImage.description : ''}
      />
    </section>
  );  
};

export default ImageSlider;
