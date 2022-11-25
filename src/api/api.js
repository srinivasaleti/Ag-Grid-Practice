const key = "students";
export const StudentApi = {
  addStudent: async (student) => {
    const students = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(
      key,
      JSON.stringify([...students, { ...student, id: students.length + 1 }])
    );
  },

  deleteStudent: async (student) => {
    const students = JSON.parse(localStorage.getItem(key) || "[]");
    const newStudents = students.filter((s) => s.id !== student.id);
    localStorage.setItem(key, JSON.stringify(newStudents));
  },

  updateStudent: (student) => {
    const students = JSON.parse(localStorage.getItem(key) || "[]");
    const newStudents = students.map((s) => {
      if (s.id == student.id) {
        return student;
      }
      return s;
    });

    localStorage.setItem(key, JSON.stringify(newStudents));
  },

  getStudents: () => {
    return JSON.parse(localStorage.getItem(key) || "[]");
  },
};
