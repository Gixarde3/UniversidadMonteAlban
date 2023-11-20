import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Alert from './Alert';
import { Tooltip } from 'react-tooltip';
import config from './config.json';
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

function AdminSuggestions() {
    const [suggestions, setSuggestions] = useState([]);
    const [showChecked, setShowChecked] = useState(false);
    const [suggestionsToSee, setSuggestionsToSee] = useState([]);
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const [alert, setAlert] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [pdfGenerated, setPdfGenerated] = useState(null);
    Font.register({ family: 'Roboto Slab', src: `${endpointLocal}fonts/RobotoSlab.ttf` });
    const closeAlert = () => {
        setAlert(null);
        setAlertOpen(false);
    };

    const openAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({
        title: title,
        message: message,
        kind: kind,
        redirectRoute: redirectRoute,
        asking: asking,
        onAccept: onAccept,
        });
        setAlertOpen(true);
    };

    useEffect(() => {
        const getSuggestions = async () => {
        openAlert(
            'Cargando...',
            `Cargando sugerencias`,
            'loading',
            null,
            false,
            null
        );
        const response = await axios.post(`${endpoint}/complaints`, {
            cookie: Cookies.get('session'),
        });
        setSuggestions(response.data);
        closeAlert();
        };
        getSuggestions();
    }, [endpoint]);

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
            const groupedSuggestions = [];
            for (let i = 0; i < suggestions.length; i += 3) {
                groupedSuggestions.push(suggestions.slice(i, i + 3));
            }

            const pdf = (
                <Document>
                <Page style={styles.page}>
                    <View style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                        <Image style={styles.image} src={`${endpointLocal}img/logo_azul.png`} />
                    </View>
                <Text style={styles.title}> Sugerencias sin ver: </Text>
                {groupedSuggestions.map((group, index) => (
                    group.map((result, innerIndex) => (
                    result.checked === 0 ? (
                        <View key={innerIndex} style={styles.section}>
                            <Text style={styles.text}>{`Id: ${result.id}`}</Text>
                            <Text style={styles.text}>Nombre: </Text>
                            <Text style={styles.text}>{`${result.name}`}</Text>
                            <Text style={styles.text}>Email: </Text>
                            <Text style={styles.text}>{`${result.email}`}</Text>
                            <Text style={styles.text}>Sugerencia: </Text>
                            <Text style={styles.text}>{`${result.content}`}</Text>
                        </View>
                    ) : null
                    ))
                ))}
                </Page>
                <Page style={styles.page}>
                <Text style={styles.title}> Sugerencias vistas: </Text>
                {groupedSuggestions.map((group, index) => (
                    group.map((result, innerIndex) => (
                    result.checked === 1 ? (
                        <View key={innerIndex} style={styles.section}>
                            <Text style={styles.text}>{`Id: ${result.id}`}</Text>
                            <Text style={styles.text}>Nombre: </Text>
                            <Text style={styles.text}>{`${result.name}`}</Text>
                            <Text style={styles.text}>Email: </Text>
                            <Text style={styles.text}>{`${result.email}`}</Text>
                            <Text style={styles.text}>Sugerencia: </Text>
                            <Text style={styles.text}>{`${result.content}`}</Text>
                        </View>
                    ) : null
                    ))
                ))}
                </Page>
            </Document>
            );
            setPdfGenerated(pdf); // Set the generated PDF to the state
        };
        if(suggestions){
            generatePDF()
        }
    }, [suggestions, endpointLocal])

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
            marginBottom: '20px',
            color: '#2E3092',
            fontWeight: '600'
        },
        image: {
            width: '40%'
        }
    });
    const generatePDF = () => {
        const groupedSuggestions = [];
        for (let i = 0; i < suggestions.length; i += 3) {
            groupedSuggestions.push(suggestions.slice(i, i + 3));
        }

        const pdf = (
            <Document>
            <Page style={styles.page}>
                <View style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                    <Image style={styles.image} src={`${endpointLocal}img/logo_azul.png`} />
                </View>
                <Text style={styles.title}> Sugerencias sin ver: </Text>
                {groupedSuggestions.map((group, index) => (
                    group.map((result, innerIndex) => (
                    result.checked === 0 ? (
                        <View key={innerIndex} style={styles.section}>
                            <Text style={styles.text}>{`Id: ${result.id}`}</Text>
                            <Text style={styles.text}>Nombre: </Text>
                            <Text style={styles.text}>{`${result.name}`}</Text>
                            <Text style={styles.text}>Email: </Text>
                            <Text style={styles.text}>{`${result.email}`}</Text>
                            <Text style={styles.text}>Sugerencia: </Text>
                            <Text style={styles.text}>{`${result.content}`}</Text>
                        </View>
                    ) : null
                    ))
                ))}
            </Page>
            <Page style={styles.page}>
                <Text style={styles.title}> Sugerencias vistas: </Text>
                {groupedSuggestions.map((group, index) => (
                    group.map((result, innerIndex) => (
                    result.checked === 1 ? (
                        <View key={innerIndex} style={styles.section}>
                            <Text style={styles.text}>{`Id: ${result.id}`}</Text>
                            <Text style={styles.text}>Nombre: </Text>
                            <Text style={styles.text}>{`${result.name}`}</Text>
                            <Text style={styles.text}>Email: </Text>
                            <Text style={styles.text}>{`${result.email}`}</Text>
                            <Text style={styles.text}>Sugerencia: </Text>
                            <Text style={styles.text}>{`${result.content}`}</Text>
                        </View>
                    ) : null
                    ))
                ))}
            </Page>
        </Document>
        );
        setPdfGenerated(pdf); // Set the generated PDF to the state
    };

    const checkSuggestion = async (id, index) => {
        try {
        openAlert(
            'Cargando...',
            `Marcando la sugerencia como vista`,
            'loading',
            null,
            false,
            null
        );
        const response = await axios.post(`${endpoint}/complaint/check/${id}`, {
            cookie: Cookies.get('session'),
        });
        if (response.data.success === true) {
            suggestions.find(
            (suggestion) => suggestion.id === id
            ).checked = 1;
            openAlert(
            'Sugerencia vista',
            `La sugerencia se ha marcado como vista`,
            'success',
            null,
            false,
            null
            );
            generatePDF();
        } else {
            openAlert(
            'Error inesperado',
            `La sugerencia no se ha podido marcar como vista`,
            'error',
            null,
            false,
            null
            );
        }
        } catch (error) {
        openAlert(
            'Error de conexión',
            `La petición ha fallado por ${error}`,
            'error',
            null,
            false,
            null
        );
        console.log(error);
        }
    };

    useEffect(() => {
        if(showChecked){
            setSuggestionsToSee(suggestions.filter((suggestion) => suggestion.checked === 1));
        }else{
            setSuggestionsToSee(suggestions.filter((suggestion) => suggestion.checked === 0));
        }
    }, [showChecked, suggestions]);
    const askCheckSuggestion = (id, index) => {
        openAlert(
            'Marcar como vista',
            `¿Quieres marcar la sugerencia como vista?`,
            'question',
            null,
            true,
            () => checkSuggestion(id, index)
        );
    };
    return(
        <section className="section-admin" id="manage-suggestions">
        <h2>Gestión de sugerencias</h2>
        <button
            onClick={() => setShowChecked(!showChecked)}
            className="accept"
            style={{ marginBottom: '1rem' }}
        >
            {showChecked
            ? 'Ver sugerencias no vistas'
            : 'Ver sugerencias vistas'}
        </button>
        {suggestionsToSee.length === 0 && (<h4 style={{marginBottom:'1rem'}}>No hay sugerencias {showChecked ? "vistas" : "sin ver"}</h4>)}
        {suggestionsToSee.map((result, index) => (
            <div className="res" key={index} style={{ width: '100%' }}>
            <form className="buttons">
                {!showChecked ? <button
                    type="button"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Marcar como vista"
                    data-tooltip-place="top"
                    className="btn-admin editar"
                    style={{ padding: '0' }}
                    onClick={() => askCheckSuggestion(result.id, index)}
                >
                    <img
                    src={`${endpointLocal}img/ver.png`}
                    alt="Icono editar"
                    />
                </button> : null}
            </form>
            <div className="result" style={{ width: '100%' }}>
                <p>{result.id}</p>
                <p className="post-title">{result.name}</p>
                <p className="post-title">{result.email}</p>
                <p style={{ whiteSpace: 'normal' }}>{result.content}</p>
            </div>
            </div>
        ))}
        <Tooltip id="tooltip" />
        <Alert
            isOpen={alertOpen}
            closeAlert={closeAlert}
            title={alert ? alert.title : ''}
            message={alert ? alert.message : ''}
            kind={alert ? alert.kind : ''}
            redirectRoute={alert ? alert.redirectRoute : ''}
            asking={alert ? alert.asking : ''}
            onAccept={alert ? () => alert.onAccept() : () => console.log('')}
        />
        <PDFDownloadLink document={pdfGenerated} fileName="Sugerencias.pdf">
                <button className="accept" style={{marginBottom:'1rem'}}>Descargar reporte de sugerencias</button>
        </PDFDownloadLink>
        </section>  
    );
}
export default AdminSuggestions;
