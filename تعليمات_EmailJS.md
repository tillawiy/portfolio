# تعليمات إعداد EmailJS لنموذج الاتصال

## خطوات الإعداد:

### 1. إنشاء حساب على EmailJS
- اذهب إلى: https://www.emailjs.com/
- سجل حساب مجاني
- بعد التسجيل، ستحصل على Public Key

### 2. إضافة خدمة Email
- من Dashboard، اذهب إلى "Email Services"
- اختر "Add New Service"
- اختر مزود البريد الإلكتروني (Gmail, Outlook, إلخ)
- اتبع التعليمات لإضافة حسابك

### 3. إنشاء Template
- اذهب إلى "Email Templates"
- اضغط "Create New Template"
- استخدم المتغيرات التالية:
  - `{{from_name}}` - اسم المرسل
  - `{{from_email}}` - بريد المرسل
  - `{{subject}}` - موضوع الرسالة
  - `{{message}}` - محتوى الرسالة
  - `{{to_email}}` - بريدك الإلكتروني

### 4. تحديث الكود
افتح ملف `index-ar.html` وابحث عن:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

استبدل:
- `YOUR_PUBLIC_KEY` - بمفتاحك العام من Dashboard
- `YOUR_SERVICE_ID` - بمعرف الخدمة من صفحة Email Services
- `YOUR_TEMPLATE_ID` - بمعرف القالب من صفحة Email Templates

### 5. مثال:
```javascript
emailjs.init("abc123xyz");
emailjs.send('service_abc123', 'template_xyz789', {
```

## ملاحظات:
- الخطة المجانية تسمح بـ 200 رسالة شهرياً
- تأكد من تفعيل الخدمة في Dashboard
- اختبر النموذج بعد الإعداد

