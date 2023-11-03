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
  const getAllSlides = async () => {
    const prefix = config.endpoint;
    const response = await axios.get(`${prefix}/slider`);
    setSlides(response.data);
    console.log(response.data);
  }
  
  useEffect(() => {
    getAllSlides();
  }, []);

  const openModal = (imageSrc, imageAlt, id, title, description, route) => {
    setSelectedImage({ src: imageSrc, id, alt: imageAlt, title, description, route });
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const endpointImage = config.endpointImage;
  return (
    <section id="slider">
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
    >
      {slides.slice(-5).reverse().map((slide, index) => (
          <SwiperSlide key={index}>  
            <img
              src={endpointImage+"post/"+slide.img}
              alt={slide.legend}
              className="img_sld"
              id={"img_sld" + slide.id} 
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                width: "auto",
                height:'auto'
              }}
              onClick={() =>

                openModal(endpointImage+"post/"+slide.img, slide.legend, slide.id, slide.title, slide.description, slide.route ? slide.route : '')
              }
            />
          </SwiperSlide>
        ))}
    </Swiper>
        <Modal
          isOpen={modalOpen}
          closeModal={closeModal}
          imageSrc={selectedImage ? selectedImage.src : ''}
          id_post={selectedImage ? selectedImage.id : ''}
          title={selectedImage ? selectedImage.title : ''}
          imageAlt={selectedImage ? selectedImage.alt : ''}
          description={selectedImage ? selectedImage.description : ''}
          file={selectedImage ? selectedImage.route : ''}
        />
    </section>
    
  );  
};

export default ImageSlider;
