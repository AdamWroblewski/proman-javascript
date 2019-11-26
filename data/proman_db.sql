CREATE TABLE proman_boards (
	id SERIAL PRIMARY KEY NOT NULL,
	title VARCHAR(50) NOT NULL,
	private BOOLEAN NOT NULL DEFAULT FALSE,
	user_id INTEGER NOT NULL
);



CREATE TABLE proman_cards (
	id SERIAL PRIMARY KEY NOT NULL,
	board_id INTEGER NOT NULL,
	title VARCHAR(50) NOT NULL,
	status_id SMALLINT NOT NULL,
	order SMALLINT NOT NULL
);


CREATE TABLE proman_statuses (
	id SERIAL PRIMARY KEY NOT NULL,
	title VARCHAR(16) NOT NULL
);

CREATE TABLE proman_users (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(16) NOT NULL,
	pwd VARCHAR(100) NOT NULL
);

ALTER TABLE ONLY proman_boards
    ADD CONSTRAINT fk_proman_boards_users_id FOREIGN KEY (user_id) REFERENCES proman_users(id);

ALTER TABLE ONLY proman_cards
    ADD CONSTRAINT fk_proman_cards_boards_id FOREIGN KEY (board_id) REFERENCES proman_boards(id)

