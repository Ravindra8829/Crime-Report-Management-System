from pages.base_page import BasePage

class AdminPage(BasePage):
    PAGE_HEADER = "h4:has-text('Admin Panel')"

    def __init__(self, page):
        super().__init__(page)

    def load(self):
        self.navigate("/admin")

    def is_admin_page_displayed(self) -> bool:
        return self.is_visible(self.PAGE_HEADER)
