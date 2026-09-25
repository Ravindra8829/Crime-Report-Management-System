from pages.base_page import BasePage

class DashboardPage(BasePage):
    # Locators
    WELCOME_HEADER = "h4:has-text('Welcome')"
    CARD_ITEMS = ".MuiCard-root"

    def __init__(self, page):
        super().__init__(page)

    def load(self):
        self.navigate("/dashboard")

    def is_dashboard_displayed(self) -> bool:
        return self.is_visible(self.WELCOME_HEADER)

    def get_cards_count(self) -> int:
        self.page.wait_for_selector(self.CARD_ITEMS, state="visible")
        return self.page.locator(self.CARD_ITEMS).count()

    def click_nav_item(self, title: str):
        self.click(f"button:has-text('{title}')")
        self.page.wait_for_load_state("networkidle")

    def click_dashboard_card(self, title: str):
        self.click(f"div:has-text('{title}') >> text='Access'")
        self.page.wait_for_load_state("networkidle")
