import './css/testimonial.css';
import Search from "./Search";
import TestimonialResult from './TestimonialResult';
function SearchTestimonial(){

    /*
    const handleSubmitEdit = async(event) => {
        event.preventDefault();
        openAlert("¿Seguro de editar?", `Los cambios no serán reversibles`, "question", null, true, edittestimonial);  

    }
    */
    /*
    const editTestimonial = async(id_testimonial) => {
        try {
            const cookie = Cookies.get('session');
            const response = await axios.post(`${endpoint}/testimonial/edit/${id_testimonial}`, {
                cookie: cookie});
            openAlert("Error inesperado", `El testimonio no se ha podido editar debido a un error inesperado`, "error", null, false);
            if(response && response.data && response.data.success === false){
                openAlert("Error inesperado", `El testimonio no se ha podido editar debido a un error inesperado`, "error", null, false);
            }else{
                openAlert("testimonio editado", "El testimonio se ha editado con éxito", "success", null, false);
                setEditing(false);
            }
        } catch (error) {
            console.log(error);
            openAlert("Error de conexión", `La petición ha fallado por ${error} ${error.response}`, "error", null, false);
        }
    }*/

    

    return(
        <>
        <Search aBuscar="testimonial" titleSearch="testimonio" renderResults={(results) =>(
            results.map((result, index) => (
                <TestimonialResult result={result} key={index}/>
            ))
        )}/>
        </>
    )
}
export default SearchTestimonial;