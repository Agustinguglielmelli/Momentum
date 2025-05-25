
import ColorSelector  from "./progressbars/ColorSelector";
import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Container, Modal, Button, Form } from 'react-bootstrap';
import KmProgressSection from './progressbars/kmrunnedbar/KmRunnedBar';
import CaloriesProgressSection from './progressbars/caloriesburnedbar/CaloriesBurnedBar';
import EventsProgressSection from './progressbars/eventscompletedbar/EventsCompletedBar';
import FriendsProgressSection from './progressbars/friendsmadedbar/FriendsMadedBar';
import GoalsProgressSection from './progressbars/goalscompletedbar/GoalsCompletedBar';

const ProgressBarManager = ({ userId }) => {
    const [progressBars, setProgressBars] = useState([]);
    const [nextId, setNextId] = useState(1);
    const [editingBar, setEditingBar] = useState(null);
    const [editForm, setEditForm] = useState({
        label: '',
        target: 0,
        color: '#007bff',
        unit: ''
    });

    const progressBarTemplates = [
        {
            name: "Kilometers",
            defaults: {
                label: "Kilometers Runned",
                initialTarget: 50,
                unit: "km",
                color: '#28a745' // Verde
            }
        },
        {
            name: "Calories",
            defaults: {
                label: "Calories Burned",
                initialTarget: 10000,
                unit: "kcal",
                color: '#dc3545' // Rojo
            }
        },
        {
            name: "Events",
            defaults: {
                label: "Events Completed",
                initialTarget: 10000,
                unit: "",
                color: '#35df26'
            }
        },
        {
            name: "Friends",
            defaults: {
                label: "Friends Made",
                initialTarget: 100,
                unit: "",
                color: '#ff00c3'
            }
        },
        {
            name: "Goals",
            defaults: {
                label: "Goals Completed",
                initialTarget: 10,
                unit: "",
                color: '#00ffb4'
            }
        }
    ];

    const addProgressBar = (templateIndex) => {
        const newId = nextId;
        setNextId(nextId + 1);

        const template = progressBarTemplates[templateIndex];

        setProgressBars([...progressBars, {
            id: newId,
            ...template.defaults,
            currentValue: 0,
            templateType: templateIndex
        }]);
    };

    const removeProgressBar = (id) => {
        setProgressBars(progressBars.filter(bar => bar.id !== id));
    };

    const openEditModal = (bar) => {
        setEditingBar(bar);
        setEditForm({
            target: bar.initialTarget,  // Guarda el target actual
            color: bar.color,           // Guarda el color actual
        });
    };

    const handleSaveEdit = () => {
        setProgressBars(progressBars.map(bar =>
            bar.id === editingBar.id ? {
                ...bar,
                initialTarget: Number(editForm.target),  // Actualiza el target
                color: editForm.color,                   // Actualiza el color
            } : bar
        ));
        setEditingBar(null);  // Cierra el modal
    };

    const getProgressBarComponent = (bar) => {
        switch(bar.templateType) {
            case 0: // Kilometers
                return (
                    <KmProgressSection
                        key={bar.id}
                        userId={userId}
                        label={bar.label}
                        initialTarget={bar.initialTarget}
                        unit={bar.unit}
                        color={bar.color}
                        onRemove={() => removeProgressBar(bar.id)}
                        onEdit={() => openEditModal(bar)}
                    />
                );
            case 1: // Calories
                return (
                    <CaloriesProgressSection
                        key={bar.id}
                        userId={userId}
                        label={bar.label}
                        initialTarget={bar.initialTarget}
                        unit={bar.unit}
                        color={bar.color}
                        onRemove={() => removeProgressBar(bar.id)}
                        onEdit={() => openEditModal(bar)}
                    />
                );
            case 2:
                return (
                    <EventsProgressSection
                        key={bar.id}
                        userId={userId}
                        label={bar.label}
                        initialTarget={bar.initialTarget}
                        unit={bar.unit}
                        color={bar.color}
                        onRemove={() => removeProgressBar(bar.id)}
                        onEdit={() => openEditModal(bar)}
                    />
                );
            case 3:
                return (
                    <FriendsProgressSection
                        key={bar.id}
                        userId={userId}
                        label={bar.label}
                        initialTarget={bar.initialTarget}
                        unit={bar.unit}
                        color={bar.color}
                        onRemove={() => removeProgressBar(bar.id)}
                        onEdit={() => openEditModal(bar)}
                    />

                );
            case 4:
                return (
                    <GoalsProgressSection
                        key={bar.id}
                        userId={userId}
                        label={bar.label}
                        initialTarget={bar.initialTarget}
                        unit={bar.unit}
                        color={bar.color}
                        onRemove={() => removeProgressBar(bar.id)}
                        onEdit={() => openEditModal(bar)}
                    />

                );
        }
    };

    return (
        <div>
            <Navbar bg="light" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand>Progress Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Add Progress Bar
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {progressBarTemplates.map((template, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={() => addProgressBar(index)}
                                        >
                                            {template.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                {progressBars.map(bar => getProgressBarComponent(bar))}
            </Container>

            {/* Modal de Edición */}
            <Modal show={!!editingBar} onHide={() => setEditingBar(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Progress Bar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Target Goal</Form.Label>
                            <Form.Control
                                type="number"
                                value={editForm.target}
                                onChange={(e) => setEditForm({...editForm, target: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Color</Form.Label>
                            <div style={{ height: '40px'}}>
                            <ColorSelector
                                color={editForm.color}
                                onChange={(newColor) => setEditForm({...editForm, color: newColor})}
                            />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEditingBar(null)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProgressBarManager;