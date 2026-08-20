def test_register_success(client):

    response = client.post(
        "/api/auth/register",
        json={
            "full_name": "Test Owner",
            "email": "testowner@example.com",
            "password": "test123456",
        },
    )

    assert response.status_code == 201

    data = response.get_json()

    assert data["message"] == "User created successfully."
    assert "token" in data
    assert "user" in data
    assert data["user"]["role"] == "Admin"

def test_register_missing_name(client):

    response = client.post(
        "/api/auth/register",
        json={
            "email": "noname@example.com",
            "password": "test123456",
        },
    )

    assert response.status_code == 400

    data = response.get_json()

    assert data["message"] == (
        "Full name, email and password are required."
    )


def test_register_missing_email(client):

    response = client.post(
        "/api/auth/register",
        json={
            "full_name": "Test Owner",
            "password": "test123456",
        },
    )

    assert response.status_code == 400

    data = response.get_json()

    assert data["message"] == (
        "Full name, email and password are required."
    )


def test_register_missing_password(client):

    response = client.post(
        "/api/auth/register",
        json={
            "full_name": "Test Owner",
            "email": "nopassword@example.com",
        },
    )

    assert response.status_code == 400

    data = response.get_json()

    assert data["message"] == (
        "Full name, email and password are required."
    )


def test_register_duplicate_email(client):

    first_response = client.post(
        "/api/auth/register",
        json={
            "full_name": "Test Owner",
            "email": "duplicate@example.com",
            "password": "test123456",
        },
    )

    assert first_response.status_code == 201

    second_response = client.post(
        "/api/auth/register",
        json={
            "full_name": "Another Owner",
            "email": "duplicate@example.com",
            "password": "different123",
        },
    )

    assert second_response.status_code == 400

    data = second_response.get_json()

    assert data["message"] == "Email already exists."

def test_login_success(client):

    # Create user first
    register_response = client.post(
        "/api/auth/register",
        json={
            "full_name": "Login User",
            "email": "login@example.com",
            "password": "test123456",
        },
    )

    assert register_response.status_code == 201

    # Login
    response = client.post(
        "/api/auth/login",
        json={
            "email": "login@example.com",
            "password": "test123456",
        },
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["message"] == "Login successful."
    assert "token" in data
    assert data["user"]["email"] == "login@example.com"
    assert data["user"]["role"] == "Admin"

def test_login_wrong_password(client):

    client.post(
        "/api/auth/register",
        json={
            "full_name": "Login User",
            "email": "wrongpassword@example.com",
            "password": "correct123",
        },
    )

    response = client.post(
        "/api/auth/login",
        json={
            "email": "wrongpassword@example.com",
            "password": "wrong123",
        },
    )

    assert response.status_code == 401

    data = response.get_json()

    assert data["message"] == "Invalid email or password."

def test_login_unknown_email(client):

    response = client.post(
        "/api/auth/login",
        json={
            "email": "doesnotexist@example.com",
            "password": "test123456",
        },
    )

    assert response.status_code == 401

    data = response.get_json()

    assert data["message"] == "Invalid email or password."

def test_login_missing_email(client):

    response = client.post(
        "/api/auth/login",
        json={
            "password": "test123456",
        },
    )

    assert response.status_code == 400

    data = response.get_json()

    assert data["message"] == "Email and password are required."

def test_login_missing_password(client):

    response = client.post(
        "/api/auth/login",
        json={
            "email": "test@example.com",
        },
    )

    assert response.status_code == 400

    data = response.get_json()

    assert data["message"] == "Email and password are required."    
            

        