import React, { useState } from 'react';
import { MessageCircle, Flag, Send, Lock, Unlock } from 'lucide-react';
import { useComments } from '@/context/CommentContext';

export default function Comments() {
  const { comments, addComment, addReply } = useComments();
  const [newQuestion, setNewQuestion] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isPrivateReply, setIsPrivateReply] = useState(false); // Cevap için isPrivate kontrolü
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 6;

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    addComment({
      username: 'Guest User',
      question: newQuestion,
      timestamp: new Date().toISOString(),
    });
    setNewQuestion('');
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim()) return;
    addReply(commentId, replyText, isPrivateReply);
    setReplyText('');
    setReplyingTo(null);
    setIsPrivateReply(false);
  };

  const visibleComments = comments; // Sorulara isPrivate kontrolü uygulanmıyor
  const paginatedComments = visibleComments.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <div className="bg-white rounded-xl max-w-4xl mx-auto overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600">
          <h2 className="text-lg font-semibold text-white">Questions & Answers</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmitQuestion} className="mb-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Ask a question about this product..."
                  className="flex-1 p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  Ask Question
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-6 divide-y divide-orange-100">
            {paginatedComments.map((comment) => (
              <div key={comment.id} className="pt-6 first:pt-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">{comment.username}</h3>
                    <p className="text-sm text-gray-600 mt-1">{comment.question}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Reply
                      </button>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </div>

                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className={`ml-8 mt-4 p-4 rounded-lg border-l-4 ${
                      reply.isPrivate
                        ? 'bg-gray-100 border-gray-400'
                        : 'bg-orange-50 border-orange-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs bg-orange-500 text-white rounded-full">Seller</span>
                      <span className="text-xs text-gray-500">
                        {new Date(reply.timestamp).toLocaleDateString()}
                      </span>
                      {reply.isPrivate && (
                        <span className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          <Lock className="w-3 h-3" /> Private
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{reply.response}</p>
                  </div>
                ))}

                {replyingTo === comment.id && (
                  <div className="ml-8 mt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your response..."
                        className="flex-1 p-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                      />
                      <button
                        onClick={() => handleSubmitReply(comment.id)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsPrivateReply(!isPrivateReply)}
                        className={`px-4 py-2 rounded-lg border ${
                          isPrivateReply
                            ? 'bg-gray-100 text-gray-600 border-gray-400'
                            : 'bg-white text-gray-600 border-gray-200'
                        } text-sm`}
                      >
                        {isPrivateReply ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {visibleComments.length > questionsPerPage && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(visibleComments.length / questionsPerPage) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === i + 1
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                  } text-sm`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
