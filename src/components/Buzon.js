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
                    <h4>Ingresa todos los para enviar tu sugerencias</h4>
                    <label htmlFor="Username">Nombre completo:</label>
                    <input type="text" name="name" id="name" placeholder='Ingresa tu nombre completo' required/>
                    <label htmlFor="Email">Correo electrónico:</label>
                    <input type="text" name="email" id="email" placeholder='Ingresa tu email' required/>
                    <label htmlFor="Email">Sugerencia:</label>
                    <textarea name="sugerencia" id="sugerencia" cols="30" rows="10" required></textarea>
                    <button type="submit" id="btn-enviar">Enviar sugerencia</button>
                </form>
            </section>
        </main>
    );
}
 
export default Buzon;