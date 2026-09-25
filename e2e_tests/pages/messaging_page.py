from pages.base_page import BasePage

class MessagingPage(BasePage):
    PAGE_HEADER = "h4:has-text('Inter-Agency Communication')"

    def __init__(self, page):
        super().__init__(page)

    def load(self):
        self.navigate("/messages")

    def is_messaging_page_displayed(self) -> bool:
        return self.is_visible(self.PAGE_HEADER)
