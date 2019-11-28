from flask import Flask, render_template, url_for, request, session, redirect
from util import json_response
import password_manager
import os
import data_handler


app = Flask(__name__)
app.secret_key = os.urandom(24)


@app.route("/")
def index(login=None):
    """
    This is a one-pager which shows all the boards and cards
    """

    public_boards = data_handler.get_public_boards()
    public_cards = data_handler.get_public_cards()

    return render_template('boards.html', public_boards=public_boards,
                           public_cards=public_cards)


@app.route("/user_page", methods=['GET'])
def user_page_route(action=None):

    if request.method == 'GET':

        if request.args.get('action'):
            action = request.args.get('action')
        else:
            return redirect(url_for('index'))

        if 'bad_data' in session:
            bad_data = session['bad_data']
            del session['bad_data']
            return render_template('user_system.html',
                                   action=action,
                                   bad_data=bad_data)
        else:
            return render_template('user_system.html',
                                   action=action)


@app.route("/register", methods=["POST"])
def register_route():

    if request.method == 'POST':
        login = request.form['login']
        password = password_manager.hash_password(request.form['password'])

        if data_handler.save_new_user(login, password):
            session['user'] = login
            return redirect(url_for('index'))

        else:
            session['bad_data'] = True
            return redirect(url_for('user_page_route', action='register'))


@app.route("/login", methods=['POST'])
def login_route():

    if request.method == 'POST':
        login = request.form['login']
        plain_text_password = request.form['password']
        hashed_password = data_handler.get_user_hashed_password(login)
        password_matches = False

        if hashed_password is None:
            session['bad_data'] = True
        else:
            password_matches = password_manager.verify_password(plain_text_password, hashed_password['pwd'])

        if password_matches:
            session['user'] = login
            return redirect(url_for('index', login=login))
        else:
            session['bad_data'] = True

        return redirect(url_for('user_page_route', action='login'))


@app.route("/logout")
def logout_route():

    del session['user']
    return redirect(url_for('index'))


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
