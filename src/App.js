import React, { useState, useEffect } from "react";

const Recommendations = () => {
  const [userId, setUserId] = useState(""); // User ID from input
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async (userId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://video-recommendation-backend-1.onrender.com/recommendations?user_index=${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setRecommendations(data.content_based_recommendations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = () => {
    if (!userId.trim()) {
      setError("Please enter a valid user ID");
      return;
    }

    fetchRecommendations(userId.trim());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Content-Based Recommendations
      </h1>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your User ID"
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <button
          onClick={handleFetch}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#007BFF",
            color: "white",
            cursor: "pointer",
          }}
        >
          Fetch Recommendations
        </button>
      </div>
      {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>}
      {loading && <div>Loading recommendations...</div>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // Two containers per row
          gap: "20px", // Spacing between containers
          justifyContent: "center",
        }}
      >
        {recommendations.map((item) => (
          <div
            key={item.post_id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {item.video_link ? (
              <video
                controls
                style={{
                  width: "100%",
                  maxHeight: "500px", // Ensures the video fits the card
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              >
                <source src={item.video_link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Video not available</p>
            )}
            <h2 style={{ textAlign: "center" }}>{item.category}</h2>
            <p style={{ textAlign: "center" }}>
              <strong>Description:</strong>{" "}
              {item.description || "Description not available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
