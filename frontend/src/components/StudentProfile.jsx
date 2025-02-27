import { useEffect, useState } from "react";
import { User, Mail, Github, Code, Pencil, Loader2, X, Save, Eye } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import {
  SiReact, SiJavascript, SiTypescript, SiNodedotjs, SiPython, SiCplusplus, 
  SiTensorflow, SiGooglecloud, SiFigma, SiAndroid, SiDevpost, SiDatabricks
} from "react-icons/si";

const availableSkills = [
  { name: "React", icon: <SiReact className="w-5 h-5 text-blue-500" /> },
  { name: "JavaScript", icon: <SiJavascript className="w-5 h-5 text-yellow-500" /> },
  { name: "TypeScript", icon: <SiTypescript className="w-5 h-5 text-blue-600" /> },
  { name: "Node.js", icon: <SiNodedotjs className="w-5 h-5 text-green-500" /> },
  { name: "Python", icon: <SiPython className="w-5 h-5 text-blue-400" /> },
  { name: "C++", icon: <SiCplusplus className="w-5 h-5 text-blue-700" /> },
  { name: "Machine Learning", icon: <SiTensorflow className="w-5 h-5 text-orange-500" /> },
  { name: "Cloud Computing", icon: <SiGooglecloud className="w-5 h-5 text-blue-400" /> },
  { name: "DevOps", icon: <SiDevpost className="w-5 h-5 text-purple-500" /> },
  { name: "Data Science", icon: <SiDatabricks className="w-5 h-5 text-red-600" /> },
  { name: "UI/UX Design", icon: <SiFigma className="w-5 h-5 text-pink-500" /> },
  { name: "Mobile Development", icon: <SiAndroid className="w-5 h-5 text-green-600" /> },
];

const StudentProfile = () => {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    githubProfileLink: "",
    bio: "",
    skills: [],
  });
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8765/STUDENT-SERVICE/students/${user.id}`
        );
        const studentData = response.data;
        setStudent(studentData);
        setFormData({
          githubProfileLink: studentData.githubProfileLink || "",
          bio: studentData.bio || "",
          skills: studentData.skills || [],
        });
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudent();
  }, [user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (skill) => {
    setFormData((prev) => {
      if (prev.skills.includes(skill)) {
        return {
          ...prev,
          skills: prev.skills.filter((s) => s !== skill),
        };
      } else {
        return {
          ...prev,
          skills: [...prev.skills, skill],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await axios.put(
        `http://localhost:8765/STUDENT-SERVICE/students/student/${user.id}`,
        {
          ...formData,
          name: student.name,
          email: student.email,
        }
      );
      setStudent((prev) => ({
        ...prev,
        ...formData,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      githubProfileLink: student.githubProfileLink || "",
      bio: student.bio || "",
      skills: student.skills || [],
    });
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-xl font-medium text-gray-700 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Generate initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Helper to check if a section has data
  const hasData = (fieldName) => {
    return student[fieldName] && student[fieldName].length > 0;
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* Header Section with Avatar */}
        <div className="relative overflow-hidden">
          {/* Banner background */}
          <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-20 bg-gradient-to-t from-black/40 to-transparent">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-gray-800">
                {getInitials(student.name)}
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{student.name}</h1>
                <p className="text-white/90">{student.email}</p>
              </div>
              
              {/* Edit Button */}
              <div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-white/90 hover:bg-white text-blue-600 rounded-lg shadow-sm transition-all flex items-center space-x-2"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg shadow-sm transition-all flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Mode</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("info")}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === "info"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                <span>Profile Info</span>
              </button>
              
              <button
                onClick={() => setActiveTab("skills")}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === "skills"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Code className="w-4 h-4 mr-2" />
                <span>Skills & Expertise</span>
              </button>
            </nav>
          </div>

          {/* Content Based on Active Tab */}
          {isEditing ? (
            // Edit Mode
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      value={student.name}
                      disabled
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      value={student.email}
                      disabled
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      GitHub Profile URL
                    </label>
                    <div className="relative">
                      <input
                        name="githubProfileLink"
                        value={formData.githubProfileLink}
                        onChange={handleInputChange}
                        placeholder="https://github.com/yourusername"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Github className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={7}
                    placeholder="Tell us about yourself, your interests, and your career goals..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white dark:bg-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Skills & Expertise
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {availableSkills.map(({ name, icon }) => (
                    <label
                      key={name}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${
                        formData.skills.includes(name)
                          ? "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30"
                          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.skills.includes(name)}
                        onChange={() => handleSkillChange(name)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`${formData.skills.includes(name) ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`}>
                          {icon}
                        </div>
                        <span className={`text-sm ${
                          formData.skills.includes(name) 
                            ? "font-medium text-blue-700 dark:text-blue-300" 
                            : "text-gray-700 dark:text-gray-300"
                        }`}>{name}</span>
                      </div>
                      <div className={`ml-auto ${formData.skills.includes(name) ? "opacity-100" : "opacity-0"}`}>
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            // View Mode
            <>
              {activeTab === "info" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <p className="text-gray-900 dark:text-white">{student.email}</p>
                          </div>
                        </div>
                        
                        {/* Only show GitHub if it exists */}
                        {hasData("githubProfileLink") && (
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Github className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                              <a
                                href={student.githubProfileLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline dark:text-blue-400"
                              >
                                {student.githubProfileLink.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About Me</h3>
                      {hasData("bio") ? (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {student.bio}
                        </p>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                          <p className="text-gray-500 dark:text-gray-400">No bio information added yet.</p>
                          <button 
                            onClick={() => setIsEditing(true)}
                            className="mt-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
                          >
                            + Add Bio
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Skills & Expertise</h3>
                  
                  {student.skills && student.skills.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {student.skills.map((skill) => {
                        const skillData = availableSkills.find((s) => s.name === skill);
                        return (
                          <div
                            key={skill}
                            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-4">
                              {skillData?.icon}
                            </div>
                            <span className="font-medium text-gray-800 dark:text-white">{skill}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">No skills added yet.</p>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="mt-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
                      >
                        + Add Skills
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;