import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';

const StarRating = ({onSelectRating}) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleClick = (ratingValue) => {
        setRating(ratingValue);
        onSelectRating(ratingValue);
    }

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <input
                          type="radio"
                          name= "rating"
                          value={ratingValue}
                          onClick={()=> handleClick(ratingValue)}
                          />
                        <FaStar
                           className="star"
                           color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                           size= {30}
                           onMouseEnter={() => setHover(ratingValue)}
                           onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}       
        </div>
    );
};

export default StarRating
