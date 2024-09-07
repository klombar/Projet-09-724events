import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const resetFields = () => {

    setNom("");
    setPrenom("");
    setType("");
    setEmail("");
    setMessage("");
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
        resetFields(); 
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder="Nom"
            label="Nom"
            value={nom}
            onChange={(e) => {
              if (e && e.target) {
                setNom(e.target.value);
              }
            }}
          />
          <Field
            placeholder="Prénom"
            label="Prénom"
            value={prenom}
            onChange={(e) => {
              if (e && e.target) {
                setPrenom(e.target.value);
              }
            }}
          />
          <Select
            selection={["Personnel", "Entreprise"]}
            value={type}
            onChange={(newValue) => setType(newValue)}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            type={FIELD_TYPES.INPUT_EMAIL}
            placeholder="Ex : VotreMail@email.com"
            label="Email"
            value={email}
            onChange={(e) => {
              if (e && e.target) {
                setEmail(e.target.value);
              }
            }}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="Message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={message}
            onChange={(e) => {
              if (e && e.target) {
                setMessage(e.target.value);
              }
            }}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;