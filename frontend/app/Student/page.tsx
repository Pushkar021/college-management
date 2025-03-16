"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/submissions/assignments");
      setAssignments(res.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitAssignment = async () => {
    if (!file || !selectedAssignment) {
      alert("Please select an assignment and a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignmentId", selectedAssignment);

    try {
      const res = await axios.post("http://localhost:5000/submissions/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("Submitted successfully!");
      fetchAssignments(); // Re-fetch assignments to update the status
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setStatus("Submission failed. Try again.");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>

      {assignments.length === 0 ? (
        <p className="text-black-600">No assignments available.</p>
      ) : (
        <div className="w-full max-w-2xl space-y-3 mb-6">
          <h3 className="font-medium">Choose an assignment to submit:</h3>
          <select
            value={selectedAssignment || ""}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="w-full p-2 border rounded-md text-black"
          >
            <option value="">Select Assignment</option>
            {assignments.map((assignment) => (
              <option key={assignment._id} value={assignment.assignmentId._id}>
                {assignment.assignmentId.filename} - {assignment.assignmentId.subject}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedAssignment && (
        <div className="w-full max-w-2xl space-y-4 mb-6">
          <h3 className="font-medium">Upload Your Assignment</h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="p-2 border rounded-md w-full"
          />
          <button
            onClick={handleSubmitAssignment}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
          >
            Submit Assignment
          </button>
        </div>
      )}

      {status && <p className="mt-4 text-lg">{status}</p>}

      <h3 className="font-medium mt-6">Submission Status</h3>
      <div className="w-full max-w-2xl space-y-3">
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            className="flex justify-between items-center p-3 border rounded-md shadow-md"
          >
            <span className="font-medium">{assignment.assignmentId.filename}</span>
            <span className="font-medium ml-3">{assignment.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
