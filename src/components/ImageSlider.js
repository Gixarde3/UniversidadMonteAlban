import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './css/ImageSlider.css';
//import Modal from './Modal'; // Importa el componente Modal

function ImageSlider(){
  /*const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageSrc, imageAlt, description) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt, description });
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };*/

  return (
    <section id="slider">
      <Carousel dynamicHeight={false}
        centerMode={false}
        infiniteLoop={false}
        showArrows={true} // Muestra las flechas de navegación
        selectedItem={0} // Muestra la primera imagen al carg
        >
        <div><img src="img/slider_1.webp" alt="Imagen del slider #1" className="img_sld" /><p className="legend">Leyenda 1</p></div>
        <div><img src="img/slider_2.webp" alt="Imagen del slider #2" className="img_sld" /><p className="legend">Leyenda 2</p></div>
        <div><img src="img/slider_3.webp" alt="Imagen del slider #3" className="img_sld" /><p className="legend">Leyenda 3</p></div>
        <div><img src="img/slider_4.webp" alt="Imagen del slider #4" className="img_sld" /><p className="legend">Leyenda 4</p></div>
      </Carousel>
    </section>
  );
};

export default ImageSlider;
