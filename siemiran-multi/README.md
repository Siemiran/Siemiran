# سایت زیمیران — راهنمای فایل‌ها

## ساختار
- `index.html` — صفحه اصلی سایت (لینک به style.css و js ها)
- `style.css` — تمام استایل‌ها
- `products-data.js` — دیتابیس محصولات (این فایل رو برای اضافه/ویرایش محصول دستی باز کن)
- `app.js` — منطق سایت (سبد خرید، سرچ، فیلتر، منو، مودال و...)
- `product-<CODE>.html` — صفحه اختصاصی هر محصول (۴۸ فایل، خودکار تولید شدن)
- `generate_product_pages.py` — اسکریپتی که صفحات محصول رو از products-data.js می‌سازه

## چطور یه محصول اضافه/ویرایش کنم؟
۱. فایل `products-data.js` رو باز کن (با هر ادیتور متنی، حتی Notepad)
۲. یه آبجکت جدید مثل بقیه اضافه کن یا مقادیر موجود رو ویرایش کن
۳. تو ترمینال، داخل همین پوشه بزن:
   ```
   node -e "const fs=require('fs');const c=fs.readFileSync('products-data.js','utf8');const m=c.match(/const PRODUCTS = (\[[\s\S]*?\n\]);/);eval('var PRODUCTS='+m[1]);fs.writeFileSync('products.json',JSON.stringify(PRODUCTS,null,2));"
   python3 generate_product_pages.py
   ```
   این کار products.json رو می‌سازه و همه صفحات product-*.html رو دوباره تولید می‌کنه.

## چطور سایت رو ببینم؟
چون فایل‌ها به هم لینک شدن (نه همه تو یه فایل)، باید با یه سرور محلی سبک باز بشه، نه صرفاً دابل‌کلیک:
```
python3 -m http.server 8000
```
بعد تو مرورگر برو به: http://localhost:8000

## نکته مهم
عکس محصولات فعلاً لوگوی زیمیران هست (جای‌خالی). برای جایگزینی، تو `products-data.js`
برای هر محصول یه فیلد `image:'path/to/photo.jpg'` اضافه کن، بعد اسکریپت بالا رو دوباره اجرا کن.
