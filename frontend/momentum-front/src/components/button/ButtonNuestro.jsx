

function ButtonNuestro({ type, text, onClick, className}) {// className es color del boton
    return <button type={type} onClick={onClick} className={`btn ${className}`}>{text}</button>;
  }
  
export default ButtonNuestro;
  // componente boton que recibe un texto, una funcion y una clase como props.
// el texto es el que se muestra en el boton, la funcion es la que se ejecuta al hacer click y la clase es la clase que se le asigna al boton
