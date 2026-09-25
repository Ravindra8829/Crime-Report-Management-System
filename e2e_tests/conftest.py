import pytest
import sys
import os

# Add e2e_tests directory to pythonpath so imports work smoothly
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from pages.login_page import LoginPage
from pages.dashboard_page import DashboardPage
from pages.reports_page import ReportsPage
from pages.cases_page import CasesPage
from pages.messaging_page import MessagingPage
from pages.analytics_page import AnalyticsPage
from pages.admin_page import AdminPage

@pytest.fixture(scope="function")
def login_page(page):
    return LoginPage(page)

@pytest.fixture(scope="function")
def dashboard_page(page):
    return DashboardPage(page)

@pytest.fixture(scope="function")
def reports_page(page):
    return ReportsPage(page)

@pytest.fixture(scope="function")
def cases_page(page):
    return CasesPage(page)

@pytest.fixture(scope="function")
def messaging_page(page):
    return MessagingPage(page)

@pytest.fixture(scope="function")
def analytics_page(page):
    return AnalyticsPage(page)

@pytest.fixture(scope="function")
def admin_page(page):
    return AdminPage(page)
