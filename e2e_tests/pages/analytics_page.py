from pages.base_page import BasePage

class AnalyticsPage(BasePage):
    PAGE_HEADER = "h4:has-text('Analytics & Dashboard')"

    def __init__(self, page):
        super().__init__(page)

    def load(self):
        self.navigate("/analytics")

    def is_analytics_page_displayed(self) -> bool:
        return self.is_visible(self.PAGE_HEADER)
