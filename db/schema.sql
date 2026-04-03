create table if not exists stages (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    stage_order integer not null,
    name text not null,
    description text not null
);

create table if not exists modules (
    id uuid primary key default gen_random_uuid(),
    stage_id uuid not null references stages(id) on delete cascade,
    slug text not null unique,
    module_order integer not null,
    title text not null
);

create table if not exists lessons (
    id uuid primary key default gen_random_uuid(),
    module_id uuid not null references modules(id) on delete cascade,
    slug text not null unique,
    lesson_order integer not null,
    title text not null,
    subtitle text not null,
    lesson_kind text not null check (lesson_kind in ('vocabulary', 'script'))
);

create table if not exists lesson_vocab_items (
    id uuid primary key default gen_random_uuid(),
    lesson_id uuid not null references lessons(id) on delete cascade,
    item_order integer not null,
    english text not null,
    nepali text not null,
    dhut text not null,
    akkha text
);

create table if not exists lesson_script_items (
    id uuid primary key default gen_random_uuid(),
    lesson_id uuid not null references lessons(id) on delete cascade,
    item_order integer not null,
    description text not null,
    symbol text not null,
    sound text not null,
    example text not null
);

create table if not exists learner_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    current_stage_slug text not null,
    current_module_slug text,
    current_lesson_slug text,
    last_visited_lesson_slug text,
    completed_lesson_slugs jsonb not null default '[]'::jsonb,
    updated_at timestamptz not null default now()
);
