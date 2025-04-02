import { Button, Container, Form } from "react-bootstrap";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
      priority: "Basse",
      isCompleted: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const nameValue = watch("name");
  const dateValue = watch("date");
  const priorityValue = watch("priority");
  const isCompletedValue = watch("isCompleted");

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
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formIsCompleted">
          <Form.Check label="Tâche terminée ?" {...register("isCompleted")} />
        </Form.Group>
        <Button type="submit">Valider</Button>
      </Form>
      <p>Nom : {nameValue || "Pas encore entré"} </p>
      <p>Date : {dateValue || "Pas encore entré"} </p>
      <p>Priorité : {priorityValue} </p>
      <p>Tâche complété : {isCompletedValue ? "Oui" : "Non"} </p>
    </Container>
  );
}

export default App;
