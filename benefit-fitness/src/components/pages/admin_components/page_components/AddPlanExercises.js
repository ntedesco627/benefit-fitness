import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import AddExercise from "./AddExercise";

class AddPlanExercises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercises: [],
            choices: [],
            isOpen: false
        }
    }

    componentDidMount() {
        this.getExercises();
    }

    getExercises = () => {
        // const {user} = this.props.auth;
        axios.get('/api/exercises/')
            .then(res => {
                const data = res.data
                this.setState({choices: data})
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    showModal = () => {
        this.setState({
            isOpen: true
        })
    }

    hideModal = () => {
        this.setState({
            isOpen: false
        })
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    valid = () => {
        let exerciseErr = "";

        if(!this.state.exercises) {
            exerciseErr = "Please choose an exercise"
        }
        if (exerciseErr) {
            this.setState({
                exerciseErr,
            });
            return false;
        } else {
            return true;
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const isValid = this.valid();
        if (isValid) {

            const added = {
                exercises: this.state.exercises
            }
            console.log(added);

            axios.put("api/plans/add/" + this.props.planID, added)
                .then(res => {
                    console.log(res.data);
                })
            this.setState({
                exercises: [],
                isOpen: false
            })
        }
    }

    render() {
        return (
            <>
                <Button onClick={this.showModal}>
                    Add
                </Button>

                <Modal size="lg" show={this.state.isOpen} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add an exercise to the plan.</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Label>Exercise</Form.Label>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.exercises}
                                    name="exercises"
                                    id="exercises"
                                    as="select"
                                >
                                    <option>Select an Exercise</option>
                                    {this.state.choices.map(data =>
                                        <option>{data.exerciseName}</option>
                                    )}

                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

AddPlanExercises.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(AddPlanExercises);

// export default AddPlanExercises;