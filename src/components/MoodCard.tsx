import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { type Mood } from '../types';
import { getMoodIcon, getMoodColor } from '../utils/mood';
import { Card, CardContent, CardHeader } from './ui/card';

type Props = {
  mood: Mood;
  onDelete: (id: string) => void;
};

export function MoodCard({ mood, onDelete }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className={`overflow-hidden ${getMoodColor(mood.rating)}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <span className="text-sm font-medium text-primary-foreground/90">
            {format(new Date(mood.date), 'MMM d, yyyy h:mm a')}
          </span>
          <button
            onClick={() => onDelete(mood.id)}
            className="text-primary-foreground/80 hover:text-primary-foreground"
          >
            ×
          </button>
        </CardHeader>
        <CardContent>
          <div className="mt-2 flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {getMoodIcon(mood.rating)}
            </motion.div>
            <p className="text-lg font-semibold text-primary-foreground">
              {mood.note}
            </p>
          </div>
          {mood.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {mood.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-foreground/20 px-3 py-1 text-sm text-primary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}