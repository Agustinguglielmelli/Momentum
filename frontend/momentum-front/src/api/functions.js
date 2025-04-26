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

export async function listFollowingPosts(){
    const result = await axios.get("http://localhost:8080/usuario/recreationalPostsFollowing",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    return result.data;
}




