import pytest
import json
import os

def load_user_data():
    data_path = os.path.join(os.path.dirname(__file__), "..", "test_data", "users_data.json")
    with open(data_path, "r") as f:
        return json.load(f)

class TestLogin:

    @pytest.mark.parametrize("user_info", load_user_data()["valid_users"])
    def test_valid_user_login(self, login_page, dashboard_page, user_info):
        """TC_LOGIN_01-03: Validate successful login for all user roles."""
        login_page.load()
        login_page.login(user_info["username"], user_info["password"])
        assert dashboard_page.is_dashboard_displayed(), f"Failed login for role: {user_info['role']}"

    @pytest.mark.parametrize("invalid_info", load_user_data()["invalid_users"])
    def test_invalid_login_credentials(self, login_page, invalid_info):
        """TC_LOGIN_04: Validate error alert on invalid login credentials."""
        login_page.load()
        login_page.login(invalid_info["username"], invalid_info["password"])
        error_msg = login_page.get_error_message()
        assert invalid_info["expected_error"] in error_msg
