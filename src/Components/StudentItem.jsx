// components/StudentItem.jsx
import React from "react";

export default function StudentItem({
  student,
  isEditing,
  editingStudent,
  onEdit,
  onDelete,
  onChangeEditingStudent,
  onSave,
  onCancel,
}) {
  return (
    <tr className="text-center">
      {isEditing ? (
        <>
          <td className="p-2 border">
            <input
              className="border p-1 rounded w-full"
              value={editingStudent.name}
              onChange={(e) =>
                onChangeEditingStudent({ ...editingStudent, name: e.target.value })
              }
            />
          </td>
          <td className="p-2 border">
            <input
              className="border p-1 rounded w-full"
              value={editingStudent.class}
              onChange={(e) =>
                onChangeEditingStudent({ ...editingStudent, class: e.target.value })
              }
            />
          </td>
          <td className="p-2 border">
            <input
              type="number"
              className="border p-1 rounded w-full"
              value={editingStudent.age}
              onChange={(e) =>
                onChangeEditingStudent({ ...editingStudent, age: e.target.value })
              }
            />
          </td>
          <td className="p-2 border text-right">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
              onClick={() => onSave(student.id)}
            >
              Lưu
            </button>
            <button
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              onClick={onCancel}
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
              onClick={() => onEdit(student)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Xoá
            </button>
          </td>
        </>
      )}
    </tr>
  );
}
