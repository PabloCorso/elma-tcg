CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  name text UNIQUE NOT NULL,
  card_type card_type NOT NULL,
  type1 text,
  type2 text,
  pr1 numeric(3,1),
  pr2 numeric(3,1),
  pr3 numeric(3,1),
  pr4 numeric(3,1),
  pr5 numeric(3,1),
  pr6 numeric(3,1),
  battle_length_min integer,
  battle_length_max integer,
  flavor_text text,
  set_name text,
  collector_number integer,
  rarity rarity
);

CREATE TABLE effects (
  id SERIAL PRIMARY KEY,
  name text UNIQUE NOT NULL,
  text text,
  italic_text text
);

CREATE TABLE cards_effects (
  card_id integer NOT NULL,
  effect_id integer NOT NULL,
  position integer,
  PRIMARY KEY (card_id, effect_id),
  FOREIGN KEY (card_id) REFERENCES cards (id),
  FOREIGN KEY (effect_id) REFERENCES effects (id)
);

CREATE TYPE card_type AS ENUM ('Kuski', 'Level', 'Instant');
CREATE TYPE rarity AS ENUM ('C', 'U', 'R');