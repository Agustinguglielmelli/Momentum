

function Carousel({ imageList }) {
    if (!Array.isArray(imageList) || imageList.length === 0) {
        return <div>No images available</div>;  // Muestra un mensaje si no hay imágenes
    }
    return (

        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {imageList.map((image, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`} // solo la imagen con index 0 es active
                    >
                        <img
                            className="d-block w-100"
                            src={image.base64Data}
                            alt={`slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            {/* los botones estos andan porque importamos en index.js un script de bootstrap */}
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
}


export default Carousel;