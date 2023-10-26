import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './css/ImageSlider.css'
import Modal from './Modal'; // Importa el componente Modal
import axios from 'axios';
function ImageSlider(){
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [slides, setSlides] = useState([]);
  const prefix = 'https://seleucid-magnitude.000webhostapp.com/';
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
    const response = await axios.get(`${prefix}slider/index.php`);
    console.log(response.data.data);
    setSlides(response.data.data);
  }

  return (
    <section id="slider">
      <Carousel dynamicHeight={false}
        centerMode={false}
        infiniteLoop={true}
        showArrows={true} // Muestra las flechas de navegación
        selectedItem={0} // Muestra la primera imagen al carg
        showThumbs={false}
        interval={500}
        >
        {
          slides.map((slide)=>(
            <div onClick={() => openModal(slide.img, slide.legend, slide.title, slide.description)}>
              <img src={slide.img} alt={slide.legend} className="img_sld" style={{
                width:'auto',
                maxWidth:'100%',
              }}/>
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
