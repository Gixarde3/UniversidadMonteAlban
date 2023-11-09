import './css/testimonial.css';
function testimonial({name, photoTestimonial, testimonial, relation, date}){
    return(
        <div className="testimonial">
            
            <div className="testimonial-foto">
                <img src={photoTestimonial} alt="Face of testimonial creator" />
            </div>
            <div className="testimonial-left">
                <p className="testimonial-content">{testimonial}</p>
                <p className="testimonial-name">
                    - {name}
                </p>
                <p className="testimonial-relation">
                    {relation}
                </p>
                <p className="testimonial-date">
                    {date}
                </p>
            </div>
        </div>
    )
}

export default testimonial;