'use client'; 

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FacultyDashboard: React.FC = () => {
  const [assignments, setAssignments] = useState<any[]>([]);  

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/submissions/allassignments');
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  const handleAcceptAssignment = async (assignmentId: string, studentId: string) => {
    try {
    
      const assignment = assignments.find((assignment) => assignment._id === assignmentId);

      if (assignment?.submittedFile) {
        const response = await axios.post('http://localhost:5000/submissions/accept-assignment', {
          assignmentId,
          studentId,
        });
 
        alert('Assignment accepted!');
        
        setAssignments(assignments.map((assignment) =>
          assignment._id === assignmentId ? { ...assignment, status: 'submitted' } : assignment
        ));
      } else {
        alert('Assignment has not been submitted yet.');
      }
    } catch (error) {
      console.error('Error accepting assignment:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Faculty Dashboard</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Student Name</th>
            <th className="px-4 py-2 border-b text-left">Assignment</th>
            <th className="px-4 py-2 border-b text-left">View</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
            
              <td className="px-4 py-2 border-b">{assignment.studentId.first_name} {assignment.studentId.last_name}</td>

              <td className="px-4 py-2 border-b">{assignment.assignmentId.subject}</td>

              
              <td className="px-4 py-2 border-b">
                {assignment.submittedFile ? (
                  <a href={assignment.submittedFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Assignment
                  </a>
                ) : (
                  'No file submitted'
                )}
              </td>

           
              <td className="px-4 py-2 border-b">{assignment.status}</td>

             
              <td className="px-4 py-2 border-b">
                {assignment.status !== 'submitted' && (
                  <button
                    onClick={() => handleAcceptAssignment(assignment._id, assignment.studentId._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Accept
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyDashboard;
