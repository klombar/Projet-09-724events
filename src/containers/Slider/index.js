import { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus && data.focus.length > 0 
    ? data.focus.sort((evtA, evtB) =>
        new Date(evtB.date) < new Date(evtA.date) ? -1 : 1
      )
    : [];

  const timeoutRef = useRef(null);

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextCard, 5000);

    return () => {
      clearTimeout(timeoutRef.current); 
    };
  }, [index]);

  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
    clearTimeout(timeoutRef.current);  
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.description || idx}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((evt, radioIdx) => (
            <input
              key={evt.title || radioIdx}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleRadioChange(radioIdx)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;