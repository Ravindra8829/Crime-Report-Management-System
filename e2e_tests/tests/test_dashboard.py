import pytest

class TestDashboard:

    def test_admin_dashboard_cards(self, login_page, dashboard_page):
        """TC_DASH_01: Verify Admin role dashboard renders all 5 access cards."""
        login_page.load()
        login_page.login("admin", "admin123")
        assert dashboard_page.is_dashboard_displayed()
        assert dashboard_page.get_cards_count() == 5

    def test_officer_dashboard_cards(self, login_page, dashboard_page):
        """TC_DASH_02: Verify Officer role dashboard renders 4 access cards."""
        login_page.load()
        login_page.login("officer1", "admin123")
        assert dashboard_page.is_dashboard_displayed()
        assert dashboard_page.get_cards_count() == 4
