import { Button, Card, Container, Form } from "react-bootstrap";
import "./App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function App() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(8, "Le nom doit contenir au moins 8 caractères.")
      .max(15, "Le nom ne doit pas dépasser 15 caractères.")
      .matches(
        /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
        "Le nom ne doit contenir que des lettres."
      )
      .required("Le nom est requis."),
    date: yup
      .string()
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0,1,2])\/(20)\d{2}$/,
        "Le format doit être JJ/MM/AAAA."
      )
      .test("isValid", "La date n'est pas valide.", (value) => {
        const [jour, mois, annee] = value.split("/").map(Number);
        const dateInput = new Date(annee, mois - 1, jour);
        if (
          dateInput.getDate() !== jour ||
          dateInput.getMonth() + 1 !== mois ||
          dateInput.getFullYear() !== annee
        ) {
          return false;
        }
        const aujourdhui = new Date();
        aujourdhui.setDate(0, 0, 0, 0);
        return dateInput >= aujourdhui;
      })
      .required("La date est requise."),
    priority: yup
      .string()
      .oneOf(
        ["Basse", "Moyenne", "Haute"],
        "La priorité doit être Basse, Moyenne ou Haute."
      ),
    isCompleted: yup.boolean(),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
          <p className="text-danger">{errors.name?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="jj/mm/AAAA"
            {...register("date", { required: "La date est requise." })}
          />{" "}
          <p className="text-danger">{errors.date?.message}</p>
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
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title>Résumé des informations</Card.Title>
          <Card.Text>Nom : {watch("name") || "Pas encore entré"}</Card.Text>
          <Card.Text>Date : {watch("date") || "Pas encore entré"}</Card.Text>
          <Card.Text>Priorité : {watch("priority")}</Card.Text>
          <Card.Text>
            Tâche complété : {watch("isCompleted") ? "Oui" : "Non"}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
