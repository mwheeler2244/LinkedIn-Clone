"use client";
import { useState } from "react";

// Import all our components
import LandingPage from "../components/pages/LandingPage";
import ProfilePage from "../components/pages/ProfilePage";
import LoginModal from "../components/modals/LoginModal";
import SignupModal from "../components/modals/SignupModal";
import Toast from "../components/ui/Toast";

// Import types
import {
  Post,
  Comment,
  NewsItem,
  Connection,
  Message,
  Conversation,
  User,
  StoredUser,
} from "../types";

export default function NetworX() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMessagingModal, setShowMessagingModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    title: "",
    company: "",
  });
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const [registeredUsers, setRegisteredUsers] = useState<StoredUser[]>([]);

  const [currentUser, setCurrentUser] = useState<User>({
    name: "Demo User",
    email: "demo@networx.com",
    title: "Professional",
    company: "Your Company",
    location: "San Francisco, CA",
    avatar:
      "https://images.unsplash.com/flagged/photo-1573603867003-89f5fd7a7576?q=80&w=3146&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    about:
      "Welcome to NetworX! Update your profile to tell others about yourself and your professional experience.",
    experience: [],
    education: [],
    skills: [],
    connections: 0,
  });

  const [activeTab, setActiveTab] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [profileViews] = useState(127);
  const [postImpressions] = useState(2341);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messageInput, setMessageInput] = useState("");
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectingUserId, setConnectingUserId] = useState<string | null>(null);
  const [connectMessage, setConnectMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    posts: Post[];
    connections: Connection[];
    jobs: any[];
    people: any[];
  }>({
    posts: [],
    connections: [],
    jobs: [],
    people: [],
  });

  const showToastMessage = (
    message: string,
    type: "success" | "info" | "warning" | "error" = "success",
    duration: number = 3000
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "Andrew England",
        title: "Junior Software Developer",
        avatar:
          "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
        company: "TechStart Inc",
        timePosted: "1d",
        isFollowing: false,
      },
      content:
        "Given that I only have 1-2 hours a day outside of my current job, I'm trying to make the most of that time. What should I focus on to boost my chances of landing a tech role? Improving my problem-solving skills, building projects, or networking? Any advice would be greatly appreciated! 🚀",
      likes: 142,
      comments: [
        {
          id: "1",
          author: {
            name: "Sarah Chen",
            avatar:
              "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Senior Developer",
          },
          content:
            "Focus on building projects that solve real problems. Employers love to see practical applications of your skills!",
          timePosted: "23h",
          likes: 12,
        },
      ],
      shares: 12,
      liked: false,
      reactions: {
        like: 89,
        celebrate: 31,
        support: 22,
      },
    },
    // Add more posts here as needed
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginForm.email || !loginForm.password) {
      setLoginError("Please fill in all fields");
      return;
    }

    if (!loginForm.email.includes("@")) {
      setLoginError("Please enter a valid email address");
      return;
    }

    const foundUser = registeredUsers.find(
      (user) =>
        user.email.toLowerCase() === loginForm.email.toLowerCase() &&
        user.password === loginForm.password
    );

    if (foundUser) {
      setCurrentUser(foundUser.userData);
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setLoginForm({ email: "", password: "", rememberMe: false });
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");

    if (
      !signupForm.firstName ||
      !signupForm.lastName ||
      !signupForm.email ||
      !signupForm.password
    ) {
      setSignupError("Please fill in all required fields");
      return;
    }

    if (!signupForm.email.includes("@")) {
      setSignupError("Please enter a valid email address");
      return;
    }

    if (signupForm.password.length < 6) {
      setSignupError("Password must be at least 6 characters");
      return;
    }

    const existingUser = registeredUsers.find(
      (user) => user.email.toLowerCase() === signupForm.email.toLowerCase()
    );

    if (existingUser) {
      setSignupError(
        "An account with this email already exists. Please use a different email or sign in."
      );
      return;
    }

    const newUserData: User = {
      name: `${signupForm.firstName} ${signupForm.lastName}`,
      email: signupForm.email,
      title: signupForm.title || "Professional",
      company: signupForm.company || "Your Company",
      avatar:
        "https://plus.unsplash.com/premium_photo-1669879859992-5252477fa489?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      about: `Welcome to NetworX! I'm ${signupForm.firstName} ${
        signupForm.lastName
      }${signupForm.title ? `, working as ${signupForm.title}` : ""}${
        signupForm.company ? ` at ${signupForm.company}` : ""
      }. Update your profile to tell others about yourself and your professional experience.`,
      experience: [],
      education: [],
      skills: [],
      connections: 0,
    };

    const newStoredUser: StoredUser = {
      email: signupForm.email,
      password: signupForm.password,
      userData: newUserData,
    };

    setRegisteredUsers((prev) => [...prev, newStoredUser]);
    setCurrentUser(newUserData);
    setIsAuthenticated(true);
    setShowSignupModal(false);
    setSignupForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      title: "",
      company: "",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("home");
    setShowProfileMenu(false);
    setSearchTerm("");
    setShowMessagingModal(false);

    setCurrentUser({
      name: "Demo User",
      email: "demo@networx.com",
      title: "Professional",
      company: "Your Company",
      location: "San Francisco, CA",
      avatar:
        "https://images.unsplash.com/flagged/photo-1573603867003-89f5fd7a7576?q=80&w=3146&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      about:
        "Welcome to NetworX! Update your profile to tell others about yourself and your professional experience.",
      experience: [],
      education: [],
      skills: [],
      connections: 0,
    });
  };

  // Render the appropriate page based on authentication status
  if (!isAuthenticated) {
    return (
      <>
        <LandingPage
          onShowLoginModal={() => setShowLoginModal(true)}
          onShowSignupModal={() => setShowSignupModal(true)}
        />

        <LoginModal
          show={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
          onSubmit={handleLogin}
          form={loginForm}
          onFormChange={(updates) =>
            setLoginForm((prev) => ({ ...prev, ...updates }))
          }
          error={loginError}
        />

        <SignupModal
          show={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
          onSubmit={handleSignup}
          form={signupForm}
          onFormChange={(updates) =>
            setSignupForm((prev) => ({ ...prev, ...updates }))
          }
          error={signupError}
        />

        <Toast
          show={showToast}
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      </>
    );
  }

  // Authenticated app content
  const renderContent = () => {
    if (activeTab === "profile") {
      return (
        <ProfilePage
          currentUser={currentUser}
          showToastMessage={showToastMessage}
          posts={posts}
        />
      );
    }

    // For now, return basic placeholder content for other tabs
    switch (activeTab) {
      case "network":
        return (
          <div className="col-span-12 lg:col-span-6">
            Network content coming soon...
          </div>
        );
      case "jobs":
        return (
          <div className="col-span-12 lg:col-span-6">
            Jobs content coming soon...
          </div>
        );
      case "messages":
        return (
          <div className="col-span-12 lg:col-span-6">
            Messages content coming soon...
          </div>
        );
      case "notifications":
        return (
          <div className="col-span-12 lg:col-span-6">
            Notifications content coming soon...
          </div>
        );
      default:
        return (
          <div className="col-span-12 lg:col-span-6">
            Home feed content coming soon...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-200">
      <header className="bg-white border-b border-gray-300 py-1 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">NX</span>
              </div>
              <span className="text-xl font-bold text-blue-700">NetworX</span>
            </div>

            <nav className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab("home")}
                className={`px-3 py-2 text-sm ${
                  activeTab === "home" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-3 py-2 text-sm ${
                  activeTab === "profile" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {renderContent()}
        </div>
      </main>

      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
