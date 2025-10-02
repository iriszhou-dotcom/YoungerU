/*
  # Create Community Interaction Tables

  1. New Tables
    - `question_likes`
      - `id` (integer, primary key, auto-increment)
      - `question_id` (integer, references questions)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamptz, default now())
      - Unique constraint on (question_id, user_id)
    
    - `answer_likes`
      - `id` (integer, primary key, auto-increment)
      - `answer_id` (integer, references answers)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamptz, default now())
      - Unique constraint on (answer_id, user_id)
    
    - `saved_questions`
      - `id` (integer, primary key, auto-increment)
      - `question_id` (integer, references questions)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamptz, default now())
      - Unique constraint on (question_id, user_id)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own interactions
    - Users can only view, create, and delete their own likes and saves
*/

-- Create question_likes table
CREATE TABLE IF NOT EXISTS question_likes (
  id serial PRIMARY KEY,
  question_id integer NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(question_id, user_id)
);

ALTER TABLE question_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all question likes"
  ON question_likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own question likes"
  ON question_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own question likes"
  ON question_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create answer_likes table
CREATE TABLE IF NOT EXISTS answer_likes (
  id serial PRIMARY KEY,
  answer_id integer NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(answer_id, user_id)
);

ALTER TABLE answer_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all answer likes"
  ON answer_likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own answer likes"
  ON answer_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own answer likes"
  ON answer_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create saved_questions table
CREATE TABLE IF NOT EXISTS saved_questions (
  id serial PRIMARY KEY,
  question_id integer NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(question_id, user_id)
);

ALTER TABLE saved_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved questions"
  ON saved_questions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved questions"
  ON saved_questions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved questions"
  ON saved_questions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_question_likes_question_id ON question_likes(question_id);
CREATE INDEX IF NOT EXISTS idx_question_likes_user_id ON question_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_answer_likes_answer_id ON answer_likes(answer_id);
CREATE INDEX IF NOT EXISTS idx_answer_likes_user_id ON answer_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_questions_question_id ON saved_questions(question_id);
CREATE INDEX IF NOT EXISTS idx_saved_questions_user_id ON saved_questions(user_id);
