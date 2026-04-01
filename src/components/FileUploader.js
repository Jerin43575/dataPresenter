import React, { useState } from "react";

const FileUploader = ({ onDataLoaded }) => {
  const [uploading, setUploading] = useState(false);
  const [filename, setFilename] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFilename(file.name);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/data_analysis/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      onDataLoaded(data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed! Check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: "30px", textAlign: "center" }}>
      <label
        style={{
          display: "inline-block",
          backgroundColor: "#38bdf8",
          color: "#000",
          padding: "12px 25px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0ea5e9")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#38bdf8")}
      >
        {uploading ? "Uploading..." : "Upload CSV File"}
        <input
          type="file"
          accept=".csv"
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </label>
      {filename && (
        <p style={{ marginTop: "10px", color: "#94a3b8" }}>Selected file: {filename}</p>
      )}
    </div>
  );
};

export default FileUploader;