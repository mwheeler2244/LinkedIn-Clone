export interface Post {
  id: string;
  author: {
    name: string;
    title: string;
    avatar: string;
    company: string;
    timePosted: string;
    isFollowing?: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  liked: boolean;
  reactions: {
    like: number;
    celebrate: number;
    support: number;
  };
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  content: string;
  timePosted: string;
  likes: number;
}

export interface NewsItem {
  id: string;
  title: string;
  timeAgo: string;
  readers: string;
}

export interface Connection {
  id: string;
  name: string;
  title: string;
  avatar: string;
  company: string;
  mutualConnections: number;
  status: "connected" | "pending" | "not_connected";
  location: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    online: boolean;
  };
  messages: Message[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface User {
  name: string;
  email: string;
  title: string;
  company: string;
  avatar: string;
  about: string;
  location?: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    duration: string;
  }>;
  skills: string[];
  connections: number;
}

export interface StoredUser {
  email: string;
  password: string;
  userData: User;
}
