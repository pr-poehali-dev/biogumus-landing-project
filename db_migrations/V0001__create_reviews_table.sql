CREATE TABLE t_p85157327_biogumus_landing_pro.reviews (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(200) NOT NULL,
    author_role VARCHAR(200),
    text TEXT NOT NULL,
    rating SMALLINT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    media_url TEXT,
    media_type VARCHAR(10),
    published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
