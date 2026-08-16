-- ADD VIDEO SUPPORT
alter table articles
add column if not exists video_url text;
