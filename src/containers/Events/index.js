import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData(); // Récupération des événements via un contexte
  const [type, setType] = useState(); // Catégorie sélectionnée
  const [currentPage, setCurrentPage] = useState(1); // Page courante

  // Filtrage des événements en fonction du type sélectionné
  const filteredEvents = data?.events
    .filter(event => !type || event.type === type) // Filtre si une catégorie est sélectionnée
    .slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE) || []; // Pagination des événements filtrés

  // Nombre total de pages pour la pagination
  const pageNumber = Math.ceil((data?.events.filter(event => !type || event.type === type).length || 0) / PER_PAGE);

  // Fonction pour changer la catégorie sélectionnée
  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialiser la page à 1 lors du changement de catégorie
    setType(evtType);  // Mettre à jour la catégorie
  };

  // Récupération des types uniques d'événements
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>Une erreur est survenue</div>}
      {!data ? (
        "Chargement..."
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)} 
            value={type} 
            onChange={(value) => changeType(value)} 
            titleEmpty={false} 
          />
          <div id="events" className="ListContainer">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <Modal key={event.id} Content={<ModalEvent event={event} />}>
                  {({ setIsOpened }) => (
                    <EventCard
                      onClick={() => setIsOpened(true)}
                      imageSrc={event.cover || " "}
                      title={event.title || " "}
                      date={new Date(event.date)}
                      label={event.type || " "}
                    />
                  )}
                </Modal>
              ))
            ) : (
              <p>Aucun événement trouvé pour cette catégorie.</p> // Message si aucun événement ne correspond à la catégorie
            )}
          </div>
          {pageNumber > 1 && (
            <div className="Pagination">
              {[...Array(pageNumber)].map((_, n) => (
                <a 
                // eslint-disable-next-line react/no-array-index-key
                  key={n} 
                  href="#events" 
                  className={currentPage === n + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(n + 1)}
                >
                  {n + 1}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EventList;