import { dbService } from "fbase";
import { useState } from "react";
function STwitter({ sTwitterObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newSTwitter, setNewSTwitter] = useState(sTwitterObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this message?");
    if (ok) {
      await dbService.doc(`simple-twitter/${sTwitterObj.id}`).delete();
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`simple-twitter/${sTwitterObj.id}`).update({
      text: newSTwitter,
    });
    setEditing(false);
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewSTwitter(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your message2"
              value={newSTwitter}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update message" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{sTwitterObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit message</button>
              <button onClick={onDeleteClick}>Delete message</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default STwitter;