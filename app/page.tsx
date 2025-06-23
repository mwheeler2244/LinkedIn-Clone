"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  User as UserIcon,
  Camera,
  Video,
  FileText,
  MapPin,
  ChevronRight,
  Building,
  ThumbsUp,
  MessageCircle,
  Share,
  Send,
  Plus,
  X,
  ChevronDown,
  Info,
  Star,
  LogOut,
  Settings,
  HelpCircle,
  Menu,
  Bookmark,
  Calendar,
  type LucideIcon,
} from "lucide-react";

// Import all our components
import LandingPage from "../components/pages/LandingPage";
import ProfilePage from "../components/pages/ProfilePage";

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
  JobListing,
  Person,
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
    jobs: JobListing[];
    people: Person[];
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

  const performSearch = (term: string) => {
    if (!term.trim()) {
      setShowSearchResults(false);
      setSearchResults({ posts: [], connections: [], jobs: [], people: [] });
      return;
    }

    const lowercaseTerm = term.toLowerCase();

    const filteredPosts = posts.filter(
      (post) =>
        post.content.toLowerCase().includes(lowercaseTerm) ||
        post.author.name.toLowerCase().includes(lowercaseTerm) ||
        post.author.title.toLowerCase().includes(lowercaseTerm) ||
        post.author.company.toLowerCase().includes(lowercaseTerm)
    );

    const filteredConnections = connections.filter(
      (connection) =>
        connection.name.toLowerCase().includes(lowercaseTerm) ||
        connection.title.toLowerCase().includes(lowercaseTerm) ||
        connection.company.toLowerCase().includes(lowercaseTerm) ||
        connection.location.toLowerCase().includes(lowercaseTerm)
    );

    const jobsData = [
      {
        id: "1",
        title: "Senior Frontend Developer",
        company: "Google",
        location: "Mountain View, CA",
        type: "Full-time",
        description:
          "Building the next generation of web applications with React and TypeScript",
        tags: ["React", "TypeScript", "Node.js"],
      },
      {
        id: "2",
        title: "Full Stack Engineer",
        company: "Flixlabs",
        location: "Los Gatos, CA",
        type: "Full-time",
        description: "End-to-end development with JavaScript, Python, and AWS",
        tags: ["JavaScript", "Python", "AWS"],
      },
      {
        id: "3",
        title: "React Developer",
        company: "Carbnb",
        location: "San Francisco, CA",
        type: "Contract",
        description: "Frontend development with React, Redux, and GraphQL",
        tags: ["React", "Redux", "GraphQL"],
      },
      {
        id: "4",
        title: "Software Engineer - Machine Learning",
        company: "Openfy",
        location: "San Francisco, CA",
        type: "Full-time",
        description:
          "Machine learning and AI development with Python and TensorFlow",
        tags: ["Python", "TensorFlow", "PyTorch"],
      },
      {
        id: "5",
        title: "DevOps Engineer",
        company: "Microtech Labs",
        location: "Seattle, WA",
        type: "Full-time",
        description: "Infrastructure automation and cloud deployment",
        tags: ["Docker", "Kubernetes", "Azure"],
      },
    ];

    const filteredJobs = jobsData.filter(
      (job) =>
        job.title.toLowerCase().includes(lowercaseTerm) ||
        job.company.toLowerCase().includes(lowercaseTerm) ||
        job.location.toLowerCase().includes(lowercaseTerm) ||
        job.description.toLowerCase().includes(lowercaseTerm) ||
        job.tags.some((tag) => tag.toLowerCase().includes(lowercaseTerm))
    );

    const filteredPeople = conversations
      .filter(
        (conv) =>
          conv.participant.name.toLowerCase().includes(lowercaseTerm) ||
          conv.participant.title.toLowerCase().includes(lowercaseTerm)
      )
      .map((conv) => ({
        id: conv.participant.id,
        name: conv.participant.name,
        title: conv.participant.title,
        avatar: conv.participant.avatar,
        company: "Company",
        location: "Location",
      }));

    const registeredPeople = registeredUsers
      .filter(
        (user) =>
          user.userData.name.toLowerCase().includes(lowercaseTerm) ||
          user.userData.title.toLowerCase().includes(lowercaseTerm) ||
          user.userData.company.toLowerCase().includes(lowercaseTerm) ||
          (user.userData.location &&
            user.userData.location.toLowerCase().includes(lowercaseTerm))
      )
      .map((user, index) => ({
        id: `user-${index}`,
        name: user.userData.name,
        title: user.userData.title,
        avatar: user.userData.avatar,
        company: user.userData.company,
        location: user.userData.location || "Location",
      }));

    const allPeople = [...filteredPeople, ...registeredPeople].filter(
      (person, index, self) =>
        index === self.findIndex((p) => p.name === person.name)
    );

    setSearchResults({
      posts: filteredPosts,
      connections: filteredConnections,
      jobs: filteredJobs,
      people: allPeople,
    });

    setShowSearchResults(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    performSearch(value);
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".search-container")) {
        closeSearchResults();
      }
    };

    if (showSearchResults) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchResults]);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      participant: {
        id: "1",
        name: "Sarah Chen",
        avatar:
          "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Senior Software Engineer at Microsoft",
        online: true,
      },
      messages: [
        {
          id: "1",
          senderId: "1",
          content:
            "Thanks for connecting! I saw your post about AI training - very insightful.",
          timestamp: "2h ago",
          read: false,
        },
        {
          id: "2",
          senderId: "me",
          content:
            "Thank you! I'd love to hear about your experience with microservices at Microsoft.",
          timestamp: "1h ago",
          read: true,
        },
        {
          id: "3",
          senderId: "1",
          content:
            "Would be happy to share! Are you free for a quick call this week?",
          timestamp: "45m ago",
          read: false,
        },
      ],
      lastMessage:
        "Would be happy to share! Are you free for a quick call this week?",
      lastMessageTime: "45m ago",
      unreadCount: 2,
    },
    {
      id: "2",
      participant: {
        id: "2",
        name: "Marcus Johnson",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        title: "Product Manager at Google",
        online: false,
      },
      messages: [
        {
          id: "1",
          senderId: "2",
          content:
            "Great post about AI trends! Really resonated with our product strategy.",
          timestamp: "1d ago",
          read: true,
        },
      ],
      lastMessage:
        "Great post about AI trends! Really resonated with our product strategy.",
      lastMessageTime: "1d ago",
      unreadCount: 0,
    },
    {
      id: "3",
      participant: {
        id: "3",
        name: "Emily Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1614786269829-d24616faf56d?q=80&w=2700&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "UX Design Lead at Airbnb",
        online: true,
      },
      messages: [
        {
          id: "1",
          senderId: "3",
          content:
            "Would love to chat about the intersection of AI and UX design!",
          timestamp: "2d ago",
          read: true,
        },
      ],
      lastMessage:
        "Would love to chat about the intersection of AI and UX design!",
      lastMessageTime: "2d ago",
      unreadCount: 0,
    },
  ]);

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
        {
          id: "2",
          author: {
            name: "Marcus Johnson",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
            title: "Tech Lead",
          },
          content:
            "All three are important, but I'd prioritize building a solid portfolio. Quality over quantity!",
          timePosted: "22h",
          likes: 8,
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
    {
      id: "2",
      author: {
        name: "Sarah Chen",
        title: "Senior Software Engineer",
        avatar:
          "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        company: "Microsoft",
        timePosted: "3h",
        isFollowing: true,
      },
      content:
        "Just completed a major migration to microservices architecture. The journey wasn't easy, but the performance improvements are incredible. Key lessons learned: start small, test everything, and invest heavily in monitoring. Happy to share more details for anyone going through similar challenges.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=300&fit=crop",
      likes: 234,
      comments: [
        {
          id: "1",
          author: {
            name: "David Wilson",
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
            title: "DevOps Engineer",
          },
          content:
            "What monitoring tools did you end up using? We're considering a similar migration.",
          timePosted: "2h",
          likes: 5,
        },
      ],
      shares: 43,
      liked: true,
      reactions: {
        like: 156,
        celebrate: 47,
        support: 31,
      },
    },
    {
      id: "3",
      author: {
        name: "Marcus Johnson",
        title: "Product Manager",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        company: "Google",
        timePosted: "5h",
        isFollowing: false,
      },
      content:
        "AI is reshaping every industry, but the companies that will thrive are those that focus on solving real human problems, not just implementing the latest tech. What are some AI applications you've seen that truly make a difference in people's daily lives?",
      likes: 189,
      comments: [],
      shares: 67,
      liked: false,
      reactions: {
        like: 127,
        celebrate: 34,
        support: 28,
      },
    },
    {
      id: "4",
      author: {
        name: "Emily Rodriguez",
        title: "UX Design Lead",
        avatar:
          "https://images.unsplash.com/photo-1614786269829-d24616faf56d?q=80&w=2700&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        company: "Airbnb",
        timePosted: "8h",
        isFollowing: true,
      },
      content:
        "Excited to announce that our team just won the Design Excellence Award at UX Conference 2025! 🏆 This recognition belongs to every designer who contributed to our accessibility-first approach. Proud of how far we've come in making digital experiences inclusive for everyone.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      likes: 567,
      comments: [
        {
          id: "1",
          author: {
            name: "Alex Thompson",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
            title: "UI Designer",
          },
          content:
            "Congratulations! Well deserved. Your accessibility workshops were game-changing.",
          timePosted: "7h",
          likes: 15,
        },
        {
          id: "2",
          author: {
            name: "Rachel Kim",
            avatar:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
            title: "Product Designer",
          },
          content:
            "Amazing work! Can't wait to see what innovations you bring next.",
          timePosted: "6h",
          likes: 9,
        },
      ],
      shares: 89,
      liked: false,
      reactions: {
        like: 432,
        celebrate: 98,
        support: 37,
      },
    },
    {
      id: "5",
      author: {
        name: "James Park",
        title: "Data Scientist",
        avatar:
          "https://images.unsplash.com/photo-1581382575275-97901c2635b7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        company: "Netflix",
        timePosted: "12h",
        isFollowing: false,
      },
      content:
        "Machine learning model deployment doesn't have to be scary! Here are 5 key principles I've learned after deploying 50+ models in production:\n\n1. Start with simple baselines\n2. Monitor everything (seriously, everything)\n3. Build robust rollback mechanisms\n4. Test with real data distributions\n5. Document your assumptions\n\nWhat would you add to this list?",
      likes: 324,
      comments: [
        {
          id: "1",
          author: {
            name: "Lisa Wang",
            avatar:
              "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face",
            title: "ML Engineer",
          },
          content:
            "Great list! I'd add: Always have a human-in-the-loop validation process for critical decisions.",
          timePosted: "11h",
          likes: 22,
        },
      ],
      shares: 156,
      liked: true,
      reactions: {
        like: 287,
        celebrate: 23,
        support: 14,
      },
    },
    {
      id: "6",
      author: {
        name: "Diana Foster",
        title: "Engineering Manager",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
        company: "Stripe",
        timePosted: "1d",
        isFollowing: true,
      },
      content:
        "Leadership lesson learned the hard way: Your team's burnout is often a reflection of your own boundaries (or lack thereof). Taking care of yourself isn't selfish—it's essential for taking care of your team. Started implementing \"no meeting Fridays\" and the productivity boost has been incredible.",
      likes: 892,
      comments: [
        {
          id: "1",
          author: {
            name: "Mike Chen",
            avatar:
              "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=60&h=60&fit=crop&crop=face",
            title: "Tech Lead",
          },
          content:
            "This is so important. We implemented similar policies and team satisfaction scores went through the roof.",
          timePosted: "23h",
          likes: 34,
        },
        {
          id: "2",
          author: {
            name: "Anna Miller",
            avatar:
              "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=60&h=60&fit=crop&crop=face",
            title: "Senior Manager",
          },
          content:
            "Absolutely agree! Sustainable pace is key to long-term success.",
          timePosted: "22h",
          likes: 18,
        },
      ],
      shares: 234,
      liked: false,
      reactions: {
        like: 678,
        celebrate: 134,
        support: 80,
      },
    },
  ]);

  const [newsItems] = useState<NewsItem[]>([
    {
      id: "1",
      title: "SpaceX loses its third Starship",
      timeAgo: "2h ago",
      readers: "19,357 readers",
    },
    {
      id: "2",
      title: "Retailers brace for tariffs' impact",
      timeAgo: "1h ago",
      readers: "6,835 readers",
    },
    {
      id: "3",
      title: "Amazon-Stellantis project fizzles",
      timeAgo: "2h ago",
      readers: "4,843 readers",
    },
    {
      id: "4",
      title: "Rising rates don't deter homebuyers",
      timeAgo: "2h ago",
      readers: "4,651 readers",
    },
    {
      id: "5",
      title: "GM pivots EV plant to V-8 engines",
      timeAgo: "1h ago",
      readers: "3,917 readers",
    },
    {
      id: "6",
      title: "Tech layoffs continue into 2025",
      timeAgo: "3h ago",
      readers: "12,234 readers",
    },
    {
      id: "7",
      title: "Remote work policies face new challenges",
      timeAgo: "4h ago",
      readers: "8,567 readers",
    },
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "1",
      name: "Alex Thompson",
      title: "Full Stack Developer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      company: "Shopify",
      mutualConnections: 12,
      status: "not_connected",
      location: "Toronto, Canada",
    },
    {
      id: "2",
      name: "Rachel Kim",
      title: "Data Scientist",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      company: "Tesla",
      mutualConnections: 8,
      status: "not_connected",
      location: "Austin, Texas",
    },
    {
      id: "3",
      name: "David Wilson",
      title: "DevOps Engineer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      company: "Docker",
      mutualConnections: 15,
      status: "connected",
      location: "San Francisco, CA",
    },
    {
      id: "4",
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      avatar:
        "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      company: "Microsoft",
      mutualConnections: 23,
      status: "connected",
      location: "Seattle, WA",
    },
    {
      id: "5",
      name: "Marcus Johnson",
      title: "Product Manager",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      company: "Google",
      mutualConnections: 31,
      status: "pending",
      location: "Mountain View, CA",
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);

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

  const handleConnect = (userId: string) => {
    setConnectingUserId(userId);
    setShowConnectModal(true);
  };

  const sendConnectionRequest = () => {
    if (connectingUserId) {
      setConnections(
        connections.map((conn) =>
          conn.id === connectingUserId
            ? { ...conn, status: "pending" as const }
            : conn
        )
      );
      setShowConnectModal(false);
      setConnectingUserId(null);
      setConnectMessage("");
      showToastMessage("Connection request sent!");
    }
  };

  const acceptConnection = (userId: string) => {
    setConnections(
      connections.map((conn) =>
        conn.id === userId ? { ...conn, status: "connected" as const } : conn
      )
    );
  };

  const sendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "me",
        content: messageInput,
        timestamp: "now",
        read: true,
      };

      setConversations(
        conversations.map((conv) =>
          conv.id === selectedConversation
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: messageInput,
                lastMessageTime: "now",
              }
            : conv
        )
      );
      setMessageInput("");
    }
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            reactions: {
              ...post.reactions,
              like: post.liked
                ? post.reactions.like - 1
                : post.reactions.like + 1,
            },
          };
        }
        return post;
      })
    );
  };

  const handleFollow = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            author: {
              ...post.author,
              isFollowing: !post.author.isFollowing,
            },
          };
        }
        return post;
      })
    );
    showToastMessage("Following!");
  };

  const toggleComments = (postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = (postId: string) => {
    if (newComment[postId]?.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          name: currentUser.name,
          avatar: currentUser.avatar,
          title: currentUser.title,
        },
        content: newComment[postId],
        timePosted: "now",
        likes: 0,
      };

      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, comment],
            };
          }
          return post;
        })
      );

      setNewComment((prev) => ({
        ...prev,
        [postId]: "",
      }));
    }
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: {
          name: currentUser.name,
          title: currentUser.title,
          avatar: currentUser.avatar,
          company: currentUser.company,
          timePosted: "now",
        },
        content: newPost,
        likes: 0,
        comments: [],
        shares: 0,
        liked: false,
        reactions: {
          like: 0,
          celebrate: 0,
          support: 0,
        },
      };
      setPosts([post, ...posts]);
      setNewPost("");
      setShowPostModal(false);
    }
  };

  const handleJobApply = (jobTitle: string) => {
    showToastMessage("Please check your email for application confirmation");
  };

  const handleJobSave = (jobTitle: string) => {
    showToastMessage("Job saved to your list");
  };

  // All page components are now imported

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage
          onShowLoginModal={() => setShowLoginModal(true)}
          onShowSignupModal={() => setShowSignupModal(true)}
        />

        {showLoginModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-full overflow-y-auto">
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Sign in
                  </h2>
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        placeholder="Enter your password"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={loginForm.rememberMe}
                        onChange={(e) =>
                          setLoginForm((prev) => ({
                            ...prev,
                            rememberMe: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>

                    {loginError && (
                      <div className="text-red-600 text-sm">{loginError}</div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-2 rounded font-medium hover:bg-blue-800 transition-colors"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                <div className="mt-4 md:mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    New to NetworX?{" "}
                    <button
                      onClick={() => {
                        setShowLoginModal(false);
                        setShowSignupModal(true);
                      }}
                      className="text-blue-700 hover:underline"
                    >
                      Join now
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showSignupModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-full overflow-y-auto">
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Join NetworX
                  </h2>
                  <button
                    onClick={() => setShowSignupModal(false)}
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSignup}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First name *
                        </label>
                        <input
                          type="text"
                          value={signupForm.firstName}
                          onChange={(e) =>
                            setSignupForm((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last name *
                        </label>
                        <input
                          type="text"
                          value={signupForm.lastName}
                          onChange={(e) =>
                            setSignupForm((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={signupForm.email}
                        onChange={(e) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        value={signupForm.password}
                        onChange={(e) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        placeholder="6+ characters"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job title
                      </label>
                      <input
                        type="text"
                        value={signupForm.title}
                        onChange={(e) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        placeholder="Software Engineer, Product Manager, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={signupForm.company}
                        onChange={(e) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        placeholder="Google, Microsoft, etc."
                      />
                    </div>

                    {signupError && (
                      <div className="text-red-600 text-sm">{signupError}</div>
                    )}

                    <button
                      type="submit"
                      className="cursor-pointer w-full bg-blue-700 text-white py-2 rounded font-medium hover:bg-blue-800 transition-colors"
                    >
                      Agree & Join
                    </button>
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Already on NetworX?{" "}
                    <button
                      onClick={() => {
                        setShowSignupModal(false);
                        setShowLoginModal(true);
                      }}
                      className="cursor-pointer text-blue-700 hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

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

    switch (activeTab) {
      case "network":
        return (
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white rounded-lg border border-gray-300 p-4 md:p-6 mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                People you may know
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {connections
                  .filter((conn) => conn.status === "not_connected")
                  .map((connection) => (
                    <div
                      key={connection.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <img
                        src={connection.avatar}
                        alt={connection.name}
                        className="w-16 h-16 rounded-full mx-auto mb-3"
                      />
                      <h3 className="font-semibold text-center text-gray-900 text-sm md:text-base">
                        {connection.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 text-center">
                        {connection.title}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600 text-center">
                        {connection.company}
                      </p>
                      <p className="text-xs text-gray-500 text-center mt-1">
                        {connection.mutualConnections} mutual connections
                      </p>
                      <button
                        onClick={() => handleConnect(connection.id)}
                        className="cursor-pointer w-full mt-3 bg-blue-600 text-white py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Connect
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                Pending Requests
              </h2>
              <div className="space-y-4">
                {connections
                  .filter((conn) => conn.status === "pending")
                  .map((connection) => (
                    <div
                      key={connection.id}
                      className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <img
                        src={connection.avatar}
                        alt={connection.name}
                        className="w-12 h-12 rounded-full  mx-auto sm:mx-0"
                      />
                      <div className="flex-1 ml-3 text-center sm:text-left">
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                          {connection.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          {connection.title} at {connection.company}
                        </p>
                        <p className="text-xs text-gray-500">
                          {connection.mutualConnections} mutual connections
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={() => acceptConnection(connection.id)}
                          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => showToastMessage("User ignored!")}
                          className="cursor-pointer bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-400"
                        >
                          Ignore
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );
      case "jobs":
        return (
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
              <div className="p-4 md:p-6 border-b border-gray-200 bg-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      Recommended for you
                    </h2>
                    <p className="text-sm md:text-base text-gray-600">
                      Based on your profile and search history
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {[
                  {
                    title: "Senior Frontend Developer",
                    company: "Google",
                    location: "Mountain View, CA",
                    type: "Full-time",
                    salary: "$150k - $200k",
                    posted: "2 days ago",
                    applicants: "47 applicants",
                    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=64&h=64&fit=crop",
                    tags: ["React", "TypeScript", "Node.js"],
                    rating: 4.5,
                    promoted: true,
                  },
                  {
                    title: "Full Stack Engineer",
                    company: "Flixlabs",
                    location: "Los Gatos, CA",
                    type: "Full-time",
                    salary: "$140k - $180k",
                    posted: "1 day ago",
                    applicants: "23 applicants",
                    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop",
                    tags: ["JavaScript", "Python", "AWS"],
                    rating: 4.3,
                    promoted: true,
                  },
                  {
                    title: "React Developer",
                    company: "Carbnb",
                    location: "San Francisco, CA",
                    type: "Contract",
                    salary: "$120k - $160k",
                    posted: "3 days ago",
                    applicants: "89 applicants",
                    logo: "https://images.unsplash.com/photo-1611488006001-eb993d4d2ec4?q=80&w=2863&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    tags: ["React", "Redux", "GraphQL"],
                    rating: 4.7,
                    promoted: true,
                  },
                  {
                    title: "Software Engineer - Machine Learning",
                    company: "Openfy",
                    location: "San Francisco, CA",
                    type: "Full-time",
                    salary: "$180k - $250k",
                    posted: "5 hours ago",
                    applicants: "12 applicants",
                    logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=64&h=64&fit=crop",
                    tags: ["Python", "TensorFlow", "PyTorch"],
                    rating: 4.9,
                    promoted: true,
                  },
                  {
                    title: "DevOps Engineer",
                    company: "Microtech Labs",
                    location: "Seattle, WA",
                    type: "Full-time",
                    salary: "$130k - $170k",
                    posted: "1 week ago",
                    applicants: "156 applicants",
                    logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=64&h=64&fit=crop",
                    tags: ["Docker", "Kubernetes", "Azure"],
                    rating: 4.4,
                    promoted: true,
                  },
                ].map((job, index) => (
                  <div
                    key={index}
                    className="p-4  md:p-6 hover:bg-gray-50 transition-colors relative"
                  >
                    {job.promoted && (
                      <div className="absolute top-2 md:top-4 right-2 md:right-4">
                        <span className="text-black text-xs font-medium">
                          Promoted
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className=" w-12 h-12 md:w-16 md:h-16 rounded-lg border border-gray-200 mx-auto sm:mx-0 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0 md:ml-4 lg:ml-6 xl:ml-6 2xl:ml-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                          <div className=" flex-1 text-center sm:text-left">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                              {job.title}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
                              <p className="text-sm md:text-base text-gray-700 font-medium">
                                {job.company}
                              </p>
                              <div className="flex items-center justify-center sm:justify-start">
                                <Star
                                  size={14}
                                  className="text-yellow-400 fill-current"
                                />
                                <span className="text-xs md:text-sm text-gray-600 ml-1">
                                  {job.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs md:text-sm text-gray-600 mb-3 text-center sm:text-left">
                          <div className="flex items-center justify-center sm:justify-start">
                            <MapPin size={14} className="mr-1 flex-shrink-0" />
                            <span>{job.location}</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs md:text-sm text-gray-600 mb-3 text-center sm:text-left">
                          <span className="font-medium text-gray-900">
                            {job.salary}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span>{job.posted}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{job.applicants}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                          {job.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 cursor-pointer"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0">
                          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                            <button
                              onClick={() => handleJobApply(job.title)}
                              className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto"
                            >
                              Apply
                            </button>
                            <button
                              onClick={() => handleJobSave(job.title)}
                              className="cursor-pointer border border-blue-600 text-blue-600 px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors w-full sm:w-auto"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 md:p-6 text-center border-t border-gray-200">
                <button
                  onClick={() => showToastMessage("No more jobs found")}
                  className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                >
                  Show more jobs
                </button>
              </div>
            </div>
          </div>
        );
      case "messages":
        return (
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white rounded-lg border border-gray-300 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                Messages
              </h2>
              <div className="space-y-4">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                      conv.unreadCount > 0 ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setShowMessagingModal(true)}
                  >
                    <div className="relative">
                      <img
                        src={conv.participant.avatar}
                        alt={conv.participant.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {conv.participant.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-medium ${
                          conv.unreadCount > 0
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {conv.participant.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          conv.unreadCount > 0
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {conv.lastMessage}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">
                        {conv.lastMessageTime}
                      </span>
                      {conv.unreadCount > 0 && (
                        <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1 ml-auto">
                          {conv.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white rounded-lg border border-gray-300 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                Notifications
              </h2>
              <div className="space-y-4">
                {[
                  {
                    type: "like",
                    user: "Sarah Chen",
                    action: "liked your post",
                    time: "1h ago",
                    avatar:
                      "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    type: "comment",
                    user: "Marcus Johnson",
                    action: "commented on your post",
                    time: "3h ago",
                    avatar:
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                  },
                  {
                    type: "follow",
                    user: "Emily Rodriguez",
                    action: "started following you",
                    time: "1d ago",
                    avatar:
                      "https://images.unsplash.com/photo-1614786269829-d24616faf56d?q=80&w=2700&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    type: "share",
                    user: "James Park",
                    action: "shared your post",
                    time: "2d ago",
                    avatar:
                      "https://images.unsplash.com/photo-1581382575275-97901c2635b7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                ].map((notif, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <img
                      src={notif.avatar}
                      alt={notif.user}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{notif.user}</span>{" "}
                        {notif.action}
                      </p>
                      <span className="text-xs text-gray-500">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4 relative">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face"
                  alt="Premium"
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                    80% of professionals find networking key to career success.
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-3">
                    Grow your connections with Premium.
                  </p>
                  <button
                    onClick={() => showToastMessage("Please check your email!")}
                    className="cursor-pointer bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-700 transition-colors"
                  >
                    Try Premium
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={currentUser.avatar}
                  alt="Your avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <button
                  onClick={() => setShowPostModal(true)}
                  className="cursor-text flex-1 text-left px-4 py-3 border border-gray-400 rounded-full text-gray-700 text-sm hover:bg-gray-50 transition-colors font-medium"
                >
                  Start a post
                </button>
              </div>

              <div className="flex items-center space-x-1 overflow-x-auto">
                <button
                  onClick={() => showToastMessage("Feature coming soon!")}
                  className="cursor-pointer flex items-center space-x-2 px-3 md:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium whitespace-nowrap"
                >
                  <Video size={20} className="text-blue-600" />
                  <span className="hidden sm:inline">Video</span>
                </button>
                <button
                  onClick={() => showToastMessage("Feature coming soon!")}
                  className="cursor-pointer flex items-center space-x-2 px-3 md:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium whitespace-nowrap"
                >
                  <Camera size={20} className="text-green-600" />
                  <span className="hidden sm:inline">Photo</span>
                </button>
                <button
                  onClick={() => showToastMessage("Feature coming soon!")}
                  className="cursor-pointer flex items-center space-x-2 px-3 md:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium whitespace-nowrap"
                >
                  <FileText size={20} className="text-orange-600" />
                  <span className="hidden sm:inline">Write article</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="h-px bg-gray-300 flex-1"></div>
              <div className="px-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Feed</span>
                  <button className=" font-medium text-gray-900 flex items-center">
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </div>
              </div>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg border border-gray-300"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 min-w-0 flex-1">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 object-cover md:w-12 md:h-12 rounded-full flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                            <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                              {post.author.name}
                            </h3>
                            <span className="text-gray-500 hidden sm:inline">
                              •
                            </span>
                            <span className="text-xs md:text-sm text-gray-500">
                              {post.author.timePosted}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">
                            {post.author.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {post.author.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {!post.author.isFollowing &&
                          post.author.name !== currentUser.name && (
                            <button
                              onClick={() => handleFollow(post.id)}
                              className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                            >
                              <Plus size={16} className="mr-1" />
                              <span className="hidden sm:inline">Follow</span>
                            </button>
                          )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-line">
                        {post.content}
                      </p>
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post content"
                          className="mt-3 w-full rounded border border-gray-200 cursor-pointer hover:opacity-95"
                        />
                      )}
                    </div>

                    {post.likes > 0 && (
                      <div className="flex items-center justify-between py-2 text-xs text-gray-600">
                        <div className="flex items-center space-x-1 cursor-pointer hover:underline">
                          <div className="flex -space-x-1">
                            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                              <ThumbsUp
                                size={8}
                                className="text-white"
                                fill="white"
                              />
                            </div>
                            <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">👏</span>
                            </div>
                            <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">❤️</span>
                            </div>
                          </div>
                          <span className="ml-2">{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          {post.comments.length > 0 && (
                            <button
                              onClick={() => toggleComments(post.id)}
                              className="cursor-pointer hover:underline"
                            >
                              {post.comments.length} comment
                              {post.comments.length !== 1 ? "s" : ""}
                            </button>
                          )}
                          {post.shares > 0 && (
                            <span>{post.shares} reposts</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 px-2 py-1">
                    <div className="grid grid-cols-4 gap-1">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`cursor-pointer flex items-center justify-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded hover:bg-gray-100 transition-colors text-xs md:text-sm font-medium ${
                          post.liked ? "text-blue-600" : "text-gray-600"
                        }`}
                      >
                        <ThumbsUp
                          size={16}
                          fill={post.liked ? "currentColor" : "none"}
                        />
                        <span className="hidden sm:inline">Like</span>
                      </button>

                      <button
                        onClick={() => toggleComments(post.id)}
                        className="cursor-pointer flex items-center justify-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded hover:bg-gray-100 transition-colors text-xs md:text-sm font-medium text-gray-600"
                      >
                        <MessageCircle size={16} />
                        <span className="hidden sm:inline">Comment</span>
                      </button>

                      <button
                        onClick={() => showToastMessage("Feature coming soon!")}
                        className="cursor-pointer flex items-center justify-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded hover:bg-gray-100 transition-colors text-xs md:text-sm font-medium text-gray-600"
                      >
                        <Share size={16} />
                        <span className="hidden sm:inline">Repost</span>
                      </button>

                      <button
                        onClick={() => setShowMessagingModal(true)}
                        className="cursor-pointer flex items-center justify-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded hover:bg-gray-100 transition-colors text-xs md:text-sm font-medium text-gray-600"
                      >
                        <Send size={16} />
                        <span className="hidden sm:inline">Send</span>
                      </button>
                    </div>
                  </div>

                  {showComments[post.id] && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <div className="space-y-3 mb-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <img
                              src={comment.author.avatar}
                              alt={comment.author.name}
                              className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="bg-white rounded-lg p-3">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
                                  <span className="font-medium text-sm text-gray-900 truncate">
                                    {comment.author.name}
                                  </span>
                                  <span className="text-xs text-gray-500 truncate">
                                    {comment.author.title}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-800">
                                  {comment.content}
                                </p>
                              </div>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <button
                                  onClick={() => showToastMessage("Liked!")}
                                  className="cursor-pointer hover:text-blue-600"
                                >
                                  Like
                                </button>
                                <span>{comment.timePosted}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-3">
                        <img
                          src={currentUser.avatar}
                          alt="You"
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment[post.id] || ""}
                            onChange={(e) =>
                              setNewComment((prev) => ({
                                ...prev,
                                [post.id]: e.target.value,
                              }))
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleAddComment(post.id)
                            }
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            disabled={!newComment[post.id]?.trim()}
                            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  const NavItem = ({
    icon: Icon,
    label,
    tabKey,
    count,
  }: {
    icon: LucideIcon;
    label: string;
    tabKey: string;
    count?: number;
  }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`cursor-pointer flex flex-col items-center px-3 py-2 text-xs font-normal relative transition-colors ${
        activeTab === tabKey
          ? "text-gray-900"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      <div className="relative">
        <Icon size={24} strokeWidth={1.5} />
        {count && count > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
            style={{ fontSize: "10px" }}
          >
            {count}
          </span>
        )}
      </div>
      <span className="mt-1">{label}</span>
      {activeTab === tabKey && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-stone-200">
      <header className="bg-white border-b border-gray-300 py-1 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">NX</span>
              </div>
              <div className="relative ml-2 hidden lg:block search-container">
                <Search
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-8 pr-4 py-1.5 w-72 bg-gray-100 rounded text-sm border-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />

                {showSearchResults && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                    {searchResults.people.length > 0 && (
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          People
                        </h3>
                        {searchResults.people
                          .slice(0, 3)
                          .map((person, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                showToastMessage(
                                  `Viewing ${person.name}'s profile`,
                                  "info"
                                );
                                closeSearchResults();
                              }}
                              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <img
                                src={person.avatar}
                                alt={person.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {person.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {person.title}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {searchResults.posts.length > 0 && (
                      <div className="p-3 border-t border-gray-100">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Posts
                        </h3>
                        {searchResults.posts.slice(0, 2).map((post) => (
                          <div
                            key={post.id}
                            onClick={() => {
                              showToastMessage(
                                `Opening post by ${post.author.name}`,
                                "info"
                              );
                              closeSearchResults();
                            }}
                            className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-sm font-medium text-gray-900">
                                {post.author.name}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 truncate">
                              {post.content.slice(0, 60)}...
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {searchResults.jobs.length > 0 && (
                      <div className="p-3 border-t border-gray-100">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Jobs
                        </h3>
                        {searchResults.jobs.slice(0, 2).map((job) => (
                          <div
                            key={job.id}
                            onClick={() => {
                              showToastMessage(
                                `Opening job: ${job.title} at ${job.company}`,
                                "info"
                              );
                              closeSearchResults();
                            }}
                            className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <p className="text-sm font-medium text-gray-900">
                              {job.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {job.company}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {searchResults.connections.length > 0 && (
                      <div className="p-3 border-t border-gray-100">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Connections
                        </h3>
                        {searchResults.connections
                          .slice(0, 2)
                          .map((connection) => (
                            <div
                              key={connection.id}
                              onClick={() => {
                                showToastMessage(
                                  `Viewing ${connection.name}'s profile`,
                                  "info"
                                );
                                closeSearchResults();
                              }}
                              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <img
                                src={connection.avatar}
                                alt={connection.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {connection.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {connection.title} at {connection.company}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {searchResults.people.length === 0 &&
                      searchResults.posts.length === 0 &&
                      searchResults.jobs.length === 0 &&
                      searchResults.connections.length === 0 && (
                        <div className="p-4 text-center">
                          <p className="text-sm text-gray-500">
                            No results found for &quot;{searchTerm}&quot;
                          </p>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>

            <nav className="hidden lg:flex items-center">
              <NavItem icon={Home} label="Home" tabKey="home" />
              <NavItem
                icon={Users}
                label="Network"
                tabKey="network"
                count={5}
              />
              <NavItem icon={Briefcase} label="Jobs" tabKey="jobs" />
              <button
                onClick={() => setShowMessagingModal(true)}
                className={`cursor-pointer flex flex-col items-center px-3 py-2 text-xs font-normal relative transition-colors ${
                  activeTab === "messages"
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="relative">
                  <MessageSquare size={24} strokeWidth={1.5} />
                  <span
                    className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
                    style={{ fontSize: "10px" }}
                  >
                    3
                  </span>
                </div>
                <span className="mt-1">Messaging</span>
              </button>
              <NavItem
                icon={Bell}
                label="Notifications"
                tabKey="notifications"
                count={8}
              />
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="cursor-pointer flex flex-col items-center px-3 py-2 text-xs font-normal text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt="Me"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="flex items-center mt-1">
                    <span>Me</span>
                    <ChevronDown size={12} className="ml-0.5" />
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {currentUser.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {currentUser.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          setActiveTab("profile");
                          setShowProfileMenu(false);
                        }}
                        className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <UserIcon size={16} className="mr-3" />
                        View Profile
                      </button>
                      <button
                        onClick={() =>
                          showToastMessage("Settings & Privacy coming soon!")
                        }
                        className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Settings size={16} className="mr-3" />
                        Settings & Privacy
                      </button>
                      <button
                        onClick={() => showToastMessage("Help coming soon!")}
                        className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <HelpCircle size={16} className="mr-3" />
                        Help
                      </button>
                    </div>

                    <div className="border-t border-gray-200 py-2">
                      <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="border-l border-gray-300 ml-3 pl-3">
                <div
                  onClick={() =>
                    showToastMessage("Please check back soon!", "info")
                  }
                  className="flex flex-col items-center px-2 py-2 text-xs font-normal text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  <div className="grid grid-cols-3 gap-0.5 w-6 h-6">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-gray-600 rounded-sm"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="ml-4 text-xs">
                <span
                  onClick={() => showToastMessage("Please check your email!")}
                  className="text-amber-600 hover:underline cursor-pointer font-medium"
                >
                  Reactivate Premium: 50% Off
                </span>
              </div>
            </nav>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="cursor-pointer lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="lg:hidden pb-3"></div>
        </div>

        {showMobileMenu && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-2">
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab("home");
                  setShowMobileMenu(false);
                }}
                className={`cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 ${
                  activeTab === "home"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Home size={20} />
                <span>Home</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("network");
                  setShowMobileMenu(false);
                }}
                className={`cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 ${
                  activeTab === "network"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Users size={20} />
                <span>Network</span>
                <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-2 py-1">
                  5
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("jobs");
                  setShowMobileMenu(false);
                }}
                className={`cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 ${
                  activeTab === "jobs"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Briefcase size={20} />
                <span>Jobs</span>
              </button>
              <button
                onClick={() => {
                  setShowMessagingModal(true);
                  setShowMobileMenu(false);
                }}
                className="cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 text-gray-700 hover:bg-gray-50"
              >
                <MessageSquare size={20} />
                <span>Messaging</span>
                <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-2 py-1">
                  3
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("notifications");
                  setShowMobileMenu(false);
                }}
                className={`cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 ${
                  activeTab === "notifications"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Bell size={20} />
                <span>Notifications</span>
                <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-2 py-1">
                  8
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("profile");
                  setShowMobileMenu(false);
                }}
                className={`cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 ${
                  activeTab === "profile"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-5 h-5 rounded-full"
                />
                <span>Profile</span>
              </button>
              <div className="border-t border-gray-200 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="cursor-pointer w-full text-left px-4 py-3 flex items-center space-x-3 text-gray-700 hover:bg-gray-50"
                >
                  <LogOut size={20} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {activeTab !== "profile" && (
            <div className="col-span-12 lg:hidden mb-4">
              <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
                <div className="relative">
                  <div
                    className="h-16 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=100&fit=crop)",
                    }}
                  ></div>
                  <img
                    src={currentUser.avatar}
                    alt="Profile"
                    className="w-16 h-16 rounded-full absolute -bottom-8 left-4 border-2 border-white cursor-pointer hover:opacity-80 object-cover"
                    onClick={() => setActiveTab("profile")}
                  />
                </div>

                <div className="pt-10 pb-4 px-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h2
                        className="text-lg font-semibold text-gray-900 hover:underline cursor-pointer truncate"
                        onClick={() => setActiveTab("profile")}
                      >
                        {currentUser.name}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1 truncate">
                        {currentUser.title}
                      </p>

                      <div className="flex items-center mt-1 text-xs text-blue-600">
                        <Building size={12} className="mr-1 flex-shrink-0" />
                        <span className="truncate">{currentUser.company}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab("profile")}
                      className="cursor-pointer ml-3 text-blue-600 hover:text-blue-700 text-sm font-medium flex-shrink-0"
                    >
                      View Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-blue-600">
                        {profileViews}
                      </div>
                      <div className="text-xs text-gray-600">
                        Profile viewers
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-blue-600">
                        {postImpressions}
                      </div>
                      <div className="text-xs text-gray-600">
                        Post impressions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "profile" && (
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-white rounded-lg border border-gray-300 overflow-hidden mb-4">
                <div className="relative">
                  <div
                    className="h-16 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=100&fit=crop)",
                    }}
                  ></div>
                  <img
                    src={currentUser.avatar}
                    alt="Profile"
                    className="w-16 h-16 rounded-full absolute -bottom-8 left-4 border-2 border-white cursor-pointer hover:opacity-80 object-cover"
                    onClick={() => setActiveTab("profile")}
                  />
                </div>

                <div className="pt-12 pb-4 px-4 text-center border-b border-gray-200">
                  <h2
                    className="text-base font-semibold text-gray-900 hover:underline cursor-pointer"
                    onClick={() => setActiveTab("profile")}
                  >
                    {currentUser.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {currentUser.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {currentUser.location}
                  </p>
                  <div className="flex items-center justify-center mt-2 text-xs text-blue-600">
                    <Building size={12} className="mr-1" />
                    <span>{currentUser.company}</span>
                  </div>
                </div>

                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex justify-between items-center text-xs mb-2  hover:bg-gray-50 p-1 rounded">
                    <span className="text-gray-600">Profile viewers</span>
                    <span className="text-blue-600 font-semibold">
                      {profileViews}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs  hover:bg-gray-50 p-1 rounded">
                    <span className="text-gray-600">Post impressions</span>
                    <span className="text-blue-600 font-semibold">
                      {postImpressions}
                    </span>
                  </div>
                </div>

                <div className="px-4 py-3">
                  <p className="text-xs text-gray-600 mb-2">
                    Grow your business faster
                  </p>
                  <div className="flex items-center text-xs cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <div className="w-4 h-3 bg-yellow-500 rounded-sm mr-2"></div>
                    <span
                      onClick={() => showToastMessage("Check your email!")}
                      className="text-gray-900 font-medium hover:underline"
                    >
                      Try Premium Page for $0
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
                <div className="relative">
                  <div
                    className="h-10 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                  ></div>

                  <img
                    src="https://plus.unsplash.com/premium_photo-1708368307399-d894bb2467b6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={currentUser.company}
                    className="w-12 h-12 rounded-lg absolute -bottom-6 left-4 border-2 border-white object-cover"
                  />
                </div>

                <div className="pt-8 pb-4 px-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {currentUser.company}
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between hover:bg-gray-50 p-1 rounded">
                      <span className="text-gray-600">Activity</span>
                      <span className="text-blue-600 font-semibold">0</span>
                    </div>
                    <div className="flex justify-between  hover:bg-gray-50 p-1 rounded">
                      <span className="text-gray-600">Page visitors</span>
                      <span className="text-blue-600 font-semibold">1</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">
                      See visitor analytics
                    </p>
                    <div
                      onClick={() => showToastMessage("Feature coming soon!")}
                      className="flex items-center text-xs text-gray-600 hover:text-blue-600 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    >
                      <Info size={12} className="mr-1" />
                      <span>Advertise on NetworX</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-300 overflow-hidden my-4">
                <div className="p-3">
                  <div className="space-y-1">
                    <button
                      onClick={() =>
                        showToastMessage(
                          "Saved items feature coming soon!",
                          "info"
                        )
                      }
                      className="cursor-pointer w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Bookmark size={16} className="text-gray-600" />
                      <span className="font-medium">Saved items</span>
                    </button>

                    <button
                      onClick={() =>
                        showToastMessage("Groups feature coming soon!", "info")
                      }
                      className="cursor-pointer w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Users size={16} className="text-gray-600" />
                      <span className="font-medium">Groups</span>
                    </button>

                    <button
                      onClick={() =>
                        showToastMessage(
                          "Newsletters feature coming soon!",
                          "info"
                        )
                      }
                      className="cursor-pointer w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <FileText size={16} className="text-gray-600" />
                      <span className="font-medium">Newsletters</span>
                    </button>

                    <button
                      onClick={() =>
                        showToastMessage("Events feature coming soon!", "info")
                      }
                      className="cursor-pointer w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Calendar size={16} className="text-gray-600" />
                      <span className="font-medium">Events</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {renderContent()}

          {activeTab !== "profile" && (
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md p-6 mb-4 transition-shadow duration-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        NetworX News
                      </h3>
                      <p className="text-sm text-gray-500">Latest updates</p>
                    </div>
                  </div>

                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Info size={18} className="text-gray-400" />
                  </button>
                </div>

                <div className="flex items-center space-x-2 mb-6">
                  <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                    Top Stories
                  </span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="space-y-3">
                  {newsItems.slice(0, 5).map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => showToastMessage("Feature coming soon!")}
                      className="group cursor-pointer p-4 -m-2 rounded-xl hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                          <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-600">
                            {index + 1}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-700 leading-relaxed mb-2 transition-colors">
                            {item.title}
                          </h4>

                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{item.timeAgo}</span>
                            <span>•</span>
                            <span>{item.readers}</span>
                          </div>
                        </div>

                        <ChevronRight size={16} className="text-gray-300" />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => showToastMessage("Feature coming soon!")}
                  className="cursor-pointer w-full mt-6 py-3 px-4 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-150 flex items-center justify-center space-x-2"
                >
                  <span>Show more</span>
                  <ChevronDown size={14} />
                </button>
              </div>
              <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Today's puzzle
                </h3>
                <div
                  onClick={() => showToastMessage("Puzzle sent to your email!")}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                    <div className="text-orange-600 font-bold">Z</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      Zip - a quick brain teaser
                    </h4>
                    <p className="text-xs text-gray-600">
                      Solve in 60s or less!
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      15 connections played
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Ad</div>
                <div className="bg-white rounded-lg border border-gray-300 p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={currentUser.avatar}
                      alt="Premium"
                      className="w-16 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser.name.split(" ")[0]}, enjoy 50% off 2 months
                        of Premium
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMessagingModal(true)}
                    className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Messaging
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {showMessagingModal && (
        <div className="fixed inset-0 h-full lg:bottom-0 lg:top-auto lg:right-6 lg:left-auto w-full lg:w-96 lg:max-w-sm bg-white lg:rounded-t-lg shadow-2xl border-t lg:border border-gray-300 z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-2">
              {selectedConversation && (
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                >
                  <ChevronDown
                    size={16}
                    className="text-gray-500 transform rotate-90"
                  />
                </button>
              )}
              <h3 className="font-semibold text-gray-900 truncate">
                {selectedConversation
                  ? conversations.find((c) => c.id === selectedConversation)
                      ?.participant.name
                  : "Messaging"}
              </h3>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={() => {
                  setShowMessagingModal(false);
                  setSelectedConversation(null);
                }}
                className="cursor-pointer p-1 hover:bg-gray-100 rounded"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
          </div>

          {!selectedConversation ? (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className="flex items-center space-x-3 p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={conv.participant.avatar}
                        alt={conv.participant.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {conv.participant.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4
                          className={`text-sm font-medium truncate ${
                            conv.unreadCount > 0
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {conv.participant.name}
                        </h4>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {conv.participant.title}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p
                          className={`text-sm truncate pr-2 ${
                            conv.unreadCount > 0
                              ? "text-gray-900 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {conv.lastMessage}
                        </p>
                        {conv.unreadCount > 0 && (
                          <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                            {conv.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      conversations.find((c) => c.id === selectedConversation)
                        ?.participant.avatar
                    }
                    alt=""
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {
                        conversations.find((c) => c.id === selectedConversation)
                          ?.participant.name
                      }
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {
                        conversations.find((c) => c.id === selectedConversation)
                          ?.participant.title
                      }
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    {conversations.find((c) => c.id === selectedConversation)
                      ?.participant.online && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                    <span className="text-xs text-gray-500">
                      {conversations.find((c) => c.id === selectedConversation)
                        ?.participant.online
                        ? "Online"
                        : "Offline"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversations
                  .find((c) => c.id === selectedConversation)
                  ?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="max-w-xs sm:max-w-sm lg:max-w-xs">
                        {message.senderId !== "me" && (
                          <div className="flex items-center space-x-2 mb-1">
                            <img
                              src={
                                conversations.find(
                                  (c) => c.id === selectedConversation
                                )?.participant.avatar
                              }
                              alt=""
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-xs text-gray-500 truncate">
                              {
                                conversations.find(
                                  (c) => c.id === selectedConversation
                                )?.participant.name
                              }
                            </span>
                          </div>
                        )}
                        <div
                          className={`px-3 py-2 rounded-lg text-sm ${
                            message.senderId === "me"
                              ? "bg-blue-600 text-white rounded-br-sm"
                              : "bg-gray-200 text-gray-900 rounded-bl-sm"
                          }`}
                        >
                          <p className="leading-relaxed break-words">
                            {message.content}
                          </p>
                        </div>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === "me"
                              ? "text-right text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Write a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!messageInput.trim()}
                    className="cursor-pointer bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {showConnectModal && connectingUserId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Connect with{" "}
                  {connections.find((c) => c.id === connectingUserId)?.name}
                </h2>
                <button
                  onClick={() => setShowConnectModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 md:mb-6">
                <img
                  src={
                    connections.find((c) => c.id === connectingUserId)?.avatar
                  }
                  alt=""
                  className="w-16 h-16 rounded-full mx-auto sm:mx-0"
                />
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-gray-900">
                    {connections.find((c) => c.id === connectingUserId)?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {connections.find((c) => c.id === connectingUserId)?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {
                      connections.find((c) => c.id === connectingUserId)
                        ?.company
                    }
                  </p>
                </div>
              </div>

              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a note (optional)
                </label>
                <textarea
                  value={connectMessage}
                  onChange={(e) => setConnectMessage(e.target.value)}
                  placeholder="Hi [Name], I'd like to connect with you on NetworX."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
                  rows={3}
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setShowConnectModal(false)}
                  className="cursor-pointer flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={sendConnectionRequest}
                  className="cursor-pointer flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Send request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create a post
                </h3>
                <button
                  onClick={() => setShowPostModal(false)}
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={currentUser.avatar}
                  alt="Your avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {currentUser.name}
                  </p>
                </div>
              </div>

              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What do you want to talk about?"
                className="w-full h-32 p-2 border-none resize-none focus:ring-0 text-gray-900 placeholder-gray-500 text-base"
                autoFocus
              />

              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => showToastMessage("Feature coming soon!")}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Camera size={20} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => showToastMessage("Feature coming soon!")}
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Video size={20} className="text-gray-600" />
                  </button>
                </div>

                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition-colors w-full sm:w-auto ${
                    newPost.trim()
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div
          className={`fixed top-20 left-4 right-4 sm:top-20 sm:right-6 sm:left-auto sm:w-auto px-4 md:px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3 animate-slide-in ${
            toastType === "success"
              ? "bg-green-600 text-white"
              : toastType === "info"
              ? "bg-blue-600 text-white"
              : toastType === "warning"
              ? "bg-yellow-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              toastType === "success"
                ? "bg-green-300"
                : toastType === "info"
                ? "bg-blue-300"
                : toastType === "warning"
                ? "bg-yellow-300"
                : "bg-red-300"
            }`}
          ></div>
          <span className="font-medium text-sm md:text-base">
            {toastMessage}
          </span>
          <button
            onClick={() => setShowToast(false)}
            className={`cursor-pointer hover:text-white ${
              toastType === "success"
                ? "text-green-200"
                : toastType === "info"
                ? "text-blue-200"
                : toastType === "warning"
                ? "text-yellow-200"
                : "text-red-200"
            }`}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
