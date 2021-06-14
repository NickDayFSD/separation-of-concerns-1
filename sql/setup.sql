DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quantity_of_items INTEGER CHECK (quantity_of_items > 0)
);

DROP TABLE IF EXISTS candies;

CREATE TABLE candies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label VARCHAR(50) NOT NULL,
  texture VARCHAR(50) NOT NULL,
  size VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS bicycles;

CREATE TABLE bicycles (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  brand VARCHAR(50) NOT NULL,
  use_case VARCHAR(50) NOT NULL,
  material VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS colors;

CREATE TABLE colors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  color VARCHAR(50) NOT NULL
);
