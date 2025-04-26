import React from 'react';

const VerticalDivider = () => {
  return (
    <div style={styles.container}>
      <div style={styles.line}></div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: 'auto', // Esto asegura que se adapte al contenedor padre
    padding: '0 1rem',
  },
  line: {
    width: '1px',
    height: '100%', // Podés ajustar o hacerlo en %
    backgroundColor: '#ccc', // gris claro
  },
};

export default VerticalDivider;