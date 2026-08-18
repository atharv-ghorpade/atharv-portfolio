CREATE TABLE IF NOT EXISTS public.assignments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  reflection text,
  category text NOT NULL,
  activity_date date NOT NULL,
  cover_image text NOT NULL,
  gallery text[] DEFAULT '{}',
  video_url text,
  tags text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to assignments
CREATE POLICY "Allow public read access on assignments"
ON public.assignments FOR SELECT TO public USING (true);

-- Allow authenticated users to manage assignments
CREATE POLICY "Allow authenticated insert on assignments"
ON public.assignments FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update on assignments"
ON public.assignments FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated delete on assignments"
ON public.assignments FOR DELETE TO authenticated USING (true);

-- Create the bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('assignment-images', 'assignment-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Allow public read access on assignment-images bucket"
ON storage.objects FOR SELECT TO public USING (bucket_id = 'assignment-images');

CREATE POLICY "Allow authenticated upload on assignment-images bucket"
ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'assignment-images');

CREATE POLICY "Allow authenticated update on assignment-images bucket"
ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'assignment-images');

CREATE POLICY "Allow authenticated delete on assignment-images bucket"
ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'assignment-images');
