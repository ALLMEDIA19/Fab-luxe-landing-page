import os
from typing import List

import pytest
import requests
from dotenv import load_dotenv

# Lead management API regression tests for landing page popup integration
load_dotenv("/app/frontend/.env")
BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")

if BASE_URL:
    BASE_URL = BASE_URL.rstrip("/")


@pytest.fixture(scope="session")
def api_client():
    if not BASE_URL:
        pytest.skip("REACT_APP_BACKEND_URL is not set")
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


@pytest.fixture
def created_lead_ids() -> List[str]:
    return []


@pytest.fixture(autouse=True)
def cleanup_created_leads(api_client, created_lead_ids):
    yield
    for lead_id in created_lead_ids:
        api_client.delete(f"{BASE_URL}/api/leads/{lead_id}")


def test_create_lead_and_verify_persistence(api_client, created_lead_ids):
    payload = {
        "name": "TEST_UI Lead",
        "phone": "+919999999111",
        "budget": "₹3.5 CR",
        "preferred_callback_time": "Tomorrow 11 AM",
    }

    create_resp = api_client.post(f"{BASE_URL}/api/leads", json=payload)
    assert create_resp.status_code == 200

    created = create_resp.json()
    assert created["name"] == payload["name"]
    assert created["phone"] == payload["phone"]
    assert created["budget"] == payload["budget"]
    assert created["preferred_callback_time"] == payload["preferred_callback_time"]
    assert isinstance(created["id"], str)
    assert "_id" not in created

    created_lead_ids.append(created["id"])

    get_resp = api_client.get(f"{BASE_URL}/api/leads/{created['id']}")
    assert get_resp.status_code == 200
    fetched = get_resp.json()
    assert fetched["name"] == payload["name"]
    assert "_id" not in fetched


def test_get_leads_returns_list_without_mongo_id(api_client):
    list_resp = api_client.get(f"{BASE_URL}/api/leads")
    assert list_resp.status_code == 200

    data = list_resp.json()
    assert isinstance(data, list)
    if data:
        assert "id" in data[0]
        assert "_id" not in data[0]


def test_update_lead_and_verify_persistence(api_client, created_lead_ids):
    payload = {
        "name": "TEST_Update Lead",
        "phone": "+919999999222",
        "budget": "₹4.0 CR",
        "preferred_callback_time": "Today 5 PM",
    }
    create_resp = api_client.post(f"{BASE_URL}/api/leads", json=payload)
    assert create_resp.status_code == 200
    lead_id = create_resp.json()["id"]
    created_lead_ids.append(lead_id)

    update_payload = {"budget": "₹4.25 CR", "preferred_callback_time": "Friday 2 PM"}
    update_resp = api_client.put(f"{BASE_URL}/api/leads/{lead_id}", json=update_payload)
    assert update_resp.status_code == 200

    updated = update_resp.json()
    assert updated["budget"] == "₹4.25 CR"
    assert updated["preferred_callback_time"] == "Friday 2 PM"

    get_resp = api_client.get(f"{BASE_URL}/api/leads/{lead_id}")
    assert get_resp.status_code == 200
    fetched = get_resp.json()
    assert fetched["budget"] == "₹4.25 CR"
    assert fetched["name"] == payload["name"]


def test_update_lead_with_empty_payload_returns_400(api_client, created_lead_ids):
    payload = {
        "name": "TEST_Empty Update",
        "phone": "+919999999333",
        "budget": "₹3.2 CR",
        "preferred_callback_time": "Saturday 10 AM",
    }
    create_resp = api_client.post(f"{BASE_URL}/api/leads", json=payload)
    assert create_resp.status_code == 200
    lead_id = create_resp.json()["id"]
    created_lead_ids.append(lead_id)

    update_resp = api_client.put(f"{BASE_URL}/api/leads/{lead_id}", json={})
    assert update_resp.status_code == 400
    body = update_resp.json()
    assert "detail" in body


def test_delete_lead_and_verify_removal(api_client):
    payload = {
        "name": "TEST_Delete Lead",
        "phone": "+919999999444",
        "budget": "₹5.1 CR",
        "preferred_callback_time": "Monday 9 AM",
    }
    create_resp = api_client.post(f"{BASE_URL}/api/leads", json=payload)
    assert create_resp.status_code == 200
    lead_id = create_resp.json()["id"]

    delete_resp = api_client.delete(f"{BASE_URL}/api/leads/{lead_id}")
    assert delete_resp.status_code == 200
    assert delete_resp.json()["message"] == "Lead deleted successfully"

    get_resp = api_client.get(f"{BASE_URL}/api/leads/{lead_id}")
    assert get_resp.status_code == 404


def test_get_nonexistent_lead_returns_404(api_client):
    missing_resp = api_client.get(f"{BASE_URL}/api/leads/TEST_NOT_FOUND_ID")
    assert missing_resp.status_code == 404
    assert missing_resp.json()["detail"] == "Lead not found"
