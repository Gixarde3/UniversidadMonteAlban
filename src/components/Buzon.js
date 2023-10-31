import './css/buzon.css';
function Buzon() { 
    const handleSubmit = async (event) => {
        event.preventDefault();
    }
    return (
        <main>
            <section id="buzon">
                <form onSubmit={handleSubmit}>
                    <img src="img/logo_azul.png" alt="Imagen del logo de la universidad" id="logo" />
                    <h1>Buzón de sugerencias</h1>
                    <label htmlFor="name">Nombre completo:</label>
                    <input type="text" name="name" id="name" placeholder='Ingresa tu nombre completo' required/>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="text" name="email" id="email" placeholder='Ingresa tu email' required/>
                    <label htmlFor="sugerencia">Sugerencia:</label>
                    <textarea name="sugerencia" id="sugerencia" cols="30" rows="10" required></textarea>
                    <button type="submit" id="btn-enviar" className='button'>Enviar sugerencia</button>
                </form>
            </section>
        </main>
    );
}
 
export default Buzon;