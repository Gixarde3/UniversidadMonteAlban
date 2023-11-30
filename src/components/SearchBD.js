import './css/testimonial.css';
import config from './config.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useState, useEffect} from 'react';
import Alert from './Alert';
import Filter from './Filter';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
    Image,
    Font
} from '@react-pdf/renderer';
import './css/Search.css';
function SearchBD(){
    const [alert, setAlert] = useState(null);
    const [search, setSearch] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [searched, setSearched]  = useState(false);
    const [filter, setFilter] = useState('none');
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const [databases, setDatabases] = useState([]);
    const [pdfGenerated, setPdfGenerated] = useState(null);
    Font.register({ family: 'Roboto Slab', src: `${endpointLocal}fonts/RobotoSlab.ttf` });
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    };

    useEffect(() => {
        const styles = StyleSheet.create({
            page: {
                flexDirection: 'column',
                backgroundColor: '#E4E4E4',
            },
            section: {
                margin: 10,
                padding: 10,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor:'#fff',
                boxShadow: '0px 0px 13px -3px rgba(0,0,0,0.5)',
                height: 'auto'
            },
            text:{
                fontSize: 12,
                fontFamily:'Roboto Slab',
            },
            title:{
                fontSize: 20,
                fontFamily:'Roboto Slab',
                textAlign:'center',
                width:'100%',
                marginTop: '20px',
                color: '#2E3092',
                fontWeight: '600'
            },
            image: {
                width: '40%'
            }
        });
        const generatePDF = () => {    
            const pdf = (
                <Document>
                <Page style={styles.page}>
                    <View style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                        <Image style={styles.image} src={`${endpointLocal}img/logo_azul.png`} />
                    </View>
                <Text style={styles.title}> Modificaciones realizadas {filter === 'username' ? (search !== '' ? `por el usuario ${search}` : "por todos los usuarios") 
                                                                                            : (search !== '' ?  `el día ${search}` : "en cualquier fecha")} </Text>
                {databases.map((result, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.text}>Nombre de usuario:  {`${result.username}`}</Text>
                        <Text style={styles.text}>Fecha de modificación: {`${result.date}`}</Text>
                        <Text style={styles.text}>Modificación realizada: {`${result.modification}`}</Text>
                    </View>
                ))}
                </Page>
            </Document>
            )
            setPdfGenerated(pdf);
        };
        generatePDF();
    }, [databases, endpointLocal, filter, search]);

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        try{
            if(filter === 'none'){
                openAlert("Primero ingresa un filtro", `Para realizar una búsqueda es necesario primero ingresar un filtro`, "error", null, false, null);
                return;
            }
            openAlert("Cargando...", `Cargando resultados de búsqueda`, "loading", null, false, null);
            let response = null;
            if(search === ''){
                response = await axios.post(`${endpoint}/database/search`, {
                    cookie: Cookies.get('session')
                });
            }else{
                response = await axios.post(`${endpoint}/database/search/${filter}/${search}`, {
                    cookie: Cookies.get('session')
                });
            }
            setDatabases(response.data);
            setSearched(true);
            closeAlert();
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }

    const filterSearch = {
        'none': 'Primero ingresa un filtro',
        'username': 'Ingresa el nombre de usuario',
        'date': 'Ingresa la fecha de modificación',
    }

    const changeFilter = (value) => {
        const filters = {
            '1': 'username',
            '2': 'date',
        }
        setFilter(filters[value]);
    }
    return(
        <>
        <search className="search">
            <h2 style={{width:'100%', color:'black', textAlign:'center'}}>Buscar modificaciones a la base de datos</h2>
            <form className="row-search" onSubmit={handleSubmitSearch}>
                <Filter setValue={(value) => (changeFilter(value))}/>
                <input type="text" name="title-search" className="title-search" placeholder={`${filterSearch[filter]}`} onChange = {(event) => {setSearch(event.target.value)}}/>
                <button type="submit" className="btn-buscar"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Buscar modificación a la base de datos"
                    data-tooltip-place="top"
                ><img src={`${endpointLocal}img/search.png`} alt="icono_buscar" className="icono-buscar"/></button>
            </form>
        </search>
        <div className="results">
            {searched && databases.length === 0 ? (<h3 style={{color: 'black'}}>No hay resultados para esa búsqueda</h3>):''}
            {searched && databases.length > 0 ? <PDFDownloadLink document={pdfGenerated} fileName='Modifcaciones.pdf'>
                <button className="accept" style={{marginBottom:'1rem'}}>Descargar PDF con los resultados</button>
            </PDFDownloadLink> : null}
            {databases.map((result, index) => (
                <div className="res" key={index} style={{width: '100%'}}>
                    <div className="result" style={{width: '100%'}}>
                        <p className="post-title">{result.username}</p>
                        <p className="post-description">{result.date}</p>
                        <p className="post-file">{result.modification}</p>
                    </div>
                </div>
            ))}
        </div>
        <Alert
            isOpen={alertOpen}
            closeAlert={closeAlert}
            title={alert ? alert.title : ''}
            message={alert ? alert.message : ''}
            kind = {alert ? alert.kind : ''}
            redirectRoute={alert ? alert.redirectRoute : ''}
            asking = {alert ? alert.asking : ''}
            onAccept={alert ? () => alert.onAccept() : () => console.log('')}
        />
        </>
    )
}
export default SearchBD;