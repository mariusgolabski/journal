import { useState } from "react";
import { uid } from "uid";

import EntriesSection from "./components/EntriesSection";
import EntryForm from "./components/EntryForm";
import Footer from "./components/Footer";
import Header from "./components/Header";

import "./App.css";

const initialEntries = [
  {
    id: 1000,
    date: "Feb 5, 2025",
    motto: "We are in a state of chaos",
    notes:
      "Today I learned about React State. It was fun! I can't wait to learn more.",
    isFavorite: false,
  },
  {
    id: 999,
    date: "Feb 4, 2025",
    motto: "Props, Props, Props",
    notes:
      "Today I learned about React Props. Mad props to everyone who understands this!",
    isFavorite: false,
  },
  {
    id: 998,
    date: "Feb 3, 2025",
    motto: "How to nest components online fast",
    notes:
      "Today I learned about React Components and how to nest them like a pro. Application design is so much fun!",
    isFavorite: false,
  },
  {
    id: 997,
    date: "Feb 2, 2025",
    motto: "I'm a React Developer",
    notes: "My React-ion when I learned about React: 😍",
    isFavorite: false,
  },
];

export default function App() {
  const [entries, setEntries] = useState(initialEntries);
  const [filter, setFilter] = useState("all");
  const favoriteEntries = entries.filter((entry) => entry.isFavorite);

  function handleShowFavoriteEntries() {
    setFilter("favorites");
  }

  function handleShowAllEntries() {
    setFilter("all");
  }

  function handleAddEntry(newEntry) {
    const date = new Date().toLocaleDateString("en-us", {
      dateStyle: "medium",
    });

    newEntry = {
      id: uid(),
      date: date,
      motto: newEntry.motto,
      notes: newEntry.notes,
      isFavorite: false,
    };

    setEntries([newEntry, ...entries]);
  }

  function handleToggleFavorite(id) {
    const updatedEntries = entries.map((entry) => {
      if (entry.id === id) {
        // Toggle the isFavorite property
        return { ...entry, isFavorite: !entry.isFavorite };
      }
      return entry; // Return unchanged entries
    });

    // Update the state with the new array
    setEntries(updatedEntries);
  }

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <EntryForm onAddEntry={handleAddEntry} />
        <EntriesSection
          allEntriesCount={entries.length}
          favoriteEntriesCount={favoriteEntries.length}
          entries={filter === "favorites" ? favoriteEntries : entries}
          filter={filter}
          onToggleFavorite={handleToggleFavorite}
          onShowAllEntries={handleShowAllEntries}
          onShowFavoriteEntries={handleShowFavoriteEntries}
        />
      </main>
      <Footer />
    </div>
  );
}
