
import ColorSelector from "./progressbars/ColorSelector";
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Container, Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import CustomizableProgressBar from './progressbars/CustomizableProgressBar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const ProgressBarManager = ({ userId }) => {
    const [progressBars, setProgressBars] = useState({
        IN_PROGRESS: [],
        COMPLETED: []
    });
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
                label: "Running distance",
                unit: "km",
                color: '#21df64'
            }
        }
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

            // CAMBIAR ESTA PARTE:
            const groupedData = response.data;

            const mapGoalToProgressBar = (goal) => ({
                id: goal.id,
                label: goal.label,
                unit: goal.unit,
                initialTarget: goal.target,
                currentValue: goal.progress,
                color: goal.color,
                type: goal.type,
                isCompleted: goal.progress >= goal.target,
                templateType: progressBarTemplates.findIndex(t => t.type === goal.type)
            });

            setProgressBars({
                IN_PROGRESS: (groupedData.IN_PROGRESS || []).map(mapGoalToProgressBar),
                COMPLETED: (groupedData.COMPLETED || []).map(mapGoalToProgressBar)
            });

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
        const getFetchFunction = (type, goalId) => {
            switch(type) {
                case "RUNNING":
                    return async () => {
                        const res = await axios.get(
                            `http://localhost:8080/users/${userId}/progress/goals/kmranWithDate?goalId=${goalId}`,
                            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                        );
                        return { data: res.data };
                    };
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
                customColor={bar.isCompleted ? '#28a745' : bar.color}
                onRemove={() => removeProgressBar(bar.id)}
                onEdit={bar.isCompleted ? null : () => openEditModal(bar)}
                hideControls={true}
                fetchData={getFetchFunction(bar.type, bar.id)}
                isCompleted={bar.isCompleted}  // AGREGAR ESTA LÍNEA
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
                <Container>
                    <div style={{
                        display: 'flex',
                        gap: '40px',
                        minHeight: '400px',
                        justifyContent: 'center',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {/*En progreso */}
                        <div style={{
                            flex: '0 1 45%',
                            borderRight: '2px solid #007bff',
                            paddingRight: '20px',
                            textAlign: 'center'      
                        }}>
                            <h4 className="text-center mb-3" style={{ color: '#007bff' }}>
                                🎯 In Progress ({progressBars.IN_PROGRESS.length})
                            </h4>
                            {progressBars.IN_PROGRESS.length > 0 ? (
                                progressBars.IN_PROGRESS.map(bar => getProgressBarComponent(bar))
                            ) : (
                                <div className="text-center my-4">
                                    <p className="text-muted">No goals in progress</p>
                                    <small>Add a new goal to get started!</small>
                                </div>
                            )}
                        </div>

                        {/*Completados */}
                        <div style={{
                            flex: '0 1 45%',
                            paddingLeft: '20px',
                            textAlign: 'center'
                        }}>
                            <h4 className="text-center mb-3" style={{ color: '#28a745' }}>
                                ✅ Completed ({progressBars.COMPLETED.length})
                            </h4>
                            {progressBars.COMPLETED.length > 0 ? (
                                progressBars.COMPLETED.map(bar => getProgressBarComponent(bar))
                            ) : (
                                <div className="text-center my-4">
                                    <p className="text-muted">No completed goals yet</p>
                                    <small>Keep working towards your objectives!</small>
                                </div>
                            )}
                        </div>
                    </div>
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