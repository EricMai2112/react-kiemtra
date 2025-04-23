import React from 'react'
import { useState } from "react"

export default function SinhVien() {
    const [students, setStudents] = useState([
        { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
        { id: 2, name: "Trần Thị B", class: "12A2", age: 17 },
        { id: 3, name: "Lê Văn C", class: "11B1", age: 16 },
      ]);

      const handleDelete = (id) => {
        setStudents(students.filter((s) => s.id !== id));
      };

      return (
        <div className="bg-white rounded shadow-md p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center">Danh sách sinh viên</h1>
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
