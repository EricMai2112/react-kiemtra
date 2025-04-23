import React, { useState } from "react";

export default function SinhVien() {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
    { id: 2, name: "Trần Thị B", class: "12A2", age: 17 },
    { id: 3, name: "Lê Văn C", class: "11B1", age: 16 },
  ]);

  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [age, setAge] = useState("");

  const handleAddStudent = () => {
    if (name.trim() === "" || studentClass.trim() === "" || age.trim() === "") {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      class: studentClass,
      age: parseInt(age),
    };

    setStudents([...students, newStudent]);
    setName("");
    setStudentClass("");
    setAge("");
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="bg-white rounded shadow-md p-6 max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Danh sách sinh viên</h1>

      {/* Form thêm sinh viên */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Họ tên"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lớp"
          className="border p-2 rounded"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tuổi"
          className="border p-2 rounded"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button
          onClick={handleAddStudent}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          Thêm sinh viên
        </button>
      </div>

      {/* Bảng danh sách */}
      {students.length > 0 ? (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Lớp</th>
              <th className="p-2 border">Tuổi</th>
              <th className="p-2 border text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="text-center">
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">{student.class}</td>
                <td className="p-2 border">{student.age}</td>
                <td className="p-2 border text-right">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 py-6">Không có sinh viên nào.</p>
      )}
    </div>
  );
}
