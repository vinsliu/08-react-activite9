import { Button, Container, Form } from "react-bootstrap";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container fluid="md">
      <Form onSubmit={handleSubmit(onSubmit)} className="">
        <Form.Group className="my-3" controlId="formName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre nom"
            {...register("name", { required: "Le nom est requis." })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            {...register("date", { required: "La date est requise." })}
          />
          {errors.date && <p className="text-danger">{errors.date.message}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPriority">
          <Form.Label>Priorité</Form.Label>
          <Form.Select {...register("priority")}>
            <option value="low">Basse</option>
            <option value="mid">Moyenne</option>
            <option value="high">Haute</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formIsCompleted">
          <Form.Check label="Tâche terminée ?" {...register("isCompleted")} />
        </Form.Group>
        <Button type="submit">Valider</Button>
      </Form>
    </Container>
  );
}

export default App;
