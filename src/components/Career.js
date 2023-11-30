import axios from 'axios';
import config from './config.json';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Subject from './Subject';
import './css/career.css';
function Career() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [career, setCareer] = useState(null);
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const [name, setName] = useState('');
    const [graduationProfile, setGraduationProfile] = useState('');
    const [admissionProfile, setAdmissionProfile] = useState('');
    const [subjectsByCycle, setSubjectsByCycle] = useState([]);
    const [cycles, setCycles] = useState([]);
    useEffect(() => {
        const getCareer = async() => {
            try{
                const response = await axios.get(`${endpoint}/career/${id}`);
                setCareer(response.data);
                if(!response || !response.data || response.data.success === false){
                    navigate('/404');
                }
            }catch(error){
                navigate('/404');
            }
        }
        getCareer();
    }, [endpoint, id, navigate]);

    useEffect(() => {
        if(career){
            setName(career.name);
            setGraduationProfile(career.graduationProfile);
            setAdmissionProfile(career.admissionProfile);
            const subByCycles = [];  
            career.subjects.map(
                (subject) => {
                    if(!subByCycles[subject.cycle]){
                        subByCycles[subject.cycle] = [];
                    }
                    subByCycles[subject.cycle].push(subject.name);
                    return null;
                }
            );
            setSubjectsByCycle(subByCycles);
        }
    }, [career]);

    useEffect(()=>{
        // Crear un array de objetos para renderizar en tu interfaz de usuario
        const cyclesArray = Object.keys(subjectsByCycle).map(cycle => ({
            cycle,
            subjects: subjectsByCycle[cycle],
        }));
  
        // cyclesArray es un array que puedes utilizar en tu interfaz de usuario
        console.log(cyclesArray);
        setCycles(cyclesArray);
    }, [subjectsByCycle])

    return (<main>
        <section style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img src={`${endpointLocal}img/logo_azul.png`} alt="Logo universidad Monte Albán" style={
                {
                    maxWidth: '500px',
                }
            }/>
            <h1>{name}</h1>
            <h2>Perfil de egreso</h2>
            <p>{graduationProfile}</p>
            <h2>Perfil de ingreso</h2>
            <p>{admissionProfile}</p>
            <h2>Plan cuatrimestral</h2>
            <div id="cycles">
                {
                    cycles.map((cycle, index) => (
                         <Subject key={index} cycle={cycle.cycle} subjects={cycle.subjects} editar={false}/>
                    ))
                }
            </div>
        </section>
    </main>);
}

export default Career;