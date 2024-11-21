import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { type Mood } from '../types';
import { getMoodIcon } from '../utils/mood';

const moodOptions = [
  { value: 1, label: 'Terrible' },
  { value: 2, label: 'Bad' },
  { value: 3, label: 'Okay' },
  { value: 4, label: 'Good' },
  { value: 5, label: 'Excellent' },
];

type Props = {
  onSubmit: (mood: Omit<Mood, 'id' | 'date'>) => void;
};

export function MoodForm({ onSubmit }: Props) {
  const [rating, setRating] = useState<number>(3);
  const [note, setNote] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, note, tags });
    setNote('');
    setTags([]);
    setTagInput('');
  };

  const handleTagInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center gap-4">
        {moodOptions.map((option) => (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => setRating(option.value)}
            className={`rounded-full p-4 transition-all ${
              rating === option.value
                ? 'bg-primary text-primary-foreground ring-2 ring-primary/20'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center gap-1">
              {getMoodIcon(option.value)}
              <span className="text-xs">{option.label}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="How are you feeling?"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          rows={3}
          required
        />
      </div>

      <div>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInput}
          placeholder="Add tags (press Enter)"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </motion.span>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" className="w-full">
        Save Mood
      </Button>
    </form>
  );
}