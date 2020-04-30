import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const { data: repository } = await api.post("repositories", {
      title: "Desafio ReactJS",
      url: "https://github.com/thejoaov/gostack-11-conceitos-reactjs",
      techs: ["react.js", "Node.JS"],
    });

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex(
        (repository) => repository.id === id
      );

      repositories.splice(repositoryIndex, 1);

      setRepositories([...repositories]);
    } else {
      alert("Não foi possível deletar o item, tente novamente!");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item) => (
          <li key={item.id}>
            {item.title}

            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
