import { useState, useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/Modal";
import Icon from "@mdi/react";
import { mdiCards } from "@mdi/js";
import "./Add.css";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../blocks/User/UserContext";
import { ActivityListContext } from "../../blocks/ActivityList/ActivityListContext";
import { useNavigate } from "react-router-dom";
function Add() {
  const { state, handlerMap } = useContext(ActivityListContext);
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container fluid className="text-center">
        <button className="Add" onClick={handleShow}>
          <Icon path={mdiCards} size={3} color={"yellow"} />
          <p>Add Activity</p>
        </button>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Your New Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              var formData = Object.fromEntries(new FormData(e.target));
              formData.timeGoal = parseInt(formData.timeGoal);
              formData.owner = loggedInUser.id;

              try {
                await handlerMap.handleCreate(formData);

                setShow(false);
              } catch (e) {
                console.error(e);
                setShow(e.message);
              }
              navigate("/activity");
            }}
          >
            <Form.Group className="mb-3" id="name">
              <Form.Label>Activity Name</Form.Label>
              <Form.Control type="string" name="name" autoFocus />
            </Form.Group>

            <Form.Group className="mb-3" id="quote">
              <Form.Label>Motivational Quote</Form.Label>
              <Form.Control type="string" name="quote" />
            </Form.Group>

            <Form.Group className="mb-3" id="timeGoal">
              <Form.Label>Time Goal</Form.Label>
              <Form.Control type="number" name="timeGoal" />
            </Form.Group>
            <Modal.Footer>
              <button type="button" onClick={handleClose}>
                Leave
              </button>
              <button type="submit" onClick={handleClose}>
                Create
              </button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Add;
