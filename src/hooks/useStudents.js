import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'students'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const studentsData = [];
        querySnapshot.forEach((doc) => {
          studentsData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setStudents(studentsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching students:', error);
        setError(error.message);
        setLoading(false);
        
        // Fallback to local state for demo
        const demoStudents = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+91 9876543210',
            location: 'Hyderabad',
            type: 'domestic',
            course: 'Full Stack Development',
            stage: 'lead',
            notes: 'Interested in React and Node.js training',
            createdAt: new Date()
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1 234567890',
            location: 'USA',
            type: 'international',
            course: 'Interview Preparation',
            stage: 'qualified',
            notes: 'Looking for remote job opportunities',
            createdAt: new Date()
          },
          {
            id: '3',
            name: 'Raj Patel',
            email: 'raj@example.com',
            phone: '+91 8765432109',
            location: 'Mumbai',
            type: 'domestic',
            course: 'Data Science',
            stage: 'training',
            notes: 'Currently in week 3 of training',
            createdAt: new Date()
          }
        ];
        setStudents(demoStudents);
      }
    );

    return () => unsubscribe();
  }, []);

  const addStudent = async (studentData) => {
    try {
      const docRef = await addDoc(collection(db, 'students'), {
        ...studentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('Student added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding student:', error);
      
      // Fallback for demo
      const newStudent = {
        id: Date.now().toString(),
        ...studentData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setStudents(prev => [newStudent, ...prev]);
    }
  };

  const updateStudent = async (studentId, updates) => {
    try {
      const studentRef = doc(db, 'students', studentId);
      await updateDoc(studentRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating student:', error);
      
      // Fallback for demo
      setStudents(prev => 
        prev.map(student => 
          student.id === studentId 
            ? { ...student, ...updates, updatedAt: new Date() }
            : student
        )
      );
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      await deleteDoc(doc(db, 'students', studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
      
      // Fallback for demo
      setStudents(prev => prev.filter(student => student.id !== studentId));
    }
  };

  const moveStudent = async (studentId, newStage) => {
    await updateStudent(studentId, { stage: newStage });
  };

  return {
    students,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    moveStudent
  };
};