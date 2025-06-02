import axios from "axios";
const { jwtDecode } = require('jwt-decode');


export async function listUsers() {
    const result =  await axios.get("http://localhost:8080/usuario",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}

export async function listRecreationalPosts() {
    const result =  await axios.get("http://localhost:8080/miperfil/recPost",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}

export async function listTrainingPlanPosts() {
    const result = await axios.get("http://localhost:8080/miperfil/trainingPlan",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}
export async function listEventPosts() {
    const result = await axios.get("http://localhost:8080/events",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}

export async function listJoinedEventPosts() {
    const result = await axios.get("http://localhost:8080/joinedEvents",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}

export async function deleteEvent(idEvent) {
    const result =  await axios.delete(`http://localhost:8080/events/${idEvent}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return result.data;
}

export async function deleteParticipantsFromEvent(idEvent) {
    const result = await axios.delete(`http://localhost:8080/events/${idEvent}/participants`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return result.data;
}




export const handleFileChangeImg = async (event, setBase64) => {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        try {
            const base64String = await convertToBase64(file);
            setBase64(base64String);
            console.log('Base64:', base64String);

        } catch (error) {
            console.error('Error converting file:', error);
        }
    }
};

export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export function getUserRole() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        console.log(decoded)
        return decoded.role; // Esto debería devolver "RUNNER" o "COACH"
    } catch (e) {
        console.error("Invalid token", e);
        return null;
    }
}

export async function listFollowingRecreationalPosts(){
    const result = await axios.get("http://localhost:8080/usuario/recreationalPostsFollowing",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}

export async function listFollowingTrainingPlansPosts(){
    const result = await axios.get("http://localhost:8080/usuario/trainingPlanPostsFollowing",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}
export function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now;
    } catch (e) {
        return true; // si falla el parseo lo tratamos como expirado o inválido
    }
}
export async function listUsersByNameSearch(nameSearch){
    const result = await axios.get(`http://localhost:8080/usuario/search?nameSearch=${nameSearch}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}

export async function follow(userId){
    const result = await axios.post(`http://localhost:8080/usuario/follow/${userId}`, {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}
export async function unFollow(userId){
    const result = await axios.delete(`http://localhost:8080/usuario/unfollow/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}
export async function listFollowedUsers(){
    const result = await axios.get(`http://localhost:8080/usuario/following`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}

export async function joinEvent(eventId){
    const result = await axios.post(`http://localhost:8080/events/${eventId}/participants`, {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}

export async function unJoin(eventId){
    const result = await axios.delete(`http://localhost:8080/events/unjoin/${eventId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}

export async function listJoinedEvents(){
    const result = await axios.get(`http://localhost:8080/events/joined`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}
export async function listEventsByNameSearch(nameSearch){
    const result = await axios.get(`http://localhost:8080/event/search?nameSearch=${nameSearch}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}

export async function listProfileInfo(){
    const result = await axios.get(`http://localhost:8080/usuario/listMyInfo`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}

export async function listFollowingOrderedByKms() {
    const result = await axios.get(`http://localhost:8080/usuario/following-total-kms`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    console.log(result.data)
    return result.data;
}
export async function listFollowingOrderedByEventsCompleted() {
    const result = await axios.get(`http://localhost:8080/usuario/following-events-completed`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}
export async function deleteRecPost(postId){
    const result = await axios.delete(`http://localhost:8080/miperfil/recPost/${postId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}
export async function deleteTrainPost(postId){
    const result = await axios.delete(`http://localhost:8080/miperfil/trainingPlan/${postId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}
export async function deleteAccount(){
    const result = await axios.delete(`http://localhost:8080/usuario`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}
export async function getKmRanByUser(userId) {
    const result = await axios.get(`http://localhost:8080/users/${userId}/progress/kmran`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}

export async function listUsersFollowing() {
    const result =  await axios.get("http://localhost:8080/usuario/following",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}
export async function createConversation(user2id){
    const result = await axios.post(`http://localhost:8080/api/conversations/create/${user2id}`, {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result;
}
export async function getCaloriesBurnedByUser(userId){
    const result = await axios.get(`http://localhost:8080/users/${userId}/progress/caloriesburned`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}
export async function getEventsCompletedByUser(userId){
    const result = await axios.get(`http://localhost:8080/users/${userId}/progress/eventscompleted`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}
export async function getFriendsMadeByUser(userId){
    const result = await axios.get(`http://localhost:8080/users/${userId}/progress/friendsmade`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}
export async function getGoalsCompletedByUser(userId){
    const result = await axios.get(`http://localhost:8080/users/${userId}/progress/goalscompleted`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}
// Obtener un post con todas sus interacciones
export const getPostWithInteractions = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/miperfil/recPost/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching post with interactions:", error);
        throw error;
    }
};

// Dar/quitar like
export const toggleLike = async (postId) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/likes/toggle/${postId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error toggling like:", error);
        throw error;
    }
};

// Añadir comentario
export const addComment = async (postId, text) => {
    try {
        const response = await axios.post(`http://localhost:8080/comments`, {
            text: text,
            postId: postId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};