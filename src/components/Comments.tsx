import React, { useEffect, useMemo, useState } from 'react';
import { messageApi } from '@/services/api';

interface CommentItem {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface CommentsProps {
  threadId: string; // use blog id
  title?: string;
}

const Comments: React.FC<CommentsProps> = ({ threadId, title = 'Comments' }) => {
  const storageKey = useMemo(() => `maiya_comments_${threadId}`, [threadId]);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setComments(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const persist = (next: CommentItem[]) => {
    setComments(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setError('Please enter your name and a comment.');
      return;
    }
    setError(null);
    setSubmitting(true);
    const newComment: CommentItem = {
      id: `${Date.now()}`,
      name: name.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    // Optimistic update
    persist([newComment, ...comments]);
    setContent('');

    // Notify backend via messages endpoint (non-blocking for UI)
    try {
      await messageApi.create({
        subject: `New blog comment on ${threadId}`,
        name: newComment.name,
        message: newComment.content,
        meta: { threadId, createdAt: newComment.createdAt }
      });
    } catch (err) {
      // ignore network errors for now; comment persists locally
      console.error('Failed to send comment notification:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 p-4 bg-white/60 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white/90"
            aria-label="Your name"
          />
          <div className="md:col-span-2">
            <textarea
              placeholder="Write your comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white/90"
              aria-label="Your comment"
            />
          </div>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 disabled:opacity-60"
          >
            {submitting ? 'Posting…' : 'Post Comment'}
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">Be the first to comment.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="rounded-xl border border-gray-200 p-4 bg-white/60">
              <div className="text-sm text-muted-foreground mb-1">
                <span className="font-semibold text-foreground">{c.name}</span>
                <span className="mx-2">•</span>
                {new Date(c.createdAt).toLocaleString()}
              </div>
              <div className="whitespace-pre-wrap text-foreground">{c.content}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Comments;








