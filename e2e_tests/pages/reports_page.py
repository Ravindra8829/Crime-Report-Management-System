from pages.base_page import BasePage

class ReportsPage(BasePage):
    # Locators
    PAGE_HEADER = "h4:has-text('Crime Reports')"
    NEW_REPORT_BUTTON = "button:has-text('New Report')"
    SEARCH_INPUT = "input[placeholder='Search reports']"
    REPORTS_TABLE_ROWS = "tbody tr"

    def __init__(self, page):
        super().__init__(page)

    def load(self):
        self.navigate("/reports")

    def is_reports_page_displayed(self) -> bool:
        return self.is_visible(self.PAGE_HEADER)

    def get_reports_count(self) -> int:
        self.page.wait_for_selector("table", state="visible")
        return self.page.locator(self.REPORTS_TABLE_ROWS).count()

    def search_reports(self, keyword: str):
        if self.is_visible(self.SEARCH_INPUT, timeout=2000):
            self.fill(self.SEARCH_INPUT, keyword)
            self.page.wait_for_load_state("networkidle")

    def click_new_report(self):
        self.click(self.NEW_REPORT_BUTTON)
        self.page.wait_for_selector("div[role='dialog']", state="visible")
