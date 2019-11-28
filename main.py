from flask import Flask, render_template, url_for, request
from util import json_response
import password_manager
import data_handler

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """

    public_boards = data_handler.get_public_boards()
    public_cards = data_handler.get_public_cards()

    return render_template('boards.html', public_boards=public_boards,
                           public_cards=public_cards)


@app.route("/user_page")
def user_page_route():
    action = request.args['action']
    print(action)
    return render_template('user_system.html', action=action)


@app.route("/register", methods=["POST"])
def register_route():
    if request.method == 'POST':
        login = request.form['login']
        password = password_manager.hash_password(request.form['password'])
        data_handler.save_new_user(login, password)
        return 'abc'


@app.route("/login", methods=['POST'])
def login_route():
    if request.method == 'POST':
        return 'bca'


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)




def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
