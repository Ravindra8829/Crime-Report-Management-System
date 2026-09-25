from pages.base_page import BasePage

class CasesPage(BasePage):
    PAGE_HEADER = "h4:has-text('Case Management')"
    NEW_CASE_BUTTON = "button:has-text('New Case')"
    CASES_TABLE_ROWS = "tbody tr"

    def __init__(self, page):
        super().__init__(page)

    def load(self):
        self.navigate("/cases")

    def is_cases_page_displayed(self) -> bool:
        return self.is_visible(self.PAGE_HEADER)

    def get_cases_count(self) -> int:
        self.page.wait_for_selector("table", state="visible")
        return self.page.locator(self.CASES_TABLE_ROWS).count()
