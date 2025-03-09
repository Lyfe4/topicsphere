import React, { useState } from 'react';
import { Folder, ChevronRight, ChevronDown, Plus, Upload, Star, Clock, ArrowRight, Search, BarChart2, Book, Settings, Users, HelpCircle } from 'lucide-react';

const LecturerDashboard = () => {
  // Sample data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced Neural Networks",
      expanded: true,
      topics: [
        {
          id: 101,
          title: "Convolutional Networks",
          expanded: false,
          subtopics: [
            { id: 1001, title: "Kernel Operations", materials: 3, lastUpdated: "2 days ago" },
            { id: 1002, title: "Pooling Techniques", materials: 5, lastUpdated: "1 week ago" }
          ]
        },
        {
          id: 102,
          title: "Recurrent Networks",
          expanded: true,
          subtopics: [
            { id: 1003, title: "LSTM Architecture", materials: 4, lastUpdated: "Yesterday" },
            { id: 1004, title: "Attention Mechanisms", materials: 7, lastUpdated: "3 days ago" },
            { id: 1005, title: "Transformers", materials: 2, lastUpdated: "Just now" }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Quantum Computing Fundamentals",
      expanded: false,
      topics: [
        {
          id: 103,
          title: "Quantum Gates",
          expanded: false,
          subtopics: [
            { id: 1006, title: "Single Qubit Gates", materials: 3, lastUpdated: "1 month ago" },
            { id: 1007, title: "Multi-Qubit Operations", materials: 4, lastUpdated: "2 weeks ago" }
          ]
        }
      ]
    }
  ]);
  
  const [selectedTemplate, setSelectedTemplate] = useState('explanation');
  const [includeQuizzes, setIncludeQuizzes] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTopicModalOpen, setNewTopicModalOpen] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPrompts, setShowPrompts] = useState(true);
  const [showQuizzes, setShowQuizzes] = useState(false);
  
  const templates = [
    { 
      id: 'explanation', 
      name: 'Explanation + Examples',
      prompt: 'Present the topic in a clear, structured manner. Begin with fundamental concepts, then progress to more complex ideas. Use concrete examples that relate to students\' experiences or interests. Incorporate visual aids, diagrams, or analogies to illustrate key points. End with a summary that reinforces main takeaways.',
      quizzes: [
        { question: 'What is the primary purpose of a convolutional layer in CNNs?', answers: ['Feature extraction', 'Data normalization', 'Dimensionality reduction', 'Parameter optimization'], correct: 0 },
        { question: 'Which of the following is NOT a type of pooling operation?', answers: ['Max pooling', 'Average pooling', 'Gradient pooling', 'Global pooling'], correct: 2 }
      ]
    },
    { 
      id: 'socratic', 
      name: 'Socratic Dialogue',
      prompt: 'Structure the content as a dialogue between a teacher and student. Begin with thought-provoking questions that challenge assumptions. Guide learners to discover concepts through targeted questioning rather than direct explanations. Anticipate misconceptions and address them through further questioning. Conclude by having students articulate their new understanding.',
      quizzes: [
        { question: 'In a Socratic dialogue about neural networks, what would be the most appropriate opening question?', answers: ['What is a neural network?', 'How do neural networks relate to human cognition?', 'What problem might neural networks help us solve?', 'When were neural networks invented?'], correct: 2 },
        { question: 'What is the main purpose of the Socratic method in teaching?', answers: ['To transfer knowledge efficiently', 'To guide learners to discover knowledge themselves', 'To evaluate student performance', 'To organize complex information'], correct: 1 }
      ]
    },
    { 
      id: 'roleplay', 
      name: 'Roleplay',
      prompt: 'Frame the content as a scenario where students adopt specific roles relevant to the subject matter. Create a realistic context where these roles interact to solve problems or make decisions. Provide clear objectives and constraints for the roleplay. Include reflection opportunities after the activity to connect the experience to learning objectives.',
      quizzes: [
        { question: 'When using roleplay to teach about neural networks, which scenario would be most effective?', answers: ['Students act as neurons in a network processing information', 'Students debate the ethics of AI as different stakeholders', 'Students perform a historical reenactment of AI development', 'Students pretend to be different programming languages'], correct: 0 },
        { question: 'What is a key benefit of using roleplay in technical subjects?', answers: ['It simplifies complex theories', 'It helps students memorize terminology', 'It creates emotional connections to abstract concepts', 'It eliminates the need for technical explanations'], correct: 2 }
      ]
    },
    { 
      id: 'simulation', 
      name: 'Simulation',
      prompt: 'Create an interactive scenario that models real-world applications of the concept. Define clear parameters, variables, and constraints that influence outcomes. Allow students to manipulate variables and observe resulting changes. Guide students to form hypotheses, test them within the simulation, and analyze results. Connect simulation outcomes to theoretical principles.',
      quizzes: [
        { question: 'What distinguishes a simulation from other teaching methods?', answers: ['It always uses computer technology', 'It involves interactive experimentation with a model', 'It requires no teacher involvement', 'It must involve multiple students'], correct: 1 },
        { question: 'Which of these would be most appropriate for teaching through simulation?', answers: ['Historical dates and events', 'Basic vocabulary', 'Complex systems with interacting variables', 'Simple mathematical operations'], correct: 2 }
      ]
    }
  ];

  const toggleCourseExpand = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? {...course, expanded: !course.expanded} : course
    ));
  };
  
  const toggleTopicExpand = (courseId, topicId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? {
        ...course, 
        topics: course.topics.map(topic => 
          topic.id === topicId ? {...topic, expanded: !topic.expanded} : topic
        )
      } : course
    ));
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    setUploadModalOpen(false);
    alert(`Content successfully processed with ${selectedTemplate} template! ${includeQuizzes ? 'Quizzes have been generated.' : ''}`);
  };
  
  const handleNewTopic = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setNewTopicModalOpen(false);
    alert(`New topic created with ${selectedTemplate} template! ${includeQuizzes ? 'Quizzes have been included.' : ''}`);
  };

  return (
    <div className="h-screen bg-slate-900">
      {/* Side Navigation */}
      <div className="flex h-full">
        <div className="w-16 bg-slate-800 text-slate-300 flex flex-col items-center py-6 shadow-lg">
          <div className="bg-emerald-600 p-2 rounded-lg mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L4 19H20L12 5Z" fill="white"/>
              <circle cx="12" cy="14" r="3" fill="#1e293b"/>
            </svg>
          </div>
          <div className="flex flex-col space-y-8">
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Folder size={22} className="text-slate-300" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Book size={22} className="text-slate-300" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <BarChart2 size={22} className="text-slate-300" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Users size={22} className="text-slate-300" />
            </button>
          </div>
          <div className="mt-auto">
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Settings size={22} className="text-slate-300" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors mt-4">
              <HelpCircle size={22} className="text-slate-300" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center sticky top-0 z-10 shadow-md">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mr-2 text-emerald-400">TopicSphere</h1>
              <div className="flex items-center ml-4 border-l pl-4 border-slate-700">
                <Folder className="mr-2 text-emerald-400" size={20} />
                <span className="font-medium text-slate-200">Course Manager</span>
                <span className="ml-2 text-xs font-semibold bg-slate-700 text-emerald-400 px-2 py-1 rounded-full">Tier 2 View</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Search topics..." 
                  className="pl-10 pr-4 py-2 bg-slate-700 border-none rounded-lg w-64 focus:ring-2 focus:ring-emerald-500 text-slate-200 placeholder-slate-400 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <button 
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-emerald-700 transition shadow-md"
                onClick={() => setUploadModalOpen(true)}
              >
                <Plus size={18} className="mr-2" />
                <span>Add Course</span>
              </button>
            </div>
          </header>
          
          <div className="p-6 overflow-auto flex-1 bg-slate-900">
            <div className="mb-6 flex justify-between items-center">
              <div className="flex gap-3">
                <button className="bg-slate-800 px-4 py-2 rounded-lg shadow-sm font-medium text-emerald-400 border border-slate-700">All Courses</button>
                <button className="px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:shadow-sm transition-all">Recently Updated</button>
                <button className="px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:shadow-sm transition-all">Favorites</button>
              </div>
              <div className="flex items-center">
                <div className="bg-slate-800 text-emerald-400 px-3 py-1 rounded-full text-sm mr-3 border border-slate-700">
                  <span className="font-medium">Pro Tip:</span> Upload slides or notes to auto-extract topics and subtopics
                </div>
                <div className="text-slate-400 text-sm">
                  Showing {courses.reduce((count, course) => 
                    count + course.topics.reduce((subCount, topic) => 
                      subCount + topic.subtopics.length, 0), 0)} subtopics
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-700">
              {courses.map(course => (
                <div key={course.id} className="border-b border-slate-700 last:border-b-0">
                  <div 
                    className="flex items-center p-4 cursor-pointer hover:bg-slate-700 transition-colors"
                    onClick={() => toggleCourseExpand(course.id)}
                  >
                    <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-lg bg-slate-700 text-emerald-400">
                      {course.expanded ? 
                        <ChevronDown size={20} /> : 
                        <ChevronRight size={20} />
                      }
                    </div>
                    <h2 className="font-bold flex-1 text-slate-200">{course.title}</h2>
                    <div className="flex items-center gap-2">
                      <button className="text-emerald-400 hover:text-emerald-300 p-1 hover:bg-slate-600 rounded transition-colors">
                        <Plus size={18} />
                      </button>
                      <Star size={18} className="text-slate-600 hover:text-yellow-400 cursor-pointer" />
                    </div>
                  </div>
                  
                  {course.expanded && (
                    <div className="pl-8 pr-4 bg-slate-750">
                      {course.topics.map(topic => (
                        <div key={topic.id} className="border-t border-slate-700">
                          <div 
                            className="flex items-center p-3 cursor-pointer hover:bg-slate-700 transition-colors"
                            onClick={() => toggleTopicExpand(course.id, topic.id)}
                          >
                            <div className="flex items-center justify-center w-6 h-6 mr-2 rounded bg-slate-800 text-emerald-400 border border-slate-600">
                              {topic.expanded ? 
                                <ChevronDown size={16} /> : 
                                <ChevronRight size={16} />
                              }
                            </div>
                            <h3 className="font-medium flex-1 text-slate-300">{topic.title}</h3>
                            <div className="flex items-center gap-2">
                              <button className="text-emerald-400 hover:text-emerald-300 p-1 hover:bg-slate-600 rounded transition-colors">
                                <Plus size={16} />
                              </button>
                              <span className="text-sm bg-slate-700 text-emerald-400 px-2 py-0.5 rounded-full">{topic.subtopics.length} subtopics</span>
                            </div>
                          </div>
                          
                          {topic.expanded && (
                            <div className="bg-slate-800 rounded-lg mx-4 mb-3 overflow-hidden shadow-sm border border-slate-700">
                              {topic.subtopics.map(subtopic => (
                                <div key={subtopic.id} className="flex items-center p-3 border-t border-slate-700 first:border-t-0 hover:bg-slate-700 transition-colors">
                                  <div className="w-6 mr-2"></div>
                                  <h4 className="flex-1 text-slate-300">{subtopic.title}</h4>
                                  <div className="flex items-center gap-4">
                                    <span className="text-xs bg-slate-700 text-emerald-400 px-2 py-1 rounded-full">
                                      {subtopic.materials} materials
                                    </span>
                                    <span className="text-xs text-slate-400 flex items-center">
                                      <Clock size={14} className="mr-1" />
                                      {subtopic.lastUpdated}
                                    </span>
                                    <button className="text-slate-500 hover:text-emerald-400 p-1 hover:bg-slate-600 rounded transition-colors">
                                      <ArrowRight size={16} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                              <button className="flex items-center p-3 text-emerald-400 w-full hover:bg-slate-700 transition-colors font-medium">
                                <Plus size={16} className="mr-2" />
                                <span>Add new subtopic</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      <button 
                        className="flex items-center p-3 my-2 text-emerald-400 w-full rounded-lg hover:bg-slate-700 transition-colors font-medium"
                        onClick={() => {
                          setCurrentCourseId(course.id);
                          setNewTopicModalOpen(true);
                        }}
                      >
                        <Plus size={16} className="mr-2" />
                        <span>Add new topic</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Course Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-slate-800 rounded-xl shadow-lg p-6 w-full max-w-lg border border-slate-700">
            <h2 className="text-xl font-bold mb-2 text-emerald-400">Add New Course</h2>
            <p className="text-slate-300 mb-6">Create a new course or upload existing content to automatically extract topics and subtopics using AI analysis.</p>
            
            <form onSubmit={handleFileUpload}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Course Title
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 bg-slate-700 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-200 placeholder-slate-400 transition-all"
                  placeholder="Enter course title"
                  required
                />
              </div>
              
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 mb-6 text-center bg-slate-750 hover:bg-slate-700 hover:border-emerald-600 transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto text-emerald-500 mb-2" />
                <p className="text-sm text-slate-300 mb-2">Drag and drop files here to create new topics</p>
                <input 
                  type="file" 
                  className="hidden" 
                  id="fileUpload" 
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
                />
                <button 
                  type="button"
                  className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors"
                  onClick={() => document.getElementById('fileUpload').click()}
                >
                  Browse files
                </button>
                <p className="text-xs text-slate-400 mt-2">Supported formats: PDF, PPTX, DOCX, TXT</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Select Template
                </label>
                <select 
                  className="w-full p-2 bg-slate-700 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-200 transition-all"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                
                {/* AI Prompt Display */}
                <div className="mt-3 p-3 bg-slate-750 border border-slate-600 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-300">AI Teaching Prompt:</span>
                    <button 
                      type="button"
                      className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                      onClick={() => setShowPrompts(!showPrompts)}
                    >
                      {showPrompts ? 'Hide' : 'Show'} Prompt
                    </button>
                  </div>
                  {showPrompts && (
                    <p className="text-sm text-slate-300 bg-slate-800 p-2 rounded border border-slate-700">
                      {templates.find(t => t.id === selectedTemplate)?.prompt}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <input 
                  type="checkbox" 
                  id="includeQuizzes" 
                  className="text-emerald-600 rounded bg-slate-700 border-slate-600"
                  checked={includeQuizzes}
                  onChange={(e) => setIncludeQuizzes(e.target.checked)}
                />
                <label htmlFor="includeQuizzes" className="text-sm text-slate-300">
                  Automatically generate quizzes from content
                </label>
              </div>
              
              {/* Quiz Preview */}
              {includeQuizzes && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-300">Sample Quiz Questions:</span>
                    <button 
                      type="button"
                      className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                      onClick={() => setShowQuizzes(!showQuizzes)}
                    >
                      {showQuizzes ? 'Hide' : 'Show'} Questions
                    </button>
                  </div>
                  {showQuizzes && (
                    <div className="bg-slate-800 p-3 rounded border border-slate-700 max-h-48 overflow-y-auto">
                      {templates.find(t => t.id === selectedTemplate)?.quizzes.map((quiz, index) => (
                        <div key={index} className="mb-3 last:mb-0">
                          <p className="text-sm font-medium mb-1 text-slate-200">{index + 1}. {quiz.question}</p>
                          <ul className="pl-5 text-sm">
                            {quiz.answers.map((answer, i) => (
                              <li key={i} className={`mb-1 ${i === quiz.correct ? 'text-emerald-400 font-medium' : 'text-slate-300'}`}>
                                {['A', 'B', 'C', 'D'][i]}. {answer} {i === quiz.correct && '✓'}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <input 
                  type="checkbox" 
                  id="extractAll" 
                  className="text-emerald-600 rounded bg-slate-700 border-slate-600"
                />
                <label htmlFor="extractAll" className="text-sm text-slate-300">
                  Extract all potential topics and subtopics
                </label>
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                  onClick={() => setUploadModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md flex items-center"
                >
                  <span>Create Course</span>
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* New Topic Modal with Rich Text Editor */}
      {newTopicModalOpen && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 z-50 overflow-y-auto backdrop-filter backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen py-4 px-4">
            <div className="bg-slate-800 rounded-xl shadow-lg p-6 w-full max-w-4xl relative border border-slate-700">
              <button 
                type="button" 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
                onClick={() => setNewTopicModalOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <h2 className="text-xl font-bold mb-2 text-emerald-400">Create New Topic</h2>
              <p className="text-slate-300 mb-6">Create a new topic within this course with your preferred teaching method and content structure.</p>
              
              <div className="overflow-y-auto max-h-96 pr-2">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Topic Title
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 bg-slate-700 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-200 placeholder-slate-400 transition-all"
                    placeholder="Enter topic title"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Topic Content
                  </label>
                  <div className="border border-slate-600 rounded-lg shadow-sm">
                    <div className="flex flex-wrap border-b border-slate-600 bg-slate-750">
                      <div className="flex items-center p-2 border-r border-slate-600">
                        <button type="button" className="p-1 hover:bg-slate-700 rounded transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button type="button" className="p-1 hover:bg-slate-700 rounded transition-colors ml-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center p-2 border-r border-slate-600">
                        <button type="button" className="p-1 hover:bg-slate-700 rounded transition-colors flex items-center">
                          <span className="font-serif mr-1 text-slate-300">A</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                        <button type="button" className="p-1 hover:bg-slate-700 rounded transition-colors ml-1 font-bold text-slate-300">B</button>
                        <button type="button" className="p-1 hover:bg-slate-700 rounded transition-colors ml-1 italic text-slate-300">I</button>
                        <button type="button" className="p-1 hover:bg-slate-700 rounded transition-colors ml-1 underline text-slate-300">U</button>
                      </div>
                      <div className="flex items-center p-2 border-r border-slate-600">
                        <button type="button" className="p-1 hover:bg-slate-700 rounded transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                            <line x1="21" y1="6" x2="3" y2="6"></line>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                            <line x1="21" y1="18" x2="7" y2="18"></line>
                          </svg>
                        </button>
                        <button type="button" className="p-1 hover:bg-slate-700 rounded transition-colors ml-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="15" y2="12"></line>
                            <line x1="3" y1="18" x2="17" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center p-2">
                        <button type="button" className="p-1 hover:bg-slate-700 rounded transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                        </button>
                        <button type="button" className="p-1 hover:bg-slate-700 rounded transition-colors ml-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 min-h-48 bg-slate-800">
                      {/* Empty text editor content area */}
                      <div className="text-slate-500 text-sm">Click to start writing or use the toolbar to format your content...</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 mb-6 text-center bg-slate-750 hover:bg-slate-700 hover:border-emerald-600 transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-emerald-500 mb-2" />
                  <p className="text-sm text-slate-300 mb-2">Or drag and drop files here to create content</p>
                  <input 
                    type="file" 
                    className="hidden" 
                    id="topicFileUpload" 
                    accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
                  />
                  <button 
                    type="button"
                    className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors"
                    onClick={() => document.getElementById('topicFileUpload').click()}
                  >
                    Browse files
                  </button>
                  <p className="text-xs text-slate-400 mt-2">Supported formats: PDF, PPTX, DOCX, TXT</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Select Template
                  </label>
                  <select 
                    className="w-full p-2 bg-slate-700 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-slate-200 transition-all"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                  >
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                  
                  {/* AI Prompt Display */}
                  <div className="mt-3 p-3 bg-slate-750 border border-slate-600 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-300">AI Teaching Prompt:</span>
                      <button 
                        type="button"
                        className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                        onClick={() => setShowPrompts(!showPrompts)}
                      >
                        {showPrompts ? 'Hide' : 'Show'} Prompt
                      </button>
                    </div>
                    {showPrompts && (
                      <p className="text-sm text-slate-300 bg-slate-800 p-2 rounded border border-slate-700">
                        {templates.find(t => t.id === selectedTemplate)?.prompt}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-2">
                  <input 
                    type="checkbox" 
                    id="newTopicQuizzes" 
                    className="text-emerald-600 rounded bg-slate-700 border-slate-600"
                    checked={includeQuizzes}
                    onChange={(e) => setIncludeQuizzes(e.target.checked)}
                  />
                  <label htmlFor="newTopicQuizzes" className="text-sm text-slate-300">
                    Include quizzes within topic content
                  </label>
                </div>
                
                {/* Quiz Preview */}
                {includeQuizzes && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-300">Sample Quiz Questions:</span>
                      <button 
                        type="button"
                        className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                        onClick={() => setShowQuizzes(!showQuizzes)}
                      >
                        {showQuizzes ? 'Hide' : 'Show'} Questions
                      </button>
                    </div>
                    {showQuizzes && (
                      <div className="bg-slate-800 p-3 rounded border border-slate-700 max-h-64 overflow-y-auto">
                        {templates.find(t => t.id === selectedTemplate)?.quizzes.map((quiz, index) => (
                          <div key={index} className="mb-3 last:mb-0">
                            <p className="text-sm font-medium mb-1 text-slate-200">{index + 1}. {quiz.question}</p>
                            <ul className="pl-5 text-sm">
                              {quiz.answers.map((answer, i) => (
                                <li key={i} className={`mb-1 ${i === quiz.correct ? 'text-emerald-400 font-medium' : 'text-slate-300'}`}>
                                  {['A', 'B', 'C', 'D'][i]}. {answer} {i === quiz.correct && '✓'}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-700">
                <button 
                  type="button" 
                  className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                  onClick={() => setNewTopicModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md flex items-center"
                  onClick={handleNewTopic}
                >
                  <span>Create Topic</span>
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerDashboard;