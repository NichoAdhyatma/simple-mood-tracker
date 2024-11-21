import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, isToday, isPast, addDays } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { MoodForm } from './components/MoodForm';
import { MoodCard } from './components/MoodCard';
import { Calendar } from './components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { type Mood } from './types';

function App() {
  const [moods, setMoods] = useState<Mood[]>(() => {
    const saved = localStorage.getItem('moods');
    return saved ? JSON.parse(saved).map((mood: any) => ({
      ...mood,
      date: new Date(mood.date)
    })) : [];
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    localStorage.setItem('moods', JSON.stringify(moods));
  }, [moods]);

  const handleSubmit = (newMood: Omit<Mood, 'id' | 'date'>) => {
    const mood: Mood = {
      ...newMood,
      id: crypto.randomUUID(),
      date: selectedDate,
    };
    setMoods([mood, ...moods]);
  };

  const handleDelete = (id: string) => {
    setMoods(moods.filter((mood) => mood.id !== id));
  };

  const isDateSelectable = (date: Date) => {
    return isToday(date) || (isPast(date) && date >= addDays(new Date(), -2));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Mood Tracker</h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            Track your daily moods and emotions
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr,2fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && isDateSelectable(date) && setSelectedDate(date)}
                  disabled={(date) => !isDateSelectable(date)}
                  modifiers={{
                    booked: moods.map(mood => new Date(mood.date))
                  }}
                  modifiersStyles={{
                    booked: {
                      border: '2px solid var(--primary)',
                      borderRadius: '50%'
                    }
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Mood for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
              </CardHeader>
              <CardContent>
                <MoodForm onSubmit={handleSubmit} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Mood History</h2>
            <AnimatePresence>
              {moods.length === 0 ? (
                <p className="text-center text-muted-foreground">No moods recorded yet</p>
              ) : (
                <motion.div 
                  className="grid gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {moods.map((mood, index) => (
                    <motion.div
                      key={mood.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <MoodCard
                        mood={mood}
                        onDelete={handleDelete}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;