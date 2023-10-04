import './css/Comment.css';
function Comment({userName, comment, time, likes}) {
    return (
            <div className="comment" style={{padding:0, marginBottom:'0.5rem'}}>
                <h4 className="username">{userName}</h4>
                <p className="comment-text">{comment}</p>
                <div className="interactions-line" style={{padding:0}}>
                    <p className='comment-ago'>hace {time}</p>
                    <button type="button" onClick = {()=>{}}>Like</button>
                    <p className="likes">{likes}</p>
                </div>
            </div>
        );
}
 
export default Comment;