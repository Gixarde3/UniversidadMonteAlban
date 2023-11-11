import axios from 'axios';
import config from './config.json';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Career() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [career, setCareer] = useState(null);
    const endpoint = config.endpoint;
    const endpointLocal = config.endpointLocal;
    const [expandedCycles, setExpandedCycles] = useState({});
    useEffect(() => {
        const getCareer = async() => {
            try{
                const response = await axios.get(`${endpoint}/career/${id}`);
                setCareer(response.data);
            }catch(error){
                navigate('/404');
            }
        }
        getCareer();
    }, [endpoint, id, navigate]);
    

    // Agrupar las materias por ciclo
    const groupedSubjects = career.subjects.reduce((acc, subject) => {
        if (!acc[subject.cycle]) {
            acc[subject.cycle] = [];
        }
        acc[subject.cycle].push(subject);
        return acc;
    }, {});

    // Crear una lista de listas con los ciclos y las materias correspondientes
    const cycleList = Object.entries(groupedSubjects).map(([cycle, subjects]) => {
        const isExpanded = expandedCycles[cycle];
        return (
            <li key={cycle}>
                <h2 onClick={() => setExpandedCycles({...expandedCycles, [cycle]: !isExpanded})}>
                    {`Ciclo ${cycle}`}
                    {isExpanded ? ' -' : ' +'}
                </h2>
                {isExpanded && (
                    <ul>
                        {subjects.map((subject) => (
                            <li key={subject.name}>{subject.name}</li>
                        ))}
                    </ul>
                )}
            </li>
        );
    });

    return (<main>
        <img src={`${endpointLocal}img/logo_azul.png`} alt="Logo universidad Monte Albán" />
        <h1>{career.name}</h1>
        <p>{career.graduationProfile}</p>
        <p>{career.admissionProfile}</p>
        <ul>{cycleList}</ul>
    </main>);
}

export default Career;