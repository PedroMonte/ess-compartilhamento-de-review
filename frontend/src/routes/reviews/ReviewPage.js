import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import {IconButton} from "react"
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const API_BASE = "http://localhost:3001";

const ReviewPage = () => {
    const params = useParams();
    const iduser = params.iduser;
    const idrest = params.idrest;

    const [review, setReview] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${API_BASE}/reviews/${idrest}/${iduser}`);
        
                if (response.status === 200) {
                    setReview(response.data)
                } else {
                    console.error('Falha ao obter dados do review', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao fazer a solicitação de review para a API', error);
            }

            try {
                const response = await axios.get(`${API_BASE}/restaurants/${idrest}`);
        
                if (response.status === 200) {
                    setRestaurant(response.data)
                } else {
                    console.error('Falha ao obter dados do restaurante', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao fazer a solicitação do restaurante para a API', error);
            }

            try {
                const response = await axios.get(`${API_BASE}/users/${iduser}`);
        
                if (response.status === 200) {
                    setUser(response.data)
                } else {
                    console.error('Falha ao obter dados do usuário', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao fazer a solicitação do usuário para a API', error);
            }
        }

        fetchData();
    }, [idrest, iduser]);

    return (
        <div>
            {review && user && restaurant &&(
                <div id="review-page">
                    <div className="review-details">
                        <h2>{ review.title }</h2>
                        <p>{ review.rating }</p>
                        <p>{ user.name}</p>
                        <p>{ restaurant.name}</p>
                        <p>{ review.text}</p>
                        <p>{ review.sabor }</p>
                        <p>{ review.atendimento }</p>
                        <p>{ review.tempoDeEspera }</p>
                        <p>{ review.preco }</p>
                        <p>{ review.image }</p>
                    </div>

                    <div className="restaurant-actions">
                        <Link id="reviews-page" to={`/reviews/${idrest}/${iduser}/edit`}>
                            Editar Review
                        </Link>
                        <p>Avalie este review:</p>
                        <IconButton color="primary" aria-label="like">
                        <AiOutlineLike />
                        </IconButton>
                        <p>{ review.likes }</p>
                        <IconButton color="primary" aria-label="dislike">
                        <AiOutlineDislike />
                        </IconButton>
                        <p>{ review.dislikes }</p>
                       
                    </div>
                </div>
            )}
        </div>
    );
};


export default ReviewPage;
