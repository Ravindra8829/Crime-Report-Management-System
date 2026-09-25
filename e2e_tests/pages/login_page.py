from pages.base_page import BasePage

class LoginPage(BasePage):
    # Locators
    USERNAME_INPUT = "#username"
    PASSWORD_INPUT = "#password"
    LOGIN_BUTTON = "button[type='submit']"
    ERROR_ALERT = ".MuiAlert-message"
    PAGE_TITLE = "h1:has-text('CRMS Login')"

    def __init__(self, page):
        super().__init__(page)

    def load(self):
        self.navigate("/login")

    def login(self, username: str, password: str):
        self.fill(self.USERNAME_INPUT, username)
        self.fill(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)
        self.page.wait_for_load_state("networkidle")

    def get_error_message(self) -> str:
        return self.get_text(self.ERROR_ALERT)

    def is_login_page_displayed(self) -> bool:
        return self.is_visible(self.PAGE_TITLE)
