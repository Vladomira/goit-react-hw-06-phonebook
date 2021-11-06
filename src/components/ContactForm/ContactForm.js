import { useState } from "react";
import { connect } from "react-redux";
import contactsActions from "../../redux/contacts-actions";
import PropTypes from "prop-types";
const { v4: uuidv4 } = require("uuid");

///
function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, number);

    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };
  return (
    <form className="form__box" onSubmit={handleSubmit}>
      <label className="form__label-box">
        <span className="form__label"> Name</span>
        <input
          className="form__input"
          value={name}
          onChange={handleChange}
          id={uuidv4()}
          type="text"
          name="name"
          data-action="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label>
        <span className="form__label"> Number</span>
        <input
          className="form__input"
          onChange={handleChange}
          id={uuidv4()}
          value={number}
          type="tel"
          name="number"
          data-action="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять из цифр, и может содержать пробелы, тире, круглые скобки, и может начинаться с +"
          required
        />
      </label>

      <div className="form__btn-thumb">
        <button
          className="form__addBtn"
          type="submit"
          disabled={!number || !name}
        >
          Add contact
        </button>
      </div>
    </form>
  );
}
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (name, number) =>
    dispatch(contactsActions.addContact(name, number)),
});
export default connect(null, mapDispatchToProps)(ContactForm);
