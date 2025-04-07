import axios from "axios";

export async function listUsers() {
    const result =  await axios.get("http://localhost:8080/usuario");
    return result.data;
}


