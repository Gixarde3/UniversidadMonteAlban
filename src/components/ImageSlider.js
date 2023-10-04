import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './css/ImageSlider.css'
import Modal from './Modal'; // Importa el componente Modal

function ImageSlider(){
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
      <Carousel dynamicHeight={false}
        centerMode={false}
        infiniteLoop={true}
        showArrows={true} // Muestra las flechas de navegación
        selectedItem={0} // Muestra la primera imagen al carg
        >
        <div onClick={() => openModal('img/slider_1.webp', 'Imagen del slider #1', 'Leyenda 1', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi labore sunt velit temporibus magni? Modi maiores vero assumenda deserunt ipsum quia hic earum quaerat. Fugiat error accusamus dicta! Aliquam, placeat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, reiciendis in, consectetur sint dolor explicabo veritatis consequatur unde laboriosam quisquam fuga repellendus quis inventore voluptate. Dolor porro officia provident tempora. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi labore sunt velit temporibus magni? Modi maiores vero assumenda deserunt ipsum quia hic earum quaerat. Fugiat error accusamus dicta! Aliquam, placeat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, reiciendis in, consectetur sint dolor explicabo veritatis consequatur unde laboriosam quisquam fuga repellendus quis inventore voluptate. Dolor porro officia provident tempora.')}><img src="img/slider_1.webp" alt="Imagen del slider #1" className="img_sld" /><p className="legend">Leyenda 1</p></div>
        <div onClick={() => openModal('img/slider_2.webp', 'Imagen del slider #2', 'Leyenda 2', 'Descripción 2')}><img src="img/slider_2.webp" alt="Imagen del slider #2" className="img_sld" /><p className="legend">Leyenda 2</p></div>
        <div onClick={() => openModal('img/slider_3.webp', 'Imagen del slider #3', 'Leyenda 3', 'Descripción 3')}><img src="img/slider_3.webp" alt="Imagen del slider #3" className="img_sld" /><p className="legend">Leyenda 3</p></div>
        <div onClick={() => openModal('img/slider_4.webp', 'Imagen del slider #4', 'Leyenda 5', 'Descripción 4')}><img src="img/slider_4.webp" alt="Imagen del slider #4" className="img_sld" /><p className="legend">Leyenda 4</p></div>
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
