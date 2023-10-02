import './css/Components.css';
import Header from './Header'
function Home() {
        return (
            <div id="index">
                <Header/>
                <main>
                    <p>Probando si solo es en el header, o esto ocurrirá en toda la página</p>
                </main>
                <footer>
                </footer>
            </div>
        );
}
 
export default  Home;