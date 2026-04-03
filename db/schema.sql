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
    user_id uuid not null unique,
    current_stage_id uuid not null references stages(id),
    current_module_id uuid references modules(id),
    current_lesson_id uuid references lessons(id),
    last_visited_lesson_id uuid references lessons(id),
    completed_lesson_ids jsonb not null default '[]'::jsonb,
    updated_at timestamptz not null default now()
);

do $$
begin
    if not exists (
        select 1 from pg_constraint where conname = 'stages_order_positive'
    ) then
        alter table stages
            add constraint stages_order_positive
            check (stage_order > 0);
    end if;

    if not exists (
        select 1 from pg_constraint where conname = 'stages_stage_order_unique'
    ) then
        alter table stages
            add constraint stages_stage_order_unique
            unique (stage_order);
    end if;

    if not exists (
        select 1 from pg_constraint where conname = 'modules_order_positive'
    ) then
        alter table modules
            add constraint modules_order_positive
            check (module_order > 0);
    end if;

    if not exists (
        select 1 from pg_constraint where conname = 'modules_stage_order_unique'
    ) then
        alter table modules
            add constraint modules_stage_order_unique
            unique (stage_id, module_order);
    end if;

    if not exists (
        select 1 from pg_constraint where conname = 'lessons_order_positive'
    ) then
        alter table lessons
            add constraint lessons_order_positive
            check (lesson_order > 0);
    end if;

    if not exists (
        select 1 from pg_constraint where conname = 'lessons_module_order_unique'
    ) then
        alter table lessons
            add constraint lessons_module_order_unique
            unique (module_id, lesson_order);
    end if;
end
$$;
