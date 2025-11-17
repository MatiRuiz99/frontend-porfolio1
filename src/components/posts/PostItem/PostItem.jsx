import React, { useContext, useState } from "react";
import "./PostItem.css";
import Card from "../../user/card/Card";
import Button from "../../Elements/Button/Button";
import Map from "../../Elements/Map/Map";
import Modal from "../../Elements/Modal/Modal";
import Backdrop from "../../Header/Backdrop/Backdrop";
import { AuthContext } from "../../Elements/Context/auth-context";
import { useHttpClient } from "../../Elements/Hook/http-hook";
import ErrorModal from "../../Elements/Error/ErrorModal";
import LoadingSpinner from "../../Elements/Loading/LoadingSpinner";

const PostItem = (p) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  console.log("auth.userId:", auth.userId);
  console.log(p);
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${p.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      p.onDelete(p.id);
    } catch (error) {}
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={p.address}
        contentClass="place-item_modal-content"
        footerClass="place-item_modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={p.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="post-item_modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>You sure you want to delete?</p>
      </Modal>

      <li className="post-item">
        <Card className="post-item_content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="post-item_image">
            <img
              src={`${import.meta.env.VITE_BACKENDIMAGE_URL}/${p.image}`}
              alt={p.title}
            />
          </div>
          <div className="post-item_info">
            <h2>{p.title}</h2>
            <h3>{p.address}</h3>
            <p>{p.description}</p>
          </div>
          <div className="place-item_actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.userId === p.creator && (
              <Button to={`/post/${p.id}`}>EDIT</Button>
            )}
            {auth.userId === p.creator && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PostItem;
