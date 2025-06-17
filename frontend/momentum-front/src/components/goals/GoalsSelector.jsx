
import ColorSelector from "./progressbars/ColorSelector";
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Container, Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import CustomizableProgressBar from './progressbars/CustomizableProgressBar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const ProgressBarManager = ({ userId }) => {
    const [progressBars, setProgressBars] = useState([]);
    const [editingBar, setEditingBar] = useState(null);
    const [editForm, setEditForm] = useState({
        target: 0,
        color: '#007bff'
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const progressBarTemplates = [
        {
            name: "Kilometers",
            type: "RUNNING",
            defaults: {
                label: "Kilometers Runned",
                unit: "km",
                color: '#21df64'
            }
        },/*
        {
            name: "Calories",
            type: "CALORIES",
            defaults: {
                label: "Calories Burned",
                unit: "kcal",
                color: '#aa0f23'
            }
        },
        {
            name: "Events",
            type: "EVENTS",
            defaults: {
                label: "Events Completed",
                unit: "",
                color: '#35df26'
            }
        },
        {
            name: "Friends",
            type: "FRIENDS",
            defaults: {
                label: "Friends Made",
                unit: "",
                color: '#ff00c3'
            }
        },
        {
            name: "Goals",
            type: "GOALS",
            defaults: {
                label: "Goals Completed",
                unit: "",
                color: '#00ffb4'
            }
        }*/
    ];


    const fetchGoals = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8080/myGoals`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            setProgressBars(response.data.map(goal => ({
                id: goal.id,
                label: goal.label,
                unit: goal.unit,
                initialTarget: goal.target,
                currentValue: goal.progress,
                color: goal.color,
                type: goal.type,
                templateType: progressBarTemplates.findIndex(t => t.type === goal.type)
            })));
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            console.error("Error loading goals:", err);
        } finally {
            setIsLoading(false);
        }
    };


    const saveGoal = async (goalData) => {
        try {
            const method = goalData.id ? 'put' : 'post';
            const url = goalData.id ?
                `http://localhost:8080/goals/${goalData.id}` :
                'http://localhost:8080/goals';

            const template = progressBarTemplates[goalData.templateType];

            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const userId = decoded.userId;
            const data = {
                userId: userId,
                type: template.type,
                label: template.defaults.label,
                unit: template.defaults.unit,
                target: goalData.initialTarget,
                progress: goalData.currentValue || 0,
                color: goalData.color
            };

            const response = await axios[method](url, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            return response.data;
        } catch (err) {
            console.error("Error saving goal:", err);
            throw err;
        }
    };


    const deleteGoal = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/goals/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
        } catch (err) {
            console.error("Error deleting goal:", err);
            throw err;
        }
    };


    useEffect(() => {
        fetchGoals();
    }, [userId]);

    const addProgressBar = async (templateIndex) => {
        try {
            const template = progressBarTemplates[templateIndex];
            const newGoal = {
                templateType: templateIndex,
                ...template.defaults,
                initialTarget: template.defaults.initialTarget || 100,
                currentValue: 0,
                color: template.defaults.color
            };

            await saveGoal(newGoal);
            await fetchGoals();

        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const removeProgressBar = async (id) => {
        try {
            await deleteGoal(id);
            await fetchGoals()
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const openEditModal = (bar) => {
        setEditingBar(bar);
        setEditForm({
            target: bar.initialTarget,
            color: bar.color,
        });
    };

    const handleSaveEdit = async () => {
        try {
            const updatedBar = {
                ...editingBar,
                initialTarget: Number(editForm.target),
                color: editForm.color
            };

            await saveGoal(updatedBar);
            await fetchGoals()

            setEditingBar(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const getProgressBarComponent = (bar) => {

        const getFetchFunction = (type) => {
            switch(type) {
                case "RUNNING":
                    return async () => {
                        const res = await axios.get(
                            `http://localhost:8080/users/${userId}/progress/goals/kmran`,
                            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                        );
                        return { data: res.data };
                    };
                // agregar casos para cada tipo de barra
                default:
                    return async () => ({ data: bar.currentValue });
            }
        };

        return (
            <CustomizableProgressBar
                key={bar.id}
                userId={userId}
                label={bar.label}
                initialTarget={bar.initialTarget}
                unit={bar.unit}
                customColor={bar.color}
                onRemove={() => removeProgressBar(bar.id)}
                onEdit={() => openEditModal(bar)}
                hideControls={true}
                fetchData={getFetchFunction(bar.type)}  // Use dynamic fetch function
            />
        );
    };

    if (isLoading) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger" className="m-3">Error: {error}</Alert>;
    }

    return (
        <div>
            <Navbar
                bg="light"
                expand="lg"
                style={{ minHeight: '36px', padding: '0 0', marginBottom: '0.25rem', borderBottom: '1px solid #eee' }}
            >
                <Container style={{ padding: '0 8px', minHeight: '32px' }}>
                    <Navbar.Brand style={{ fontSize: '1rem', margin: '0', padding: '0 4px' }}>
                        Progress Manager
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ padding: '2px 6px', fontSize: '0.9rem' }} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
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
                {progressBars.length > 0 ? (
                    progressBars.map(bar => getProgressBarComponent(bar))
                ) : (
                    <div className="text-center my-4">
                        <p>No goals yet. Add one to get started!</p>
                    </div>
                )}
            </Container>

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
                                min="1"
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