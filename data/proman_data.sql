--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: proman_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.proman_users (id, name, pwd) VALUES (1, 'admin', '');


--
-- Data for Name: proman_boards; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.proman_boards (id, title, private, user_id) VALUES (1, 'Board 1', false, 1);
INSERT INTO public.proman_boards (id, title, private, user_id) VALUES (2, 'Board 2', false, 1);


--
-- Data for Name: proman_cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (1, 1, 'new card 1', 0, 0);
INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (2, 1, 'new card 2', 0, 1);
INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (3, 1, 'in progress card', 1, 0);
INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (4, 1, 'planning', 2, 0);
INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (5, 1, 'done card 1', 3, 0);
INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (6, 1, 'done card 1', 3, 1);
INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (7, 2, 'new card 1', 0, 0);
INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (8, 2, 'new card 2', 0, 1);
INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (9, 2, 'in progress card', 1, 0);
INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (10, 2, 'planning', 2, 0);
INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (11, 2, 'done card 1', 3, 0);
INSERT INTO public.proman_cards (id, board_id, title, status_id, orderr) VALUES (12, 2, 'done card 1', 3, 1);


--
-- Data for Name: proman_statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.proman_statuses (id, title) VALUES (0, 'new');
INSERT INTO public.proman_statuses (id, title) VALUES (1, 'in progress');
INSERT INTO public.proman_statuses (id, title) VALUES (2, 'testing');
INSERT INTO public.proman_statuses (id, title) VALUES (3, 'done');


--
-- Name: proman_boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proman_boards_id_seq', 1, false);


--
-- Name: proman_cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proman_cards_id_seq', 1, false);


--
-- Name: proman_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proman_statuses_id_seq', 1, false);


--
-- Name: proman_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proman_users_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

