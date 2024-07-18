import React from "react";

const NewPostForm = (props: any) => {
  return (
    <form
      id="newPostForm"
      className="text_input_new_note"
      name="text_input_new_note"
      onSubmit={props.handleSubmit}
    >
      <input
        type="text"
        id="titleInput"
        name="title"
        onChange={props.handleChangeNewForm}
        placeholder="*Title"
        required
      />
      <input
        type="text"
        id="nameInput"
        name="name"
        onChange={props.handleChangeNewForm}
        placeholder="Author Name"
      />
      <input
        type="text"
        id="emailInput"
        name="email"
        onChange={props.handleChangeNewForm}
        placeholder="Author Email"
      />
      <textarea
        name="content"
        id="contentInput"
        onChange={props.handleChangeNewForm}
        placeholder="*Content"
        required
      ></textarea>

      <button
        className="text_input_cancel_new_note"
        name="text_input_cancel_new_note"
        onClick={props.handleCancel}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="text_input_save_new_note"
        name="text_input_save_new_note"
      >
        Save
      </button>
    </form>
  );
};

export default NewPostForm;
