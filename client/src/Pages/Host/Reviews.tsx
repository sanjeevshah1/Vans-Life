import Star from "./../../assets/star.png"
const Reviews = () => {
  return (
   <div className="review-container">
      <div className="your-review">
        <div className="review-day flex">
          <p className="heading">Your review</p>
          <p>last <span id="days">30 days</span></p>
        </div>
      </div>
      <div className="rating verti-center">
        <p>5.0</p>
        <img src={Star} id="star" alt="star-logo" />
        <p>overall rating</p>
      </div>
      <div className="rate-percent flex verti-center">
        <p>4 Stars</p>
        <div className="percent-bar">
          <div className="inner-100"></div>
        </div>
        <p>100%</p>
      </div>
      <div className="rate-percent flex verti-center">
        <p>4 Stars</p>
        <div className="percent-bar">
          <div className=""></div>
        </div>
        <p>0%</p>
      </div>
      <div className="rate-percent flex verti-center">
        <p>3 Stars</p>
        <div className="percent-bar">
          <div className=""></div>
        </div>
        <p>0%</p>
      </div>
      <div className="rate-percent flex verti-center">
        <p>2 Stars</p>
        <div className="percent-bar">
          <div className=""></div>
        </div>
        <p>0%</p>
      </div>
      <div className="rate-percent flex verti-center">
        <p>1 Stars</p>
        <div className="percent-bar">
          <div className=""></div>
        </div>
        <p>0%</p>
      </div>
      <div className="review-lists">
        <p>Reviews (2)</p>
        <div className="review-box flex">
          <div className="multiple-stars flex">
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />  
          </div>
          <p>Elliot <span id="full-date">December 1, 2022</span></p>
          <p>The beach bum is such as awesome van! Such as comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!</p>
        </div>
        <div className="review-box flex">
          <div className="multiple-stars flex">
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />  
          </div>
          <p>Elliot <span id="full-date">December 1, 2022</span></p>
          <p>The beach bum is such as awesome van! Such as comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!</p>
        </div>
        <div className="review-box flex">
          <div className="multiple-stars flex">
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />
            <img src={Star} className="mini-star" alt="" />  
          </div>
          <p>Elliot <span id="full-date">December 1, 2022</span></p>
          <p>The beach bum is such as awesome van! Such as comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!</p>
        </div>
      </div>
   </div>
  )
}

export default Reviews