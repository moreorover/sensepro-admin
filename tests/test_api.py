def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Hello Flask!' in response.data


def test_login(client):
    response = client.post('/login', json={'email': 'admin@admin.com', 'password': 'admin'})
    assert response.status_code == 200
    assert b'Login Successful' in response.data


def test_login_with_incorrect_password(client):
    response = client.post('/login', json={'email': 'admin@admin.com', 'password': 'wrong'})
    assert response.status_code == 401
    assert b'Bad email or Password' in response.data


def test_login_invalid_credentials(client):
    response = client.post('/login', json={'email': 'wrongemail@admin.com', 'password': 'wrongpassword'})
    assert response.status_code == 401
    assert b'Bad email or Password' in response.data