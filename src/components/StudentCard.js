import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Edit, Trash2, Globe } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';

const StudentCard = ({ student, index, onEdit, onDelete }) => {
  return (
    <Draggable draggableId={student.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-grab active:cursor-grabbing
            ${snapshot.isDragging ? 'shadow-lg rotate-2 scale-105' : 'hover:shadow-md'}
            transition-all duration-200`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          layout
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <User size={16} className="text-gray-500" />
                <h3 className="font-semibold text-gray-800">{student.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${student.type === 'domestic' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'}`}>
                  <Globe size={12} className="inline mr-1" />
                  {student.type}
                </span>
              </div>
              
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{student.email}</span>
                </div>
                
                {student.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>{student.phone}</span>
                  </div>
                )}
                
                {student.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{student.location}</span>
                  </div>
                )}
              </div>
              
              {student.course && (
                <div className="mt-2">
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {student.course}
                  </span>
                </div>
              )}
              
              {student.notes && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {student.notes}
                </p>
              )}
            </div>
            
            <div className="flex flex-col gap-1 ml-2">
              <button
                onClick={() => onEdit(student)}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                title="Edit student"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(student.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete student"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="text-xs text-gray-400 border-t pt-2">
            Added: {new Date(student.createdAt?.toDate?.() || student.createdAt).toLocaleDateString()}
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};

export default StudentCard;