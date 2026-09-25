from playwright.sync_api import Page

class BasePage:
    def __init__(self, page: Page):
        self.page = page
        self.base_url = "http://localhost:3000"

    def navigate(self, path: str = ""):
        url = f"{self.base_url}{path}" if path.startswith("/") else f"{self.base_url}/{path}"
        self.page.goto(url)
        self.page.wait_for_load_state("networkidle")

    def click(self, selector: str):
        self.page.wait_for_selector(selector, state="visible")
        self.page.click(selector)

    def fill(self, selector: str, value: str):
        self.page.wait_for_selector(selector, state="visible")
        self.page.fill(selector, value)

    def get_text(self, selector: str) -> str:
        self.page.wait_for_selector(selector, state="visible")
        return self.page.inner_text(selector).strip()

    def is_visible(self, selector: str, timeout: int = 5000) -> bool:
        try:
            self.page.wait_for_selector(selector, state="visible", timeout=timeout)
            return True
        except Exception:
            return False

    def get_current_url(self) -> str:
        return self.page.url
