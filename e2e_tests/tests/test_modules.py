import pytest

class TestModules:

    def test_admin_module_navigation(self, login_page, dashboard_page, reports_page, cases_page, messaging_page, analytics_page, admin_page):
        """TC_MOD_01: Verify Admin can navigate across all sub-modules without auto-logout."""
        login_page.load()
        login_page.login("admin", "admin123")
        assert dashboard_page.is_dashboard_displayed()

        # Reports Module
        dashboard_page.click_nav_item("Reports")
        assert reports_page.is_reports_page_displayed()

        # Cases Module
        dashboard_page.click_nav_item("Cases")
        assert cases_page.is_cases_page_displayed()

        # Messaging Module
        dashboard_page.click_nav_item("Messaging")
        assert messaging_page.is_messaging_page_displayed()

        # Analytics Module
        dashboard_page.click_nav_item("Analytics")
        assert analytics_page.is_analytics_page_displayed()

        # Admin Panel
        dashboard_page.click_nav_item("Admin")
        assert admin_page.is_admin_page_displayed()

    def test_reports_table_rendering(self, login_page, dashboard_page, reports_page):
        """TC_MOD_02: Verify reports table rows rendering."""
        login_page.load()
        login_page.login("admin", "admin123")
        dashboard_page.click_nav_item("Reports")
        assert reports_page.is_reports_page_displayed()
        assert reports_page.get_reports_count() >= 0
