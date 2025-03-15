"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Assignment() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const [totalfiles, setTotalFiles] = useState([]);

  const router = useRouter();


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Upload file to the server
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/file/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadUrl(res.data.url);
      toast.success("PDF uploaded successfully on the server!");
      
      // Fetch updated file list
      fetchFiles();
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed!");
    }
  };

  // Fetch uploaded files
  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/file/files");
      setTotalFiles(res.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // Fetch files
  useEffect(() => {
    fetchFiles(); 
    setLoading(false);
  }, [router]);

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
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
      >
        Upload PDF
      </button>

      <div className="p-6 max-w-lg mx-auto shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Uploaded Files</h2>
        <p className="mb-2">Total Files: <strong>{totalfiles.length}</strong></p>
        <ul className="space-y-3">
          {totalfiles.map((file) => (
            <li key={file._id} className="flex justify-between items-center p-2 border rounded-md">
              <span className="font-medium">{file.filename}</span>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  View
                </button>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
