import { useEffect, useState } from "react";
import axios from "axios";

const AdminStudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/courses/students", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the admin token
          },
        });

        setStudents(response.data); // Set students data in state
      } catch (error) {
        setError("Error fetching student data.");
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-primary text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Student List</h2>
      <div className="overflow-x-auto border rounded-md">
        <table className="table-auto w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-black">
              <th className="px-6 py-3 text-sm font-medium uppercase text-left">Name</th>
              <th className="px-6 py-3 text-sm font-medium uppercase text-left">Email</th>
              <th className="px-6 py-3 text-sm font-medium uppercase text-left">Course</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student._id}
                className='border-t hover:bg-gray-100 cursor-pointer'
              >
                <td className="px-6 py-4 text-sm text-gray-700">{student.username}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudentList;
