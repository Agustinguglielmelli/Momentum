function Registrousuario({ username, email, password, profilePicture }) {
    return (
      <div>
        <h1>Registro de Usuario</h1>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} required />
          </div>
  
          <br />
  
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} required  />
          </div>
  
          <br />
  
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} required />
          </div>
  
          <br />
  
          <div>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input type="file" id="profilePicture" name="profilePicture" accept="image/*" />
            {profilePicture && <img src={profilePicture} alt="Profile" width="100" />}
          </div>
  
          <br />
  
          <div>
            <input type="radio" name="role" value="Runner" /> Runner
            <input type="radio" name="role" value="Coach" /> Coach
          </div>
  
          <br />
  
          <div>
            <button type="submit">Registrar</button>
          </div>
        </form>
      </div>
    );
  }
  
  export default Registrousuario;
  
// Este es un componente que representa un formulario de registro de usuario.