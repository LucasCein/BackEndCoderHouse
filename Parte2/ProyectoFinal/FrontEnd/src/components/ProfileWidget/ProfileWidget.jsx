import { faUser, faTimes  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import './ProfileWidget.css'; // Asegúrate de tener este archivo para los estilos

const ProfileWidget = () => {
  const [isOpen, setIsOpen] = useState(false);


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <button onClick={openModal} className="btn btn-dark modal-open-button">
          <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />
        </button>
      </div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="modal-close-button">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="text-dark">Perfil de Usuario</h2>
            {user ? (
              <div>
                <p className="text-dark"><strong>Email:</strong> {user.email}</p>
                <p className="text-dark"><strong>Address:</strong> {user.address}</p>
                {/* Agrega más campos según sea necesario */}
              </div>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileWidget;
