
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddPrfModal } from './AddPrfModal';
import { EditPrfModal } from './EditPrfModal';

export class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = { prfs: [], addModalShow: false, editModalShow: false }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('http://localhost:49902/api/profile')
            .then(response => response.json())
            .then(data => {
                this.setState({ prfs: data });
            }
            );
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deletePrf(id) {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:49902/api/profile/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {

        const { prfs, id, name, age, gender, birthDate, maritalStatus, doYouLikeToProgram } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>BirthDate</th>
                            <th>MaritalStatus</th>
                            <th>DoYouLikeToProgram</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prfs.map(prf =>
                            <tr key={prf.id}>
                                <td>{prf.id}</td>
                                <td>{prf.name}</td>
                                <td>{prf.age}</td>
                                <td>{prf.gender}</td>
                                <td>{prf.birthDate}</td>
                                <td>{prf.maritalStatus}</td>
                                <td>{prf.doYouLikeToProgram}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                id: prf.id,
                                                name: prf.name,
                                                age: prf.age,
                                                gender: prf.gender,
                                                birthDate: prf.birthDate,
                                                maritalStatus: prf.maritalStatus,
                                                doYouLikeToProgram: prf.doYouLikeToProgram
                                            })}
                                        >
                                            Edit
</Button>

                                        <Button className="mr-2"
                                            onClick={() => this.deletePrf(prf.id)}
                                            variant="danger"
                                        >Delete</Button>

                                        <EditPrfModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            id={id}
                                            name={name}
                                            age={age}
                                            gender={gender}
                                            birthDate={birthDate}
                                            maritalStatus={maritalStatus}
                                            doYouLikeToProgram={doYouLikeToProgram}
                                        />

                                    </ButtonToolbar>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button
                        variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}
                    >Add Profile</Button>

                    <AddPrfModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />

                </ButtonToolbar>
            </div>
        )
    }

}