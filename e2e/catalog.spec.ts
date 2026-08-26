import { expect, test } from "@playwright/test";

test.describe("كتالوج عمران للألعاب", () => {
  test("الصفحة الرئيسية تعرض الهوية والدعوة الأساسية", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/عمران/);
    await expect(page.getByRole("link", { name: /تصفح الكتالوج/ }).first()).toBeVisible();
    await expect(page.getByLabel("تواصل عبر واتساب", { exact: true })).toBeVisible();
  });

  test("الكتالوج يبحث ويفتح المعاينة السريعة", async ({ page }) => {
    await page.goto("/products");
    const search = page.getByRole("searchbox", { name: "البحث في المنتجات" });
    await search.fill("حقيبة");
    await expect(page.getByText("حقيبة الرسم الوردية 150 قطعة")).toBeVisible();

    const pinkCard = page.locator("article").filter({ hasText: "حقيبة الرسم الوردية 150 قطعة" });
    await pinkCard.getByRole("button", { name: "معاينة سريعة" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("dialog").getByText("استفسر عن السعر والتوفر", { exact: true })).toBeVisible();
    await expect(page.getByRole("dialog").getByRole("link", { name: "استفسر عبر واتساب" })).toHaveAttribute(
      "href",
      /pink-art-kit-150/,
    );
  });

  test("صفحة المنتج تعرض canonical content ورابط واتساب دقيقاً", async ({ page }) => {
    await page.goto("/products/pink-art-kit-150");
    await expect(page).toHaveTitle(/حقيبة الرسم الوردية/);
    await expect(page.getByRole("heading", { name: "حقيبة الرسم الوردية 150 قطعة" })).toBeVisible();
    await expect(page.getByRole("link", { name: "استفسر عن المنتج عبر واتساب" })).toHaveAttribute(
      "href",
      /pink-art-kit-150/,
    );
  });

  test("التنقل المحمول يفتح دون فقدان الروابط", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "القائمة" }).click();
    await expect(page.locator("header").getByRole("link", { name: "المنتجات", exact: true })).toBeVisible();
    await expect(page.getByText("الأقسام").last()).toBeVisible();
  });

  test("الصفحات القانونية و404 تستجيب", async ({ page }) => {
    for (const path of ["/privacy", "/shipping", "/terms"]) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    }

    const missingResponse = await page.goto("/missing-page");
    expect(missingResponse?.status()).toBe(404);
    await expect(page.getByText(/الصفحة غير موجودة|404/)).toBeVisible();
  });
});
