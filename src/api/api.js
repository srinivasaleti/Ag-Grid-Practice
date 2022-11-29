const key = "students";
export const StudentApi = {
  addStudent: async (student) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const students = JSON.parse(localStorage.getItem(key) || "[]");
        localStorage.setItem(
          key,
          JSON.stringify([...students, { ...student, id: students.length + 1 }])
        );
        resolve();
      }, 1000);
    });
  },

  deleteStudent: async (student) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const students = JSON.parse(localStorage.getItem(key) || "[]");
        const newStudents = students.filter((s) => s.id !== student.id);
        localStorage.setItem(key, JSON.stringify(newStudents));
        resolve();
      }, 1000);
    });
  },

  updateStudent: (student) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const students = JSON.parse(localStorage.getItem(key) || "[]");
        const newStudents = students.map((s) => {
          if (s.id == student.id) {
            return student;
          }
          return s;
        });

        localStorage.setItem(key, JSON.stringify(newStudents));
        resolve();
      }, 1000);
    });
  },

  getStudents: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem(key) || "[]");
        resolve(data);
      }, 1200);
    });
  },
};
