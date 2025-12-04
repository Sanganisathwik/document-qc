import { useState } from 'react';
import { format } from 'date-fns';
import { Comment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Lock, Globe, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string, isInternal: boolean) => void;
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [isInternal, setIsInternal] = useState(true);

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment, isInternal);
    setNewComment('');
    toast.success('Comment added');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-medium text-sm">Comments</h3>
        <span className="text-xs text-muted-foreground">({comments.length})</span>
      </div>

      <div className="space-y-3">
        {comments.map((comment) => (
          <div 
            key={comment.id} 
            className={cn(
              "rounded-lg p-3 text-sm",
              comment.isInternal ? "bg-amber-50/50 border border-amber-100" : "bg-muted"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{comment.author}</span>
              {comment.isInternal ? (
                <span className="flex items-center gap-1 text-xs text-amber-600">
                  <Lock className="h-3 w-3" />
                  Internal
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  Customer visible
                </span>
              )}
              <span className="text-xs text-muted-foreground ml-auto">
                {format(new Date(comment.createdAt), 'MMM d, h:mm a')}
              </span>
            </div>
            <p className="text-muted-foreground">{comment.content}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px] resize-none"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={isInternal ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setIsInternal(true)}
              className="h-7 text-xs"
            >
              <Lock className="h-3 w-3 mr-1" />
              Internal
            </Button>
            <Button
              variant={!isInternal ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setIsInternal(false)}
              className="h-7 text-xs"
            >
              <Globe className="h-3 w-3 mr-1" />
              Customer
            </Button>
          </div>
          <Button 
            size="sm" 
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="h-7"
          >
            <Send className="h-3 w-3 mr-1" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
