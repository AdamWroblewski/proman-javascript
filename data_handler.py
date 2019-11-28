import persistence
import db_connection
from psycopg2 import IntegrityError


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_boards(force=True)


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards


@db_connection.connection_handler
def get_public_cards(cursor):

    sql_query = """
                SELECT * FROM proman_boards AS pb 
                JOIN proman_cards AS pc
                ON pb.id = pc.board_id
                WHERE private = 'f';
                """

    cursor.execute(sql_query)
    return cursor.fetchall()


@db_connection.connection_handler
def get_public_boards(cursor):

    sql_query = """    
                SELECT * FROM proman_boards;
                """

    cursor.execute(sql_query)
    return cursor.fetchall()


@db_connection.connection_handler
def save_new_user(cursor, name, password):

    sql_query = """
                INSERT INTO proman_users (name, pwd)
                VALUES (%(name)s, %(password)s);
                """

    try:
        cursor.execute(sql_query, {'name': name, 'password': password})
        return True
    except IntegrityError:
        return False


@db_connection.connection_handler
def get_user_hashed_password(cursor, name):

    sql_query = """
                SELECT pwd FROM proman_users
                WHERE name = %(name)s;
                """

    cursor.execute(sql_query, {'name': name})
    return cursor.fetchone()
