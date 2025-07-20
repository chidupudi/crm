import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Users, TrendingUp } from 'lucide-react';
import { STAGES } from '../constants/stages';
import { useStudents } from '../hooks/useStudents';
import StageColumn from './StageColumn';
import StudentForm from './StudentForm';
import NoteModal from './NoteModal';

const CRMDashboard = () => {
  const { students, loading, error, addStudent, updateStudent, deleteStudent, moveStudent } = useStudents();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteStudent, setNoteStudent] = useState(null);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || student.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getStudentsByStage = (stageId) => {
    return filteredStudents.filter(student => student.stage === stageId);
  };


  const handleAddStudent = (studentData) => {
    addStudent(studentData);
  };

  const handleEditStudent = (studentData) => {
    updateStudent(editingStudent.id, studentData);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(studentId);
    }
  };

  const openEditForm = (student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingStudent(null);
  };

  const handleAddNote = (student) => {
    setNoteStudent(student);
    setIsNoteModalOpen(true);
  };

  const handleSubmitNote = (noteData) => {
    const updatedStudent = {
      ...noteStudent,
      notes: noteStudent.notes 
        ? `${noteStudent.notes}\n\n[${noteData.timestamp}] ${noteData.text}`
        : `[${noteData.timestamp}] ${noteData.text}`
    };
    updateStudent(noteStudent.id, updatedStudent);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
    setNoteStudent(null);
  };

  const stats = {
    total: students.length,
    leads: getStudentsByStage('lead').length,
    inTraining: getStudentsByStage('training').length,
    completed: getStudentsByStage('completed').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            CRM Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your consultancy students and track their progress
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Leads</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.leads}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Training</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.inTraining}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus size={20} />
            Add Student
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-yellow-800">
              <strong>Note:</strong> Firebase connection failed. Running in demo mode with sample data.
              Please configure your Firebase settings in src/firebase.js
            </p>
          </motion.div>
        )}

        {/* Kanban Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="overflow-x-auto overflow-y-visible"
        >
          <div className="flex gap-4 min-w-max px-2 pb-4" style={{ minWidth: 'calc(5 * 280px + 4 * 16px)' }}>
            {STAGES.map((stage) => (
              <div key={stage.id} className="flex-shrink-0" style={{ width: '280px' }}>
                <StageColumn
                  stage={stage}
                  students={getStudentsByStage(stage.id)}
                  onEditStudent={openEditForm}
                  onDeleteStudent={handleDeleteStudent}
                  onAddNote={handleAddNote}
                  onMoveStudent={moveStudent}
                  allStages={STAGES}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Student Form Modal */}
      <StudentForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
        initialData={editingStudent}
      />

      {/* Note Modal */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={closeNoteModal}
        onSubmit={handleSubmitNote}
        student={noteStudent}
      />
    </div>
  );
};

export default CRMDashboard;