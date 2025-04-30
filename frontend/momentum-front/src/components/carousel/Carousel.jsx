import {useState} from "react";


function Carousel({ imageList }) {
    const [imageIndex, setImageIndex] = useState(0);

    if (!Array.isArray(imageList) || imageList.length === 0) {
        return <div>No images available</div>;  // Muestra un mensaje si no hay imágenes
    }


    function handleNext(){
        /*Le paso el indice, si el indice es igual a length de la lista
        * significa que estoy en la ultima foto y debo volver a la primera,
        * entonces seteo 0, sino, seteo prevIndex + 1 */
        setImageIndex((prevIndex) =>
            prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
        );
    }
    function handlePrev(){
        setImageIndex((prevIndex) =>
            prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
        );
    }

    return (

        <div className="carousel slide">
            <div className="carousel-inner">
                {imageList.map((image, index) => (
                    <div
                        key={index}
                        /* solo la imagen con index 0 es active */
                        className={`carousel-item ${index === imageIndex ? "active" : ""}`}
                    >
                        <img
                            className="d-block w-100"
                            src={image.base64Data}
                            alt={`slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            {imageList.length > 1 && ( // solo se muestran si hay mas de una foto
                <>  <div className="previous">
                        <a className="carousel-control-prev" role="button" data-bs-slide="prev" onClick={handlePrev}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </div>
                    <a className="carousel-control-next" role="button" data-bs-slide="next" onClick={handleNext}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </>
            )}
        </div>
    );
}


export default Carousel;