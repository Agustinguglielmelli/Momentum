
function RecreationalPost() {

    useEffect(() => { 
        async function getRunnerData() {
            try {
                const response = await axios.get(`http://localhost:8080/usuario/${id}`);
                const data = response.data;
                setusername(data.username || "");
                setBase64(data.profile_picture || "");
            } catch (error) {
                console.error("Error fetching coach data:", error);
            }
        }

        getRunnerData();
    }, [id]);

    return (
        <></>
    )
}

export default RecreationalPost;