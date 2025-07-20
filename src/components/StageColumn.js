import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Droppable } from '@hello-pangea/dnd';
import StudentCard from './StudentCard';

const StageColumn = ({ stage, students, onEditStudent, onDeleteStudent, onAddNote }) => {
  const studentCount = students.length;

  return (
    <div className="w-full bg-gray-50 rounded-lg p-3 h-fit min-h-[500px] flex flex-col">
      <div className="flex items-start justify-between mb-3 flex-shrink-0">
        <div className="flex-1 min-w-0">
          <h2 className={`font-semibold text-sm ${stage.color} px-2 py-1 rounded-md border-2 truncate`}>
            {stage.title}
          </h2>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{stage.description}</p>
        </div>
        <span className="bg-white text-gray-600 px-2 py-1 rounded-full text-xs font-medium shadow-sm ml-2 flex-shrink-0">
          {studentCount}
        </span>
      </div>

      <Droppable droppableId={stage.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 transition-all duration-300 ease-in-out rounded-lg p-2 overflow-y-auto
              ${snapshot.isDraggingOver 
                ? 'bg-blue-50 border-2 border-blue-400 border-dashed shadow-inner transform scale-105' 
                : 'bg-transparent border-2 border-transparent'}`}
            style={{ minHeight: '300px', maxHeight: 'calc(100vh - 400px)' }}
          >
            {students.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center h-24 text-gray-400 text-xs border-2 border-gray-200 border-dashed rounded-lg hover:border-gray-300 transition-colors"
              >
                Drop students here
              </motion.div>
            ) : (
              <div className="space-y-2">
                {students.map((student, index) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    index={index}
                    onEdit={onEditStudent}
                    onDelete={onDeleteStudent}
                    onAddNote={onAddNote}
                    stage={stage.id}
                  />
                ))}
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default memo(StageColumn);