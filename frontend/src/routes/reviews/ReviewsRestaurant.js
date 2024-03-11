import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

import '../../style/Restaurants.css';

const API_BASE = "http://localhost:3001";

const ReviewsRestaurant = () => {
    const [reviews, setReviews] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [error, setError] = useState(null);

    const params = useParams();
    const idrest = params.idrest;

    let user = {
        name: "pedro",
        id: "65d558b610b3232a7a179dcb"
    }

    useEffect(() => {
        const getReviews = async () => {
            try {
                const response = await axios.get(`${API_BASE}/reviews/${idrest}`);

                if (response.status === 200) {
                    setReviews(response.data);

                    const userIDs = [...new Set(reviews.map(review => review.user))]

                    for (const userID of userIDs) {
                        try {
                            const responseUser = await axios.get(`${API_BASE}/users/${userID}`);
                            setUsernames(prevState => ({ ...prevState, [userID]: responseUser.data.name }));
                        } catch (error) {
                            console.error('Erro ao obter nome do usuário', error);
                        }
                    }
                }
                
            } catch (error) {
                if (error.response.status === 404) {
                    setError(error.response.data.error);
                } else {
                    console.error("Error:", error);
                    setError(error.message);
                }
                
            }
        };

        getReviews();
    }, []);

    console.log(usernames)

    return (
        <div className="reviews-page">
            <Link className="link" to={`/reviews/${idrest}/${user.id}/create`}>
                <div className="simple-button" id="create-button">
                    <p>Fazer Review</p>
                </div>
            </Link>
            <div className="review-list">
                <h2 className="category"> Categoria: Todos </h2>
                {error && <p>Error: {error}</p>}
                {reviews.map(review => (
                    <div className="review-preview" key={review.id}>
                        <div id="img-and-description">
                            <div id="preview-description">
                                <h2>{review.title}</h2>
                                <p>{review.rating}</p>
                                <p>{usernames[review.user]}</p>
                            </div>
                        </div>
                        <Link className="link" to={`/reviews/${review.restaurant}/${review.user}`}>
                            <div className="view-button">
                                <p>Visualizar</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsRestaurant;
