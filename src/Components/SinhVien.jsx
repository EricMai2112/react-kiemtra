import React, { useEffect, useState } from "react";
import StudentItem from "./StudentItem";


export default function SinhVien() {
    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem("students");
        return saved
          ? JSON.parse(saved)
          : [
              { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
              { id: 2, name: "Trần Thị B", class: "12A2", age: 17 },
              { id: 3, name: "Lê Văn C", class: "11B1", age: 16 },
            ];
      });
      useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
      }, [students]);
            

  const [newStudent, setNewStudent] = useState({ name: "", class: "", age: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState({ name: "", class: "", age: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddStudent = () => {
    const { name, class: studentClass, age } = newStudent;
    if (!name || !studentClass || !age) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setStudents([
      ...students,
      { id: Date.now(), name, class: studentClass, age: parseInt(age) },
    ]);
    setNewStudent({ name: "", class: "", age: "" });
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditingStudent({ name: student.name, class: student.class, age: student.age });
  };

  const handleSave = (id) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, ...editingStudent, age: parseInt(editingStudent.age) } : s
      )
    );
    setEditingId(null);
    setEditingStudent({ name: "", class: "", age: "" });
  };

  // thêm state chọn lớp
const [selectedClass, setSelectedClass] = useState("all");

// danh sách lớp duy nhất
const uniqueClasses = Array.from(new Set(students.map((s) => s.class)));

// lọc sinh viên theo tên và lớp
const filteredStudents = students.filter((student) => {
  const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesClass = selectedClass === "all" || student.class === selectedClass;
  return matchesName && matchesClass;
});


  return (
    <div className="bg-white rounded shadow-md p-6 max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Danh sách sinh viên</h1>

      {/* Tìm kiếm */}
      {/* Tìm kiếm & Lọc lớp */}
<div className="flex flex-col md:flex-row gap-4 mb-4">
  <input
    type="text"
    placeholder="Tìm theo tên..."
    className="border p-2 rounded w-full md:w-1/2"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    className="border p-2 rounded w-full md:w-1/2"
    value={selectedClass}
    onChange={(e) => setSelectedClass(e.target.value)}
  >
    <option value="all">Tất cả lớp</option>
    {uniqueClasses.map((cls) => (
      <option key={cls} value={cls}>{cls}</option>
    ))}
  </select>
</div>


      {/* Form thêm sinh viên */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Họ tên"
          className="border p-2 rounded"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lớp"
          className="border p-2 rounded"
          value={newStudent.class}
          onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
        />
        <input
          type="number"
          placeholder="Tuổi"
          className="border p-2 rounded"
          value={newStudent.age}
          onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
        />
        <button
          onClick={handleAddStudent}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          Thêm sinh viên
        </button>
      </div>

      {/* Bảng sinh viên */}
      {filteredStudents.length > 0 ? (
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
          {filteredStudents.map((student) => (
    <StudentItem
      key={student.id}
      student={student}
      isEditing={editingId === student.id}
      editingStudent={editingStudent}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onChangeEditingStudent={setEditingStudent}
      onSave={handleSave}
      onCancel={() => setEditingId(null)}
    />
  ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 py-6">Không tìm thấy sinh viên phù hợp.</p>
      )}
    </div>
  );
}
