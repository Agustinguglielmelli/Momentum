import "./FeedNuevoCss.css"
function FeedNuevo(){
    return(
        <div className="main-container">
            <div className="sidebar-left">
                <div className="profile-card">
                    <div className="profile-pic">👤</div>
                    <h3>Carlos Sánchez</h3>
                    <p>@carlos_runner</p>
                    <div className="stats">
                        <div className="stat-item">
                            <div className="stat-value">128</div>
                            <div className="stat-label">Carreras</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">45</div>
                            <div className="stat-label">Seguidores</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">38</div>
                            <div className="stat-label">Siguiendo</div>
                        </div>
                    </div>
                </div>

                <ul className="menu-list">
                    <li><a href="#"><span>🏠</span> Inicio</a></li>
                    <li><a href="#"><span>🔍</span> Explorar</a></li>
                    <li><a href="#"><span>📊</span> Estadísticas</a></li>
                    <li><a href="#"><span>📅</span> Eventos</a></li>
                    <li><a href="#"><span>🗺️</span> Mis rutas</a></li>
                    <li><a href="#"><span>👥</span> Comunidad</a></li>
                    <li><a href="#"><span>⚙️</span> Ajustes</a></li>
                </ul>
            </div>

            <div className="feed">
                <div className="create-post">
                    <div className="post-input">
                        <div className="post-avatar">👤</div>
                        <textarea className="post-textarea" placeholder="¿Cómo fue tu carrera hoy?"></textarea>
                    </div>
                    <div className="post-actions">
                        <div className="post-attachments">
                            <button className="attach-btn"><span>📷</span> Foto</button>
                            <button className="attach-btn"><span>📍</span> Ubicación</button>
                            <button className="attach-btn"><span>📊</span> Estadísticas</button>
                        </div>
                        <button className="submit-post">Publicar</button>
                    </div>
                </div>

                <div className="post">
                    <div className="post-header">
                        <div className="post-user-avatar">👤</div>
                        <div className="post-user-info">
                            <div className="post-username">Laura Gómez</div>
                            <div className="post-time">Hace 2 horas</div>
                        </div>
                        <button className="post-more">•••</button>
                    </div>
                    <div className="post-content">
                        <div className="post-text">
                            ¡Increíble carrera matutina! 🏃‍♀️ Logré hacer 12km en 58 minutos. Las mañanas en el parque
                            son perfectas para correr. #Running #MorningRun
                        </div>
                        <img className="post-image" src="/api/placeholder/600/400" alt="Ruta de carrera en el parque"/>
                    </div>
                    <div className="post-stats">
                        <div>18 Me gusta</div>
                        <div>5 Comentarios</div>
                    </div>
                    <div className="post-footer">
                        <div className="post-action">👍 Me gusta</div>
                        <div className="post-action">💬 Comentar</div>
                        <div className="post-action">↗️ Compartir</div>
                    </div>
                </div>

                <div className="post">
                    <div className="post-header">
                        <div className="post-user-avatar">👤</div>
                        <div className="post-user-info">
                            <div className="post-username">Alejandro Torres</div>
                            <div className="post-time">Hace 5 horas</div>
                        </div>
                        <button className="post-more">•••</button>
                    </div>
                    <div className="post-content">
                        <div className="post-text">
                            Nuevo récord personal en media maratón: 1h 32m 🎉 La preparación para la maratón va por buen
                            camino. Gracias a todos por sus consejos y apoyo constante. ¡A seguir entrenando!
                        </div>
                    </div>
                    <div className="post-stats">
                        <div>32 Me gusta</div>
                        <div>12 Comentarios</div>
                    </div>
                    <div className="post-footer">
                        <div className="post-action">👍 Me gusta</div>
                        <div className="post-action">💬 Comentar</div>
                        <div className="post-action">↗️ Compartir</div>
                    </div>
                </div>

                <div className="post">
                    <div className="post-header">
                        <div className="post-user-avatar">👤</div>
                        <div className="post-user-info">
                            <div className="post-username">Grupo Runners Capital</div>
                            <div className="post-time">Hace 8 horas</div>
                        </div>
                        <button className="post-more">•••</button>
                    </div>
                    <div className="post-content">
                        <div className="post-text">
                            🏆 ¡Atención corredores! El próximo domingo tendremos nuestro encuentro mensual en el Parque
                            Central. Salida a las 8:30 AM, tendremos rutas de 5K, 10K y 15K. ¡No falten! Compartiremos
                            un desayuno saludable después de la carrera.
                        </div>
                        <img className="post-image" src="/api/placeholder/600/350"
                             alt="Mapa del parque con rutas marcadas"/>
                    </div>
                    <div className="post-stats">
                        <div>45 Me gusta</div>
                        <div>23 Comentarios</div>
                    </div>
                    <div className="post-footer">
                        <div className="post-action">👍 Me gusta</div>
                        <div className="post-action">💬 Comentar</div>
                        <div className="post-action">↗️ Compartir</div>
                    </div>
                </div>
            </div>

            <div className="sidebar-right">
                <div className="trending-section">
                    <h3 className="section-title">Tendencias</h3>
                    <div className="trending-item">
                        <div className="trending-tag">#MaratonCiudad2025</div>
                        <div className="trending-stats">1.2K publicaciones esta semana</div>
                    </div>
                    <div className="trending-item">
                        <div className="trending-tag">#TécnicaDeCarrera</div>
                        <div className="trending-stats">845 publicaciones esta semana</div>
                    </div>
                    <div className="trending-item">
                        <div className="trending-tag">#CorrerEnInvierno</div>
                        <div className="trending-stats">621 publicaciones esta semana</div>
                    </div>
                </div>

                <div className="suggested-section">
                    <h3 className="section-title">Sugerencias para ti</h3>
                    <div className="suggested-user">
                        <div className="suggested-avatar">👤</div>
                        <div className="suggested-info">
                            <div className="suggested-name">Marta Ruiz</div>
                            <div className="suggested-stats">125 carreras registradas</div>
                        </div>
                        <button className="follow-btn">Seguir</button>
                    </div>
                    <div className="suggested-user">
                        <div className="suggested-avatar">👤</div>
                        <div className="suggested-info">
                            <div className="suggested-name">Club Trail Montaña</div>
                            <div className="suggested-stats">1.8K miembros</div>
                        </div>
                        <button className="follow-btn">Seguir</button>
                    </div>
                    <div className="suggested-user">
                        <div className="suggested-avatar">👤</div>
                        <div className="suggested-info">
                            <div className="suggested-name">Daniel Vega</div>
                            <div className="suggested-stats">89 carreras registradas</div>
                        </div>
                        <button className="follow-btn">Seguir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedNuevo;