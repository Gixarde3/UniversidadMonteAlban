import './css/alert.css';
function ModalForm({ isOpen, title, form, kind, closeAlert, submit }) {
    return isOpen ? (
        <div className="alert">
          <div className="content-alert">
            <button className="close-alert" onClick={closeAlert}>
              <img src="img/close.png" alt="Icono cerrar la alerta" />
            </button>
            <h3>{title}</h3>
            <img src={"img/" + (kind === 'success' ? "success.png" : "error.png")} alt="Icono de alerta" className="icon"/>
            <form onSubmit={submit}>
                {form}
                <button type="submit" className="accept">
                    Enviar
                </button>
            </form>
          </div>
        </div>
      ) : null;
}
 
export default ModalForm;