import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from 'axios';

const API_BASE = "http://localhost:3001"

const RestaurantProfile = () => {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams()

    let user = {
        name: "pedro",
        id: "65d558b610b3232a7a179dcb"
    }

    useEffect(() => {
        fetch( API_BASE + '/restaurants/' + id)
            .then(response => {
                response.json().then(data => {
                    setRestaurant(data)
                })
            })
    }, []); 

    const [rating, setRating] = useState('');
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);
    const [ratingBool, setRatingBool] = useState(false);
    const [avg, setAvg] = useState(0);
    const [numRatings, setNumRatings] = useState(0);

    async function getOldRating(ev) {
        try {
            const oldRating = await axios.get(`${API_BASE}/ratings/${id}/${user.id}`);
    
            if (oldRating.status === 200) {
                setRatingBool(true)
                setRating(oldRating.data.rating)
            } else {
                setRatingBool(false)
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação para a API', error);
        }
    }
    getOldRating()

    async function getAvg(ev) {
        try {
            const response = await axios.get(`${API_BASE}/ratings/${id}/avg`);
    
            if (response.status === 200) {
                setAvg(response.data)
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação para a API', error);
        }
    }
    getAvg()

    async function getRatings(ev) {
        try {
            const response = await axios.get(`${API_BASE}/ratings/${id}`);
    
            if (response.status === 200) {
                setNumRatings(response.data.length)
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação para a API', error);
        }
    }
    getRatings()


    async function createRating(ev) {
        try {
            const response = await axios.post(`${API_BASE}/ratings/${id}/${user.id}/create`, {
                user: user.id,
                restaurant: id,
                rating: rating,
            });

            if (response.status === 200) {
                
            } else {
                console.error('Falha ao adicionar nota', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação para a API', error);
        }
    }

    async function editRating(ev) {

        try {
            const response = await axios.put(`${API_BASE}/ratings/${id}/${user.id}/edit`, {
                user: user.id,
                restaurant: id,
                rating: rating,
            });

            if (response.status === 200) {
                
            } else {
                console.error('Falha ao editar nota', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao fazer a solicitação para a API', error);
            }


    }
    
    return ( 
        <div>
            { restaurant && (
                <div id="restaaurant-profile">
                    {restaurant.coverImage !== "Noneundefined" && <img id="restaurant-cover" src={`${API_BASE}/${restaurant.coverImage}`} />}
                    <div className="restaurant-details">
                            <div id="img-and-data">
                                {restaurant.profileImage == "Noneundefined" && <img id="restaurant-img" src="%PUBLIC_URL%/no_restaurant_img.jpg" />}
                                {restaurant.profileImage !== "Noneundefined" && (<img id="restaurant-img" src={`${API_BASE}/${restaurant.profileImage}`} />)}
                                <div id="restaurant-main-data">
                                    <h2 id="restaurant-name">{ restaurant.name }</h2>
                                    <p className="restaurant-atribute"> Tipo de comida: {restaurant.typeOfFood}</p>
                                    <p className="restaurant-review-n"> {numRatings} Reviews</p>
                                    <p className="restaurant-avg"> Média de {avg} estrelas </p>
                                    { restaurant.site && <a className="restaurant-atribute" id="restaurant-site" href={restaurant.site}> Site oficial </a>}
                                </div>
                            </div>

                        <div id="add-and-map"> 
                            <p className="restaurant-atribute" id="address">{restaurant.address.street}, {restaurant.address.number} - {restaurant.address.neighborhood}, {restaurant.address.city}</p>
                            <iframe className="map"
                            allowfullscreen
                            referrerpolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDiNcS5K4Fr7kcD_acuX17sgIwsNS3sqnA
                            &q=${restaurant.address.street},+${restaurant.address.number}-+${restaurant.address.neighborhood}`}>
                            </iframe>
                        </div>
                    </div>

                    <div className="restaurant-actions">
                        <Link id="reviews-page" to={'/reviews/'+id}>
                            Reviews de usuários
                        </Link>
                        <Link id="create-review" to={'/reviews/'+id+'/'+user.id+'/create'}>
                            Fazer review
                        </Link>
                        <Link id="edit-page" to={'/restaurants/update/'+id}>
                            Editar Página
                        </Link>
                    </div>
                </div>
            )}
        <div>
            {ratingBool ? (
                <form onSubmit={editRating}>
                    <p>Nota</p>
                    {[...Array(totalStars)].map((star, index) => {
                        const currentRating = index + 1;

                        return (
                            <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={currentRating}
                                onChange={() => setRating(currentRating)}
                                required
                            />
                            <span
                                className="star"
                                style={{
                                color:
                                    currentRating <= (hover || rating) ? "#ffc107" : "#524d39"
                                }}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            >
                                &#9733;
                            </span>
                            </label>
                        );
                    })}
                    
                    <button className="simple-button" id="create-button" type = "submit">
                            <p>Enviar</p>
                        </button>

                </form>
            ) : (
                <form onSubmit={createRating}>

                    <p>Nota</p>
                    {[...Array(totalStars)].map((star, index) => {
                        const currentRating = index + 1;

                        return (
                            <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={currentRating}
                                onChange={() => setRating(currentRating)}
                                required
                            />
                            <span
                                className="star"
                                style={{
                                color:
                                    currentRating <= (hover || rating) ? "#ffc107" : "#524d39"
                                }}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            >
                                &#9733;
                            </span>
                            </label>
                        );
                    })}
                    
                    <button className="simple-button" id="create-button" type = "submit">
                            <p>Enviar</p>
                        </button>

                </form>
            )}
            
        </div>
        </div>
);

}

export default RestaurantProfile;