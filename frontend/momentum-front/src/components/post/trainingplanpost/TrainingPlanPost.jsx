import {useEffect, useState} from "react";
import {listTrainingPlanPosts} from "../../../api/functions";

export function TrainingPlanPost() {

    const [trainingPlanPosts, setTrainingPlanPosts] = useState([]);

    useEffect( () => {
            const fetchTrainingPlanPost = async () => {
                try {
                    const posts = await listTrainingPlanPosts()
                    console.log(posts)
                    setTrainingPlanPosts(posts);

                } catch (error) {
                    console.error(error);
                }
            }
            fetchTrainingPlanPost();
        },[])

    return (
        <h1>My training plans</h1>
    )

}