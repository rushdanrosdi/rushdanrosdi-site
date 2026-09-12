CREATE TABLE IF NOT EXISTS discovery_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT NOT NULL DEFAULT 'rushdanrosdi',
  url TEXT NOT NULL,
  processed_at TEXT NOT NULL,
  validation_ok INTEGER NOT NULL,
  http_status INTEGER,
  canonical_ok INTEGER NOT NULL,
  robots_ok INTEGER NOT NULL,
  sitemap_ok INTEGER NOT NULL,
  indexnow_submitted INTEGER,
  indexnow_status INTEGER,
  gsc_sitemap_submitted INTEGER,
  gsc_sitemap_status INTEGER,
  google_verdict TEXT,
  google_coverage_state TEXT,
  google_indexing_state TEXT,
  google_last_crawl_time TEXT,
  result_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_discovery_runs_url_processed
  ON discovery_runs (url, processed_at DESC);

CREATE INDEX IF NOT EXISTS idx_discovery_runs_processed
  ON discovery_runs (processed_at DESC);
