import React, { useState } from "react";

export default function SinhVien() {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
    { id: 2, name: "Trần Thị B", class: "12A2", age: 17 },
    { id: 3, name: "Lê Văn C", class: "11B1", age: 16 },
  ]);

  const [newStudent, setNewStudent] = useState({ name: "", class: "", age: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState({ name: "", class: "", age: "" });

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

  return (
    <div className="bg-white rounded shadow-md p-6 max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Danh sách sinh viên</h1>

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
                {editingId === student.id ? (
                  <>
                    <td className="p-2 border">
                      <input
                        className="border p-1 rounded w-full"
                        value={editingStudent.name}
                        onChange={(e) =>
                          setEditingStudent({ ...editingStudent, name: e.target.value })
                        }
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        className="border p-1 rounded w-full"
                        value={editingStudent.class}
                        onChange={(e) =>
                          setEditingStudent({ ...editingStudent, class: e.target.value })
                        }
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        className="border p-1 rounded w-full"
                        value={editingStudent.age}
                        onChange={(e) =>
                          setEditingStudent({ ...editingStudent, age: e.target.value })
                        }
                      />
                    </td>
                    <td className="p-2 border text-right">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                        onClick={() => handleSave(student.id)}
                      >
                        Lưu
                      </button>
                      <button
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        onClick={() => setEditingId(null)}
                      >
                        Huỷ
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2 border">{student.name}</td>
                    <td className="p-2 border">{student.class}</td>
                    <td className="p-2 border">{student.age}</td>
                    <td className="p-2 border text-right">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Xoá
                      </button>
                    </td>
                  </>
                )}
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
