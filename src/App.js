import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SampleCard from "./components/SampleCard";
import Button from "@mui/material/Button";
import { CreateNews } from "./components/CreateNews";
import { Route, Routes } from "react-router-dom"; // Import Routes and Route

function App() {
  const [news, setNews] = useState([]);
  const [addNews, setAddNews] = useState(false);

  const handleClick = () => {
    setAddNews(true);
  };

  const handleClose = () => {
    setAddNews(false); // Close the dialog
  };

  const getNews = async () => {
    try {
      console.log(process.env.REACT_APP_API_BASE_URL); // Should log 'http://localhost:8080'

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/news`
      );

      console.log("Response: ", response.data);

      setNews(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="App">
      <div className="app-header">
        <div></div>
        <h1>Newsletter List</h1>
        <Button variant="contained" className="btn-add" onClick={handleClick}>
          Add
        </Button>
      </div>

      {/* Define Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="newsletter-list">
              {news.length > 0 ? (
                news.map((data, index) => (
                  <SampleCard
                    key={index}
                    id={data.id} // Ensure ID is available in the API response
                    title={data.title}
                    content={data.content}
                    comments={data.comments}
                    refreshNews={getNews}
                  />
                ))
              ) : (
                <p>No newsletters found.</p>
              )}
            </div>
          }
        />
        {/* You can add more routes here */}
      </Routes>

      {/* Add/Create News Dialog */}
      <CreateNews open={addNews} onClose={handleClose} refreshNews={getNews} />
    </div>
  );
}

export default App;
