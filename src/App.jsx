import { Button, Container, Form } from "react-bootstrap";
import "./App.css";
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    priority: "low",
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container fluid="md">
      <Form onSubmit={handleSubmit} className="">
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            placeholder="Entrez votre nom"
            onChange={handleChange}
            value={formData.name}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            required
            type="date"
            name="date"
            onChange={handleChange}
            value={formData.date}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Priorité</Form.Label>
          <Form.Select
            name="priority"
            onChange={handleChange}
            value={formData.priority}
            className="mb-3"
          >
            <option value="low">Basse</option>
            <option value="mid">Moyenne</option>
            <option value="high">Haute</option>
          </Form.Select>
        </Form.Group>
        <Form.Check
          label="Est complet ?"
          name="isCompleted"
          onChange={handleChange}
          checked={formData.isCompleted}
          className="mb-3"
        />
        <Button type="submit">Valider</Button>
      </Form>
    </Container>
  );
}

export default App;
