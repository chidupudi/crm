import React from 'react';
import { motion } from 'framer-motion';
import { Droppable } from '@hello-pangea/dnd';
import StudentCard from './StudentCard';

const StageColumn = ({ stage, students, onEditStudent, onDeleteStudent }) => {
  const studentCount = students.length;

  return (
    <div className="flex-1 min-w-80 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className={`font-semibold text-lg ${stage.color} px-3 py-1 rounded-lg border-2`}>
            {stage.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
        </div>
        <span className="bg-white text-gray-600 px-2 py-1 rounded-full text-sm font-medium shadow-sm">
          {studentCount}
        </span>
      </div>

      <Droppable droppableId={stage.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-96 transition-all duration-200 rounded-lg p-2
              ${snapshot.isDraggingOver 
                ? 'bg-blue-50 border-2 border-blue-300 border-dashed' 
                : 'bg-transparent'}`}
          >
            {students.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-32 text-gray-400 text-sm border-2 border-gray-200 border-dashed rounded-lg"
              >
                Drop students here
              </motion.div>
            ) : (
              students.map((student, index) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  index={index}
                  onEdit={onEditStudent}
                  onDelete={onDeleteStudent}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default StageColumn;