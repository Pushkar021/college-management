"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Assignment() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<any[]>([]);
  const [totalFiles, setTotalFiles] = useState<any[]>([]);
  const [subject, setSubject] = useState<string | null>(null);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject", subject || "");

    try {
      const res = await axios.post("http://localhost:5000/assignments/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadUrl(res.data.url);
      toast.success("PDF uploaded successfully on the server!");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Upload failed!");
    }
  };

 useEffect(() => {
    const fetchAssignments = async () => {
        try {
            const response = await axios.get("http://localhost:5000/assignments/");
            console.log("Response Data:", response.data);
            setTotalFiles(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching assignments:", error);
            setLoading(false);
        }
    };

    fetchAssignments();
}, []);
  return (
    <div className="p-6 flex-row justify-center">
      <Toaster />
      <h2 className="text-xl font-bold mb-4">Upload PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="border p-2"
      />
      <p>Enter Subject name: </p>
      <input
        type="text"
        className="text-black"
        onChange={(e) => setSubject(e.target.value)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
      >
        Upload PDF
      </button>

      <div className="p-6 max-w-lg mx-auto shadow-lg rounded-lg mt-6">
        <h2 className="text-2xl font-bold mb-4">Uploaded Files</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="mb-2">Total Files: <strong>{totalFiles.length}</strong></p>
            <ul className="space-y-3">
              {totalFiles.length > 0 ? (
                totalFiles.map((file) => (
                  <li key={file._id} className="flex justify-between items-center p-2 border rounded-md">
                    <span className="font-medium">{file.filename}</span>
                    <span className="font-medium ml-3">{file.subject}</span>
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        View
                      </button>
                    </a>
                  </li>
                ))
              ) : (
                <p>No files found.</p>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}