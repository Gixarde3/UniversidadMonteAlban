import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './css/ImageSlider.css'
import Modal from './Modal'; // Importa el componente Modal
//import axios from 'axios';
function ImageSlider(){
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [slides, setSlides] = useState([]);
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

  const getAllSlides = async () => {
    fetch('http://localhost/MonteAlban/api/slider/').then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setSlides(data.data);
    })

  }
  return (
    <section id="slider">
      <Carousel dynamicHeight={false}
        centerMode={false}
        infiniteLoop={true}
        showArrows={true} // Muestra las flechas de navegación
        selectedItem={0} // Muestra la primera imagen al carg
        >
        {
          slides.map((slide)=>(
            <div onClick={() => openModal(slide.img, slide.title, slide.legend, slide.description)}>
              <img src={slide.img} alt={slide.legend} className="img_sld" />
              <p className="legend">{slide.legend}</p>
            </div>
          ))
        }
      </Carousel>
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
