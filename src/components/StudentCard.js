import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Edit, Trash2, Globe, FileText } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';

const StudentCard = ({ student, index, onEdit, onDelete, onAddNote, stage }) => {
  return (
    <Draggable draggableId={student.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-grab active:cursor-grabbing select-none
            ${snapshot.isDragging 
              ? 'shadow-xl rotate-1 scale-105 border-blue-400 bg-blue-50 z-50' 
              : 'hover:shadow-md hover:border-gray-300'}
            transition-all duration-200 ease-in-out transform-gpu`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          whileHover={{ scale: 1.01 }}
          whileDrag={{ scale: 1.02, zIndex: 1000 }}
          layout
          layoutId={student.id}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-2 flex-wrap">
                <User size={14} className="text-gray-500 flex-shrink-0" />
                <h3 className="font-semibold text-sm text-gray-800 truncate flex-1">{student.name}</h3>
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0
                  ${student.type === 'domestic' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'}`}>
                  <Globe size={10} className="inline mr-0.5" />
                  {student.type}
                </span>
              </div>
              
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Mail size={12} className="flex-shrink-0" />
                  <span className="truncate">{student.email}</span>
                </div>
                
                {student.phone && (
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Phone size={12} className="flex-shrink-0" />
                    <span className="truncate">{student.phone}</span>
                  </div>
                )}
                
                {student.location && (
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MapPin size={12} className="flex-shrink-0" />
                    <span className="truncate">{student.location}</span>
                  </div>
                )}
              </div>
              
              {student.course && (
                <div className="mt-2">
                  <span className="inline-block bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs truncate max-w-full">
                    {student.course}
                  </span>
                </div>
              )}
              
              {student.notes && (
                <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {student.notes}
                </p>
              )}
            </div>
            
            <div className="flex flex-col gap-0.5 ml-2 flex-shrink-0">
              {stage === 'lead' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddNote(student);
                  }}
                  className="p-1 text-gray-400 hover:text-green-500 transition-colors rounded hover:bg-green-50"
                  title="Add note"
                >
                  <FileText size={14} />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(student);
                }}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors rounded hover:bg-blue-50"
                title="Edit student"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(student.id);
                }}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded hover:bg-red-50"
                title="Delete student"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          
          <div className="text-xs text-gray-400 border-t pt-1.5 mt-2">
            Added: {new Date(student.createdAt?.toDate?.() || student.createdAt).toLocaleDateString()}
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};

export default memo(StudentCard);