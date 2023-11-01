import './css/Comment.css';
function Comment({userName, coment, isCreator}) {
    return (
            <div className="comment" style={{padding:0, marginBottom:'0.5rem'}}>
                <h4 className="username" style={{textAlign:'left'}}>{userName}</h4>
                <p className="comment-text">{coment}</p>
                <div className="interactions-line" style={{padding:0}}>
                    {isCreator ? <button type="button" onClick = {()=>{}}>Editar</button> : ''}
                    {isCreator ? <button type="submit" onClick = {()=>{}} style={{color:'#FE2A2A', fontWeight:'600'}}>Eliminar</button> : ''}
                </div>
            </div>
        );
}
 
export default Comment;