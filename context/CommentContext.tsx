import React, { createContext, useContext, useState } from 'react';
//import { Comment } from '@/types';

interface Comment {
  id: string;
  username: string;
  question: string;
  timestamp: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  response: string;
  timestamp: string;
  isPrivate: boolean;
}

interface CommentContextType {
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'replies'>) => void; 
  addReply: (commentId: string, response: string, isPrivate: boolean) => void; 
}


const defaultContextValue: CommentContextType = {
    comments: [],
    addComment: () => {
      throw new Error('addComment function not implemented.');
    },
    addReply: () => {
      throw new Error('addReply function not implemented.');
    },
  };
  
const CommentContext = createContext<CommentContextType>(defaultContextValue);

export function CommentProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'John Doe',
      question: 'Does this come in different sizes?',
      timestamp: '2024-03-15T10:00:00Z',
      replies: [],
    },
    {
      id: '2',
      username: 'Jane Smith',
      question: 'What material is this made of?',
      timestamp: '2024-03-14T15:30:00Z',
      replies: [
        {
          id: '1',
          response: 'This product is made of premium quality materials that ensure durability and comfort.',
          timestamp: '2024-03-14T16:00:00Z',
          isPrivate: false
        }
      ],
    }
  ]);

  const addComment = (comment: Omit<Comment, 'id' | 'replies'>) => {
    setComments(prev => [...prev, {
      ...comment,
      id: Date.now().toString(),
      replies: []
    }]);
  };

  const addReply = (commentId: string, response: string, isPrivate: boolean) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, {
            id: Date.now().toString(),
            response,
            timestamp: new Date().toISOString(),
            isPrivate,
          }]
        };
      }
      return comment;
    }));
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, addReply }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
}