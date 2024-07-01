import Modal from './Modal'; // Importa el componente Modal
import axios from 'axios';
import config from './config.json';
import {useState, useEffect} from 'react';
import './css/posts.css';
function Posts() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const endpointImage = config.endpointImage;
    const getAllPosts = async () => {
        const prefix = config.endpoint;
        setLoading(true);
        const response = await axios.get(`${prefix}/slider`);
        setPosts(response.data);
        setLoading(false);
    }
    
    useEffect(() => {
        getAllPosts();
    }, []);

    const openModal = (imageSrc, imageAlt, id, title, description, route) => {
        setSelectedImage({ src: imageSrc, id, alt: imageAlt, title, description, route });
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };
    return (<main>
        <h1>Publicaciones</h1>
        <p>Para ver alguna publicación más en detalle, hazle clic a la imagen</p>
        <section id="publications" className='posts-container' style={{
            
        }}>
            {
                loading ? <h2>Cargando todas las publicaciones...</h2>  :''
            }
        {posts.reverse().map((img, index) => (  
            <img
                src={endpointImage+"post/"+img.img}
                alt={img.legend}
                className="img_post"
                id={"img_sld" + img.id} 
                key={index}

                data-tooltip-id='tooltip'
                data-tooltip-content={img.legend}
                data-tooltip-place='top'
                onClick={() =>
                    openModal(endpointImage+"post/"+img.img, img.legend, img.id, img.title, img.description, img.route ? img.route : '')
                }
            />
        ))}
        </section>
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
    </main>);
}

export default Posts;