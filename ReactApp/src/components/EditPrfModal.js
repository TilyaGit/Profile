import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditPrfModal extends Component {

  constructor(props) {
    super(props);
    this.state = { snackbaropen: false, snackbarmsg: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:49902/api/profile', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID: event.target.ID.value,
        Name: event.target.Name.value,
        Age: event.target.Age.value,
        Gender: event.target.Gender.value,
        BirthDate: event.target.BirthDate.value,
        MaritalStatus: event.target.MaritalStatus.value,
        DoYouLikeToProgram: event.target.DoYouLikeToProgram.value
      })
    })
      .then(res => res.json())
      .then((result) => {
        //alert(result);
        this.setState({ snackbaropen: true, snackbarmsg: result });
      },
        (error) => {
          //alert('Failed')
          this.setState({ snackbaropen: true, snackbarmsg: 'failed' });
        }
      )
  }


  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}

          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
</IconButton>
          ]}
        />

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Profile
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>

                  <Form.Group controlId="ID">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="ID"
                      disabled
                      defaultValue={this.props.id}
                      placeholder="ID"
                    />
                  </Form.Group>

                  <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="Name"
                      required
                      defaultValue={this.props.name}
                      placeholder="Name"
                    />
                  </Form.Group>

                  <Form.Group controlId="Age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="text"
                      name="Age"
                      required
                      defaultValue={this.props.age}
                      placeholder="Age"
                    />
                  </Form.Group>

                  <Form.Group controlId="Gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      name="Gender"
                      required
                      defaultValue={this.props.gender}
                      placeholder="Gender"
                    />
                  </Form.Group>

                  {/* <Form.Group controlId="Gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select">
                      {this.state.prfs.map(prf =>
                        <option key={prf.GenderID}>{prf.Gender}</option>
                      )}
                    </Form.Control>
                  </Form.Group> */}

                  <Form.Group controlId="BirthDate">
                    <Form.Label>BirthDate</Form.Label>
                    <Form.Control
                      type="date"
                      name="BirthDate"
                      required
                      defaultValue={this.props.birthDat}
                      placeholder="BirthDate"
                    />
                  </Form.Group>

                  {/* <Form.Group controlId="MaritalStatus">
                    <Form.Label>MaritalStatus</Form.Label>
                    <Form.Control as="select">
                      {this.state.prfs.map(prf =>
                        <option key={prf.MaritalStatusID}>{prf.MaritalStatus}</option>
                      )}
                    </Form.Control>
                  </Form.Group> */}
                  <Form.Group controlId="MaritalStatus">
                    <Form.Label>MaritalStatus</Form.Label>
                    <Form.Control
                      type="text"
                      name="MaritalStatus"
                      required
                      defaultValue={this.props.maritalStatus}
                      placeholder="MaritalStatus"
                    />
                  </Form.Group>

                  <Form.Group controlId="DoYouLikeToProgram">
                    <Form.Label>DoYouLikeToProgram</Form.Label>
                    <Form.Control
                      type="text"
                      name="DoYouLikeToProgram"
                      required
                      defaultValue={this.props.doYouLikeToProgram}
                      placeholder="DoYouLikeToProgram"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update Profile
                  </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
