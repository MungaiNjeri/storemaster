def test_admin_can_create_store(client):

    # Register admin
    register_response = client.post(
        "/api/auth/register",
        json={
            "full_name": "Store Owner",
            "email": "storeowner@example.com",
            "password": "test123456",
        },
    )

    assert register_response.status_code == 201

    register_data = register_response.get_json()

    token = register_data["token"]

    assert token is not None

    # Create store using JWT
    response = client.post(
        "/api/stores/",
        json={
            "business_name": "Test Store",
            "location": "Nairobi",
            "tax_info": "P051234567A",
        },
        headers={
            "Authorization": f"Bearer {token}"
        },
    )

    assert response.status_code == 201

    data = response.get_json()

    assert data["message"] == "Store created successfully."
    assert "store" in data

    assert data["store"]["business_name"] == "Test Store"
    assert data["store"]["location"] == "Nairobi"