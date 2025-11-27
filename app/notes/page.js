'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Plus, Trash2, Edit2, Search, Tag, Filter,
  BookOpen, Clock, Save, X, Hash
} from 'lucide-react';
import { useStore } from '@/lib/store';
import Link from 'next/link';

export default function NotesPage() {
  const { notes, updateNote, deleteNote } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [editingNote, setEditingNote] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  // Convert notes object to array
  const notesArray = Object.entries(notes).map(([key, value]) => ({
    key,
    ...value,
    skillId: key.split('-')[0],
    conceptId: key.split('-')[1]
  }));

  // Get all unique tags
  const allTags = ['All', ...new Set(notesArray.flatMap(note => note.tags || []))];

  // Filter notes
  const filteredNotes = notesArray.filter(note => {
    const matchesSearch = searchTerm === '' ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.skillId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || (note.tags && note.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const handleStartEdit = (note) => {
    setEditingNote(note.key);
    setEditContent(note.content);
    setEditTags(note.tags || []);
    setNewTag('');
  };

  const handleSaveEdit = () => {
    if (editingNote && editContent) {
      const [skillId, conceptId] = editingNote.split('-');
      updateNote(skillId, conceptId, editContent, editTags);
      setEditingNote(null);
      setEditContent('');
      setEditTags([]);
    }
  };

  const handleAddTag = () => {
    if (newTag && !editTags.includes(newTag)) {
      setEditTags([...editTags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditTags(editTags.filter(tag => tag !== tagToRemove));
  };

  const handleDelete = (key) => {
    if (confirm('Are you sure you want to delete this note?')) {
      const [skillId, conceptId] = key.split('-');
      deleteNote(skillId, conceptId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Notes
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Organize your DevOps learning with personal notes
          </p>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{notesArray.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Notes</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{allTags.length - 1}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tags</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {new Set(notesArray.map(n => n.skillId)).size}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Skills Covered</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag === 'All' ? 'All Tags' : `#${tag}`}
                </option>
              ))}
            </select>

            <Link
              href="/skills"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              New Note
            </Link>
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                {editingNote === note.key ? (
                  /* Edit Mode */
                  <div className="space-y-4">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
                      rows="6"
                      placeholder="Enter your note..."
                    />

                    {/* Tag Editor */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tags
                      </label>
                      <div className="flex gap-2 mb-2 flex-wrap">
                        {editTags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          >
                            #{tag}
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                          placeholder="Add tag..."
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={handleAddTag}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNote(null)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                          {note.skillId}
                        </span>
                        {note.conceptId && (
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            #{note.conceptId}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStartEdit(note)}
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(note.key)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                      {note.content}
                    </p>

                    {note.tags && note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {note.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {note.updatedAt 
                            ? new Date(note.updatedAt).toLocaleDateString()
                            : new Date(note.createdAt).toLocaleDateString()
                          }
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-4">
              {searchTerm || selectedTag !== 'All' 
                ? 'No notes found matching your filters.'
                : 'No notes yet. Start taking notes as you learn!'}
            </p>
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" />
              Create Your First Note
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
