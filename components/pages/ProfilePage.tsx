import {
  Camera,
  Edit,
  Plus,
  Briefcase as BriefcaseIcon,
  BookOpen,
} from "lucide-react";
import { User } from "../../types";

interface ProfilePageProps {
  currentUser: User;
  showToastMessage: (
    message: string,
    type?: "success" | "info" | "warning" | "error"
  ) => void;
  posts: any[];
}

const ProfilePage = ({
  currentUser,
  showToastMessage,
  posts,
}: ProfilePageProps) => (
  <div className="col-span-12 lg:col-span-9">
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden mb-2">
      <div className="relative">
        <div
          className="h-32 md:h-48 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=300&fit=crop)",
          }}
        ></div>
        <button
          onClick={() => showToastMessage("Feature coming soon!")}
          className="cursor-pointer absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-50"
        >
          <Camera size={20} className="text-gray-600" />
        </button>
        <img
          src={currentUser.avatar}
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full absolute -bottom-12 md:-bottom-16 left-4 md:left-8 border-4 border-white object-cover"
        />
      </div>

      <div className="pt-16 md:pt-20 pb-6 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between">
          <div className="flex-1 mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {currentUser.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-2">
              {currentUser.title}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => showToastMessage("Feature coming soon!")}
                className="cursor-pointer bg-blue-600 text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-blue-700 w-full sm:w-auto"
              >
                Open to
              </button>
              <button
                onClick={() => showToastMessage("Feature coming soon!")}
                className="cursor-pointer border border-blue-600 text-blue-600 px-4 md:px-6 py-2 rounded-full font-medium hover:bg-blue-50 w-full sm:w-auto"
              >
                Add profile section
              </button>
              <button
                onClick={() => showToastMessage("Feature coming soon!")}
                className="cursor-pointer border border-gray-400 text-gray-700 px-4 md:px-6 py-2 rounded-full font-medium hover:bg-gray-50 w-full sm:w-auto"
              >
                More
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => showToastMessage("Feature coming soon!")}
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
            >
              <Edit
                onClick={() => showToastMessage("Feature coming soon!")}
                size={20}
                className="text-gray-600"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg border border-gray-300 p-4 md:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          About
        </h2>
        <button
          onClick={() => showToastMessage("Feature coming soon!")}
          className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
        >
          <Edit size={16} className="text-gray-600" />
        </button>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
        {currentUser.about}
      </p>
    </div>

    <div className="bg-white rounded-lg border border-gray-300 p-4 md:p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Experience
        </h2>
        <button
          onClick={() => showToastMessage("Feature coming soon!")}
          className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
        >
          <Plus size={16} className="text-gray-600" />
        </button>
      </div>
      <div className="space-y-6">
        {currentUser.experience.map((exp) => (
          <div key={exp.id} className="flex space-x-3 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
              <BriefcaseIcon size={20} className="text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                {exp.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                {exp.company}
              </p>
              <p className="text-xs md:text-sm text-gray-600 mb-2">
                {exp.duration}
              </p>
              <p className="text-gray-700 text-sm md:text-base">
                {exp.description}
              </p>
            </div>
            <button
              onClick={() => showToastMessage("Feature coming soon!")}
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
            >
              <Edit size={16} className="text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-lg border border-gray-300 p-4 md:p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Education
        </h2>
        <button
          onClick={() => showToastMessage("Feature coming soon!")}
          className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
        >
          <Plus size={16} className="text-gray-600" />
        </button>
      </div>
      <div className="space-y-6">
        {currentUser.education.map((edu) => (
          <div key={edu.id} className="flex space-x-3 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
              <BookOpen size={20} className="text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                {edu.school}
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                {edu.degree} in {edu.field}
              </p>
              <p className="text-xs md:text-sm text-gray-600">{edu.duration}</p>
            </div>
            <button
              onClick={() => showToastMessage("Feature coming soon!")}
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
            >
              <Edit size={16} className="text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-lg border border-gray-300 p-4 md:p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Skills
        </h2>
        <button
          onClick={() => showToastMessage("Feature coming soon!")}
          className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
        >
          <Plus size={16} className="text-gray-600" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {currentUser.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium hover:bg-gray-200 cursor-pointer"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-lg border border-gray-300 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            Activity
          </h2>
          <p className="text-sm text-gray-600">
            {currentUser.connections} connections
          </p>
        </div>
        <button
          onClick={() => showToastMessage("Feature coming soon!")}
          className="cursor-pointer border border-blue-600 text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-50 w-full sm:w-auto"
        >
          Create a post
        </button>
      </div>
      <div className="space-y-4">
        {posts
          .filter((post) => post.author.name === currentUser.name)
          .slice(0, 3)
          .map((post) => (
            <div key={post.id} className="border-l-2 border-blue-600 pl-4">
              <p className="text-gray-700 text-sm">
                {post.content.slice(0, 150)}...
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>{post.likes} likes</span>
                <span>{post.comments.length} comments</span>
                <span>{post.author.timePosted}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default ProfilePage;
