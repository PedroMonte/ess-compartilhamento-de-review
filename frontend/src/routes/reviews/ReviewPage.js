import { useParams, Navigate, Link } from "react-router-dom";
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
    const [isOwner, setIsOwner] = useState(true)

    const [redirect, setRedirect] = useState(false);

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

    async function deleteReview(ev) {

        try {
            const response = await axios.delete(`${API_BASE}/reviews/${idrest}/${iduser}/delete`);

            if (response.status === 200) {
                setRedirect(true);
            } else {
                console.error('Falha ao deletar review', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação para a API', error);
        }
    }

    if (redirect) {
        return <Navigate to={`/reviews/${idrest}`} />;
    }

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
                    {isOwner ? (
                        <div>
                        <Link id="review-edit" to={`/reviews/${idrest}/${iduser}/edit`}>
                        Editar Review
                        </Link>

                        <button className="simple-button" id="create-button" onClick={() => deleteReview()}>
                        <p>Deletar Review</p>
                        </button>
                        
                        </div>
                    ): (<p></p>)}
                    <div className="restaurant-actions">
                        <p>Avalie este review:</p>
                        <p>{ review.likes }</p>
                        <p>{ review.dislikes }</p>
                       
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewPage;
