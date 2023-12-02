import axios from 'axios';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { Tooltip } from 'react-tooltip';
import config from './config.json';
import AdmissionResult from './AdmissionResult';
import Alert from './Alert';
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
function AdminAdmissions() {
    const [admissions, setAdmissions] = useState([]);
    const endpoint = config.endpoint;
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [admissionsAnswered, setAdmissionsAnswered] = useState([]);
    const [admissionsUnAnswered, setAdmissionsUnAnswered] = useState([]);
    const [admissionsToSee, setAdmissionsToSee] = useState([admissionsUnAnswered]);
    const [seeAnswered, setSeeAnswered] = useState(false);
    const [careerNames, setCareerNames] = useState([]);
    const endpointLocal = config.endpointLocal;
    const [pdfGenerated, setPdfGenerated] = useState(null);
    Font.register({ family: 'Roboto Slab', src: `${endpointLocal}fonts/RobotoSlab.ttf` });
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    }
    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title: title, message: message, kind: kind, redirectRoute: redirectRoute, asking: asking, onAccept: onAccept});
        setAlertOpen(true);
    }
    useEffect(() => {
        const getAdmissions = async () => {
            openAlert("Cargando...", `Cargando mensajes de admision`, "loading", null, false, null);
            const response = await axios.post(`${endpoint}/admissions`,{
                cookie: Cookies.get('session')
            });
            if(response.data.success === false){
                openAlert('Error inesperado con la conexión', `Error de conexión`, 'error', "/");
            }else{
                setAdmissions(response.data);
                closeAlert();
            }
        }
        getAdmissions();
    },[endpoint]);

    useEffect(() => {
        const getCareerNames = async () => {
            const response = await axios.get(`${endpoint}/careers`);
            const careerNames = response.data.reduce((acc, career) => {
                acc[career.id] = career.name;
                return acc;
            }, {});
            setCareerNames(careerNames);
        }
        setAdmissionsAnswered(admissions.filter((admission) => admission.response !== null && admission.response !== ''));
        setAdmissionsUnAnswered(admissions.filter((admission) => admission.response === null || admission.response === ''));
        getCareerNames();
    }, [admissions, endpoint]);

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
                <Text style={styles.title}> Admisiones sin contestar: </Text>
                {admissionsUnAnswered.map((result, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.text}>{`Id: ${result.id}`}</Text>
                        <Text style={styles.text}>Nombre: </Text>
                        <Text style={styles.text}>{`${result.name}`}</Text>
                        <Text style={styles.text}>Email: </Text>
                        <Text style={styles.text}>{`${result.email}`}</Text>
                        <Text style={styles.text}>Mensaje de admisión: </Text>
                        <Text style={styles.text}>{`${result.content}`}</Text>
                    </View>
                ))}
                </Page>
                <Page style={styles.page}>
                <Text style={styles.title}> Admisiones contestadas: </Text>
                {admissionsAnswered.map((result, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.text}>{`Id: ${result.id}`}</Text>
                        <Text style={styles.text}>Nombre: </Text>
                        <Text style={styles.text}>{`${result.name}`}</Text>
                        <Text style={styles.text}>Email: </Text>
                        <Text style={styles.text}>{`${result.email}`}</Text>
                        <Text style={styles.text}>Mensaje de admisión: </Text>
                        <Text style={styles.text}>{`${result.content}`}</Text>
                        <Text style={styles.text}>Respuesta: </Text>
                        <Text style={styles.text}>{`${result.response}`}</Text>
                    </View>
                ))}
                </Page>
            </Document>
            );
            setPdfGenerated(pdf); // Set the generated PDF to the state
        }
        if(admissionsAnswered && admissionsUnAnswered){
            generatePDF()
        }
    }, [admissionsAnswered, admissionsUnAnswered, endpointLocal])

    useEffect(() => {
        if(!seeAnswered){
            setAdmissionsToSee(admissionsUnAnswered);
        }else{
            setAdmissionsToSee(admissionsAnswered);
        }
        
    }, [seeAnswered, admissionsAnswered, admissionsUnAnswered]);
    const changeAdmissionsToSee = () => {
        setSeeAnswered(!seeAnswered);
    }
    
    const getAdmissions = async() => {
        try{
            const response = await axios.post(`${endpoint}/admissions`,{
                cookie: Cookies.get('session')
            });
            setAdmissions(response.data);
            closeAlert();
        }catch(error){
            openAlert('Error inesperado con la conexión', `Error de conexión: ${error}`, 'error', null);
        }
    }
    return ( 
    <section className="section-admin" id="manage-admissions">
        <h2>Gestión de mensajes de admision</h2>
        <button className="accept" style={{marginBottom:'1rem'}} onClick={() => {changeAdmissionsToSee()}}>{!seeAnswered ? "Ver admisiones respondidas" : "Ver admisiones sin responder"}</button>
        {admissionsToSee.length === 0 && <h4 style={{marginBottom:'1rem'}}>No hay admisiones {seeAnswered ? "respondidas" : "sin responder"}</h4>}
        {admissionsToSee.map((result, index) => (
            <AdmissionResult idAdmission={result.id} 
            name={result.name} 
            email={result.email} 
            career={careerNames[result.idCareer]} 
            content={result.content} 
            response={result.response ? result.response : ''} 
            key={index}
            reload={()=>(getAdmissions())}/>
        ))}
        <PDFDownloadLink document={pdfGenerated} fileName='Admisiones.pdf'>
            <button className="accept">
                Descargar reporte de admisiones
            </button>
        </PDFDownloadLink>
        <Tooltip id="tooltip" />
        <Alert 
            isOpen={alertOpen}
            closeAlert={closeAlert}
            title={alert ? alert.title : ''}
            message={alert ? alert.message : ''}
            kind={alert ? alert.kind : ''}
            redirectRoute={alert ? alert.redirectRoute : ''}
            asking={alert ? alert.asking : ''}
            onAccept={alert ? alert.onAccept : ''}
        />
    </section>
    );
}

export default AdminAdmissions;
