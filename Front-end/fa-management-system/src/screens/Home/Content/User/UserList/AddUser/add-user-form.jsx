import React from "react";
import "./add-user-form.css";

const AddUserForm = ({ showForm, closeForm }) => {
  const handleCloseForm = (e) => {
    e.preventDefault();
    closeForm();
  };

  return (
    <div className="user-form-popup-container">
      <div className="user-form">
        <form action="" className="user-form-container">
          <div className="ip ip-name-email">
            {" "}
            <div className="user-name">
              <label htmlFor="full-name">Full name</label>
              <div className="input-form input-name">
                <input type="text" />
              </div>
            </div>
            <div className="user-email">
              <label htmlFor="email">Email</label>
              <div className="input-form input-email">
                <input type="email" />
              </div>
            </div>
          </div>
          <div className="ip ip-phone-doba">
            <div className="user-phone">
              <label htmlFor="phone">Phone</label>
              <div className="input-form input-phone">
                <input type="number" />
              </div>
            </div>
            <div className="user-dob">
              {" "}
              <label htmlFor="">Birthday</label>
              <div className="input-form input-dob">
                <input type="date" />
              </div>
            </div>
          </div>

          <div className="user-gender">
            <label>Gender:</label>
            <div className="user-gender-choice">
              <label htmlFor="female">Male</label>
              <input type="radio" name="gender" value="Male" />
              <label htmlFor="female">Female</label>
              <input type="radio" name="gender" value="Female" id="female" />
            </div>
          </div>

          <div className="user-isActive">
            <label htmlFor="">Active</label>
            <input type="checkbox" />
          </div>
          <div className="user-type">
            <select name="" id="" className="user-type-select">
              <option value="#">Super admin</option>
              <option value="#">Admin</option>
              <option value="#">Trainer</option>
            </select>
          </div>
          <div className="btn-action-form">
            <button className="btn-action-save">Save</button>
            <button className="btn-close-save" onClick={handleCloseForm}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
