/* ==========================================================
   SIEMIRAN — Product Database
   Edit this file to add/change products. Each product is a plain
   JS object. Fields:
     cat        - category code: PLC, IO, CP, FM, IM, HMI, DRIVE, POWER, INST
     series     - e.g. 'S7-300' (optional, used for PLC/IO/CP/FM/IM sub-filtering)
     subfamily  - e.g. 'Standard', 'Fail-Safe' (optional)
     code       - official part number (also used to build the product's own page filename)
     nameFa/nameEn, descFa/descEn - bilingual name & short description
     specs      - array of {faK,enK,faV,enV} technical spec rows
     datasheetUrl - link to official Siemens PDF datasheet
     related    - array of other product `code`s this one is related to
     image      - path to a real product photo; leave unset to show the Siemiran logo placeholder
========================================================== */

const PRODUCTS = [
  {cat:'PLC', series:'S7-300', subfamily:'Standard', code:'6ES7315-2EH14-0AB0', nameFa:'CPU315-2 PN/DP', nameEn:'CPU315-2 PN/DP', descFa:'پردازنده استاندارد سری S7-300 با پورت PROFINET و PROFIBUS DP.', descEn:'Standard S7-300 CPU with PROFINET and PROFIBUS DP ports.',
    specs:[
      {faK:'حافظه کاری', enK:'Work memory', faV:'۳۸۴ کیلوبایت', enV:'384 KB'},
      {faK:'رابط ۱', enK:'1st interface', faV:'MPI/DP، سرعت ۱۲ مگابیت/ثانیه', enV:'MPI/DP, 12 Mbit/s'},
      {faK:'رابط ۲', enK:'2nd interface', faV:'اترنت PROFINET با سوییچ ۲ پورت', enV:'Ethernet PROFINET, 2-port switch'},
      {faK:'ولتاژ تغذیه', enK:'Supply voltage', faV:'۲۴ ولت DC', enV:'24 V DC'},
      {faK:'کارت حافظه', enK:'Memory card', faV:'Micro Memory Card (الزامی)', enV:'Micro Memory Card required'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7315-2EH14-0AB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-300', subfamily:'Standard', code:'6ES7317-2EK14-0AB0', nameFa:'CPU317-2 PN/DP', nameEn:'CPU317-2 PN/DP', descFa:'پردازنده قدرتمند برای پروژه‌های بزرگ با حافظه و سرعت بالا.', descEn:'High-performance CPU for large projects with extended memory.',
    specs:[
      {faK:'حافظه کاری', enK:'Work memory', faV:'۱۰۲۴ کیلوبایت (۱ مگابایت)', enV:'1024 KB (1 MB)'},
      {faK:'رابط ۱', enK:'1st interface', faV:'MPI/DP، سرعت ۱۲ مگابیت/ثانیه', enV:'MPI/DP, 12 Mbit/s'},
      {faK:'رابط ۲', enK:'2nd interface', faV:'اترنت PROFINET با سوییچ ۲ پورت', enV:'Ethernet PROFINET, 2-port switch'},
      {faK:'توان مصرفی', enK:'Power loss', faV:'حدود ۴.۶۵ وات', enV:'Typ. 4.65 W'},
      {faK:'کارت حافظه', enK:'Memory card', faV:'Micro Memory Card تا ۸ مگابایت', enV:'Micro Memory Card, max. 8 MB'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7317-2EK14-0AB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-300', subfamily:'Fail-Safe', code:'6ES7315-6FF04-0AB0', nameFa:'CPU315F-2 DP (Fail Safe)', nameEn:'CPU315F-2 DP (Fail Safe)', descFa:'پردازنده ایمنی برای کاربردهای حساس با نیاز به استاندارد SIL.', descEn:'Safety CPU for SIL-rated critical applications.',
    specs:[
      {faK:'حافظه کاری', enK:'Work memory', faV:'۳۸۴ کیلوبایت', enV:'384 KB'},
      {faK:'نوع', enK:'Type', faV:'ایمنی (Fail-Safe) با قابلیت SIL', enV:'Fail-Safe, SIL-capable'},
      {faK:'رابط', enK:'Interface', faV:'MPI/DP', enV:'MPI/DP'},
      {faK:'تغذیه یکپارچه', enK:'Integrated supply', faV:'۲۴ ولت DC', enV:'24 V DC'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7315-6FF04-0AB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-300', subfamily:'Technology', code:'6ES7315-7TJ10-0AB0', nameFa:'CPU315T-3 PN/DP (Technology)', nameEn:'CPU315T-3 PN/DP (Technology)', descFa:'پردازنده تکنولوژی با قابلیت کنترل حرکت و موقعیت‌دهی.', descEn:'Technology CPU with motion control and positioning capability.',
    specs:[
      {faK:'حافظه کاری', enK:'Work memory', faV:'۳۸۴ کیلوبایت', enV:'384 KB'},
      {faK:'رابط ۱', enK:'1st interface', faV:'MPI/DP، سرعت ۱۲ مگابیت/ثانیه', enV:'MPI/DP, 12 Mbit/s'},
      {faK:'رابط ۲', enK:'2nd interface', faV:'DP (Drive) اختصاصی', enV:'Dedicated DP (Drive)'},
      {faK:'رابط ۳', enK:'3rd interface', faV:'اترنت PROFINET با سوییچ ۲ پورت', enV:'Ethernet PROFINET, 2-port switch'},
      {faK:'کارت حافظه', enK:'Memory card', faV:'Micro Memory Card حداقل ۸ مگابایت', enV:'Micro Memory Card, min. 8 MB'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7315-7TJ10-0AB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-300', subfamily:'Compact', code:'6ES7313-6CG04-0AB0', nameFa:'CPU313C-2 PtP (Compact)', nameEn:'CPU313C-2 PtP (Compact)', descFa:'پردازنده کامپکت با ورودی/خروجی توکار، مناسب پروژه‌های کوچک با فضای محدود.', descEn:'Compact CPU with onboard I/O, ideal for small projects with limited panel space.',
    specs:[
      {faK:'حافظه کاری', enK:'Work memory', faV:'۶۴ کیلوبایت', enV:'64 KB'},
      {faK:'ورودی/خروجی توکار', enK:'Onboard I/O', faV:'۲۴ ورودی دیجیتال، ۱۶ خروجی دیجیتال، ۵ ورودی آنالوگ', enV:'24 DI, 16 DO, 5 AI'},
      {faK:'رابط', enK:'Interface', faV:'MPI/DP و پورت PtP', enV:'MPI/DP and PtP port'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7313-6CG04-0AB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-400', subfamily:'Standard', code:'6ES7412-2EK07-0AB0', nameFa:'CPU412-2 PN — سری S7-400', nameEn:'CPU412-2 PN — S7-400 Series', descFa:'پردازنده میان‌رده سری S7-400 برای پروژه‌های صنعتی بزرگ با نیاز به پردازش بالا.', descEn:'Mid-range S7-400 series CPU for large industrial projects with high processing needs.',
    specs:[
      {faK:'حافظه کاری', enK:'Work memory', faV:'۱ مگابایت (۰.۵ مگابایت کد + ۰.۵ مگابایت داده)', enV:'1 MB (0.5 MB code + 0.5 MB data)'},
      {faK:'رابط ۱', enK:'1st interface', faV:'MPI/DP، سرعت ۱۲ مگابیت/ثانیه', enV:'MPI/DP, 12 Mbit/s'},
      {faK:'رابط ۲', enK:'2nd interface', faV:'اترنت PROFINET', enV:'Ethernet/PROFINET'},
      {faK:'وزن', enK:'Weight', faV:'حدود ۰.۹۸ کیلوگرم', enV:'Approx. 0.98 kg'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7412-2EK07-0AB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-1200', subfamily:'Standard', code:'6ES7211-1AE40-0XB0', nameFa:'CPU1211C DC/DC/DC', nameEn:'CPU1211C DC/DC/DC', descFa:'کوچک‌ترین پردازنده کامپکت سری S7-1200 برای پروژه‌های ساده.', descEn:'Smallest compact S7-1200 CPU for simple applications.',
    specs:[
      {faK:'حافظه برنامه/داده', enK:'Program/data memory', faV:'۷۵ کیلوبایت', enV:'75 KB'},
      {faK:'ورودی/خروجی توکار', enK:'Onboard I/O', faV:'۶ ورودی دیجیتال، ۴ خروجی دیجیتال، ۲ ورودی آنالوگ', enV:'6 DI, 4 DO, 2 AI (0-10V)'},
      {faK:'رابط ارتباطی', enK:'Interface', faV:'PROFINET', enV:'PROFINET'},
      {faK:'محدوده دمای کاری', enK:'Operating temperature', faV:'−۲۰ تا ۶۰ درجه سانتی‌گراد', enV:'−20°C to 60°C'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7211-1AE40-0XB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-1200', subfamily:'Standard', code:'6ES7215-1AG40-0XB0', nameFa:'CPU1215C DC/DC/DC', nameEn:'CPU1215C DC/DC/DC', descFa:'پردازنده میان‌رده با ورودی/خروجی توکار و قابلیت توسعه بالا.', descEn:'Mid-range CPU with onboard I/O and high expandability.',
    specs:[
      {faK:'حافظه برنامه/داده', enK:'Program/data memory', faV:'۲۰۰ کیلوبایت', enV:'200 KB'},
      {faK:'ورودی/خروجی توکار', enK:'Onboard I/O', faV:'۱۴ ورودی دیجیتال، ۱۰ خروجی دیجیتال، ۲ ورودی و ۲ خروجی آنالوگ', enV:'14 DI, 10 DO, 2 AI, 2 AO'},
      {faK:'رابط ارتباطی', enK:'Interface', faV:'۲ پورت PROFINET', enV:'2× PROFINET ports'},
      {faK:'ولتاژ تغذیه', enK:'Supply voltage', faV:'۲۰.۴ تا ۲۸.۸ ولت DC', enV:'20.4–28.8 V DC'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7215-1AG40-0XB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-1200', subfamily:'Fail-Safe', code:'6ES7215-1AF40-0XB0', nameFa:'CPU1215FC DC/DC/DC (Fail Safe)', nameEn:'CPU1215FC DC/DC/DC (Fail Safe)', descFa:'نسخه ایمنی CPU1215 با قابلیت‌های Fail-Safe برای کاربردهای حساس.', descEn:'Fail-Safe version of CPU1215 for safety-critical applications.',
    specs:[
      {faK:'حافظه برنامه/داده', enK:'Program/data memory', faV:'۲۰۰ کیلوبایت', enV:'200 KB'},
      {faK:'نوع', enK:'Type', faV:'ایمنی (Fail-Safe) تا SIL2/PLd', enV:'Fail-Safe, up to SIL2/PLd'},
      {faK:'رابط ارتباطی', enK:'Interface', faV:'۲ پورت PROFINET', enV:'2× PROFINET ports'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7215-1AF40-0XB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-1500', subfamily:'Standard', code:'6ES7517-3AP00-0AB0', nameFa:'CPU1517-3 PN/DP — سری S7-1500', nameEn:'CPU1517-3 PN/DP — S7-1500 Series', descFa:'پردازنده نسل جدید S7-1500 با سرعت پردازش بالا و دو رابط PROFINET/PROFIBUS.', descEn:'Next-generation S7-1500 CPU with high processing speed and dual PROFINET/PROFIBUS interfaces.',
    specs:[
      {faK:'حافظه برنامه', enK:'Program memory', faV:'۲ مگابایت', enV:'2 MB'},
      {faK:'حافظه داده', enK:'Data memory', faV:'۸ مگابایت', enV:'8 MB'},
      {faK:'رابط ۱', enK:'1st interface', faV:'PROFINET IRT با سوییچ ۲ پورت', enV:'PROFINET IRT, 2-port switch'},
      {faK:'رابط ۲', enK:'2nd interface', faV:'PROFINET RT', enV:'PROFINET RT'},
      {faK:'رابط ۳', enK:'3rd interface', faV:'PROFIBUS', enV:'PROFIBUS'},
      {faK:'سرعت پردازش بیتی', enK:'Bit performance', faV:'۲ نانوثانیه', enV:'2 ns'},
      {faK:'کارت حافظه', enK:'Memory card', faV:'SIMATIC Memory Card (الزامی)', enV:'SIMATIC Memory Card required'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7517-3AP00-0AB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-1500', subfamily:'Standard', code:'6ES7515-2AM01-0AB0', nameFa:'CPU1515-2 PN — سری S7-1500', nameEn:'CPU1515-2 PN — S7-1500 Series', descFa:'پردازنده استاندارد S7-1500 با کارایی بالا برای اتوماسیون پیشرفته.', descEn:'Standard high-performance S7-1500 CPU for advanced automation.',
    specs:[
      {faK:'حافظه برنامه', enK:'Program memory', faV:'۵۰۰ کیلوبایت', enV:'500 KB'},
      {faK:'حافظه داده', enK:'Data memory', faV:'۳ مگابایت', enV:'3 MB'},
      {faK:'رابط', enK:'Interface', faV:'PROFINET/Ethernet با سوییچ ۲ پورت (پشتیبانی IRT)', enV:'PROFINET/Ethernet, 2-port switch (IRT support)'},
      {faK:'کارت حافظه', enK:'Memory card', faV:'SIMATIC Memory Card (الزامی)', enV:'SIMATIC Memory Card required'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7515-2AM01-0AB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-1500', subfamily:'Technology', code:'6ES7511-4TK00-0AB0', nameFa:'CPU1511T-1 PN (Technology)', nameEn:'CPU1511T-1 PN (Technology)', descFa:'پردازنده تکنولوژی S7-1500 با قابلیت کنترل حرکت پیشرفته (Motion Control).', descEn:'S7-1500 Technology CPU with advanced motion control capability.',
    specs:[
      {faK:'حافظه برنامه', enK:'Program memory', faV:'۲۰۰ کیلوبایت', enV:'200 KB'},
      {faK:'قابلیت حرکت', enK:'Motion capability', faV:'کنترل تا ۵۰ محور', enV:'Up to 50 axes control'},
      {faK:'رابط', enK:'Interface', faV:'PROFINET IRT با سوییچ ۲ پورت', enV:'PROFINET IRT, 2-port switch'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7511-4TK00-0AB0&language=en&caller=SIOS'},
  {cat:'PLC', series:'S7-1500', subfamily:'Fail-Safe', code:'6ES7515-2FM01-0AB0', nameFa:'CPU1515F-2 PN (Fail Safe)', nameEn:'CPU1515F-2 PN (Fail Safe)', descFa:'پردازنده ایمنی S7-1500 با قابلیت SIL3/PLe برای پروژه‌های حیاتی.', descEn:'S7-1500 Fail-Safe CPU rated up to SIL3/PLe for critical projects.',
    specs:[
      {faK:'حافظه برنامه', enK:'Program memory', faV:'۵۰۰ کیلوبایت', enV:'500 KB'},
      {faK:'نوع', enK:'Type', faV:'ایمنی (Fail-Safe) تا SIL3/PLe', enV:'Fail-Safe, up to SIL3/PLe'},
      {faK:'رابط', enK:'Interface', faV:'PROFINET/Ethernet با سوییچ ۲ پورت', enV:'PROFINET/Ethernet, 2-port switch'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7515-2FM01-0AB0&language=en&caller=SIOS'},
  {cat:'IO', series:'S7-300', subfamily:'Digital Input', code:'6ES7321-1BH02-0AA0', nameFa:'SM321 — ورودی دیجیتال ۱۶ کانال', nameEn:'SM321 — 16ch Digital Input', descFa:'ماژول ورودی دیجیتال ۲۴ ولت DC با ۱۶ کانال مستقل.', descEn:'24VDC digital input module with 16 independent channels.',
    specs:[
      {faK:'تعداد کانال', enK:'Channels', faV:'۱۶ ورودی دیجیتال', enV:'16 digital inputs'},
      {faK:'ولتاژ نامی', enK:'Rated voltage', faV:'۲۴ ولت DC', enV:'24 V DC'},
      {faK:'زمان تاخیر ورودی', enK:'Input delay', faV:'قابل تنظیم ۰.۵ تا ۱۵ میلی‌ثانیه', enV:'Adjustable 0.5–15 ms'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7321-1BH02-0AA0&language=en&caller=SIOS', related:['6ES7315-2EH14-0AB0','6ES7317-2EK14-0AB0','6ES7315-6FF04-0AB0']},
  {cat:'IO', series:'S7-300', subfamily:'Digital Output', code:'6ES7322-1BH01-0AA0', nameFa:'SM322 — خروجی دیجیتال ۱۶ کانال', nameEn:'SM322 — 16ch Digital Output', descFa:'ماژول خروجی دیجیتال ۲۴ ولت DC با جریان ۰.۵ آمپر.', descEn:'24VDC digital output module rated at 0.5A per channel.',
    specs:[
      {faK:'تعداد کانال', enK:'Channels', faV:'۱۶ خروجی دیجیتال', enV:'16 digital outputs'},
      {faK:'جریان خروجی', enK:'Output current', faV:'۰.۵ آمپر به ازای هر کانال', enV:'0.5 A per channel'},
      {faK:'ولتاژ نامی', enK:'Rated voltage', faV:'۲۴ ولت DC', enV:'24 V DC'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7322-1BH01-0AA0&language=en&caller=SIOS', related:['6ES7315-2EH14-0AB0','6ES7317-2EK14-0AB0']},
  {cat:'IO', series:'S7-300', subfamily:'Analog Input', code:'6ES7331-7KF02-0AB0', nameFa:'SM331 — ورودی آنالوگ ۸ کانال', nameEn:'SM331 — 8ch Analog Input', descFa:'ماژول ورودی آنالوگ با دقت ۱۳ بیت برای سیگنال‌های فرآیندی.', descEn:'13-bit analog input module for process signals.',
    specs:[
      {faK:'تعداد کانال', enK:'Channels', faV:'۸ ورودی آنالوگ', enV:'8 analog inputs'},
      {faK:'دقت', enK:'Resolution', faV:'۱۳ بیت', enV:'13-bit'},
      {faK:'انواع سیگنال', enK:'Signal types', faV:'ولتاژ، جریان، مقاومت، ترموکوپل', enV:'Voltage, current, resistance, thermocouple'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7331-7KF02-0AB0&language=en&caller=SIOS', related:['6ES7315-2EH14-0AB0','6ES7317-2EK14-0AB0']},
  {cat:'IO', series:'S7-300', subfamily:'Analog Output', code:'6ES7332-5HD01-0AB0', nameFa:'SM332 — خروجی آنالوگ ۴ کانال', nameEn:'SM332 — 4ch Analog Output', descFa:'ماژول خروجی آنالوگ ۱۲ بیتی برای کنترل عملگرهای فرآیندی.', descEn:'12-bit analog output module for process actuators.',
    specs:[
      {faK:'تعداد کانال', enK:'Channels', faV:'۴ خروجی آنالوگ', enV:'4 analog outputs'},
      {faK:'دقت', enK:'Resolution', faV:'۱۲ بیت', enV:'12-bit'},
      {faK:'انواع خروجی', enK:'Output types', faV:'ولتاژ یا جریان', enV:'Voltage or current'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7332-5HD01-0AB0&language=en&caller=SIOS', related:['6ES7315-2EH14-0AB0','6ES7317-2EK14-0AB0']},
  {cat:'IO', series:'S7-1200', subfamily:'Digital Input', code:'6ES7221-1BH32-0XB0', nameFa:'SM1221 — ورودی دیجیتال S7-1200', nameEn:'SM1221 — Digital Input S7-1200', descFa:'ماژول توسعه ورودی دیجیتال ۱۶ کانال برای سری S7-1200.', descEn:'16-channel digital input expansion module for S7-1200.',
    specs:[
      {faK:'تعداد کانال', enK:'Channels', faV:'۱۶ ورودی دیجیتال', enV:'16 digital inputs'},
      {faK:'ولتاژ نامی', enK:'Rated voltage', faV:'۲۴ ولت DC', enV:'24 V DC'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7221-1BH32-0XB0&language=en&caller=SIOS', related:['6ES7211-1AE40-0XB0','6ES7215-1AG40-0XB0']},
  {cat:'CP', series:'S7-300', subfamily:'Serial', code:'6ES7340-1AH02-0AE0', nameFa:'CP340 — پردازنده ارتباطی RS232C', nameEn:'CP340 — RS232C Communication Processor', descFa:'کارت ارتباطی برای اتصال نقطه‌به‌نقطه (Point-to-Point) از طریق رابط سریال RS232C.', descEn:'Communication processor for point-to-point connections via RS232C serial interface.',
    specs:[
      {faK:'نوع رابط', enK:'Interface type', faV:'RS232C', enV:'RS232C'},
      {faK:'کاربرد', enK:'Application', faV:'ارتباط سریال Point-to-Point', enV:'Point-to-point serial communication'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7340-1AH02-0AE0&language=en&caller=SIOS', related:['6ES7315-2EH14-0AB0','6ES7317-2EK14-0AB0']},
  {cat:'CP', series:'S7-300', subfamily:'Serial', code:'6ES7341-1CH02-0AE0', nameFa:'CP341 — پردازنده ارتباطی RS422/485', nameEn:'CP341 — RS422/485 Communication Processor', descFa:'کارت ارتباطی سریال با رابط RS422/485 برای ارتباطات صنعتی راه دور.', descEn:'Serial communication processor with RS422/485 interface for long-distance industrial links.',
    specs:[
      {faK:'نوع رابط', enK:'Interface type', faV:'RS422/RS485', enV:'RS422/RS485'},
      {faK:'کاربرد', enK:'Application', faV:'ارتباط سریال راه دور', enV:'Long-distance serial communication'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7341-1CH02-0AE0&language=en&caller=SIOS', related:['6ES7315-2EH14-0AB0']},
  {cat:'CP', series:'S7-300', subfamily:'Ethernet', code:'6GK7343-1EX30-0XE0', nameFa:'CP343-1 — پردازنده ارتباطی صنعتی اترنت', nameEn:'CP343-1 — Industrial Ethernet Communication Processor', descFa:'کارت ارتباطی اترنت صنعتی برای CPUهای بدون پورت PN، با پشتیبانی TCP/IP و ارتباط S7.', descEn:'Industrial Ethernet CP for CPUs without a PN port, supporting TCP/IP and S7 communication.',
    specs:[
      {faK:'نوع رابط', enK:'Interface type', faV:'Industrial Ethernet، ۲ پورت RJ45', enV:'Industrial Ethernet, 2× RJ45 ports'},
      {faK:'پروتکل‌ها', enK:'Protocols', faV:'TCP/IP، S7 Communication', enV:'TCP/IP, S7 communication'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6GK7343-1EX30-0XE0&language=en&caller=SIOS', related:['6ES7315-2EH14-0AB0']},
  {cat:'CP', series:'S7-300', subfamily:'PROFIBUS', code:'6GK7342-5DA03-0XE0', nameFa:'CP342-5 — پردازنده ارتباطی PROFIBUS DP', nameEn:'CP342-5 — PROFIBUS DP Communication Processor', descFa:'کارت ارتباطی PROFIBUS DP اضافی، برای زمانی که پورت DP داخلی CPU اشغال یا کافی نیست.', descEn:'Additional PROFIBUS DP communication processor for when the CPU\'s onboard DP port is occupied or insufficient.',
    specs:[
      {faK:'نوع رابط', enK:'Interface type', faV:'PROFIBUS DP', enV:'PROFIBUS DP'},
      {faK:'سرعت انتقال', enK:'Transfer rate', faV:'تا ۱۲ مگابیت/ثانیه', enV:'Up to 12 Mbit/s'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6GK7342-5DA03-0XE0&language=en&caller=SIOS', related:['6ES7317-2EK14-0AB0']},
  {cat:'FM', series:'S7-300', subfamily:'Counter', code:'6ES7350-1AH03-0AE0', nameFa:'FM350-1 — ماژول شمارنده تک‌کاناله', nameEn:'FM350-1 — Single-Channel Counter Module', descFa:'ماژول شمارنده هوشمند تک‌کاناله تا فرکانس ۵۰۰ کیلوهرتز برای اینکودرهای ۵ و ۲۴ ولت.', descEn:'Intelligent single-channel counter module up to 500 kHz for 5V and 24V encoders.',
    specs:[
      {faK:'تعداد کانال', enK:'Channels', faV:'۱ کانال شمارش', enV:'1 counting channel'},
      {faK:'فرکانس حداکثر', enK:'Max frequency', faV:'۵۰۰ کیلوهرتز', enV:'500 kHz'},
      {faK:'کاربرد', enK:'Application', faV:'شمارش، اندازه‌گیری فرکانس و دوز', enV:'Counting, frequency measurement, dosing'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7350-1AH03-0AE0&language=en&caller=SIOS', related:['6ES7315-2EH14-0AB0','6ES7317-2EK14-0AB0']},
  {cat:'FM', series:'S7-300', subfamily:'Counter', code:'6ES7350-2AH01-0AE0', nameFa:'FM350-2 — ماژول شمارنده ۸ کاناله', nameEn:'FM350-2 — 8-Channel Counter Module', descFa:'ماژول شمارنده هوشمند ۸ کاناله برای کاربردهای گسترده شمارش و اندازه‌گیری.', descEn:'Intelligent 8-channel counter module for extensive counting and measuring tasks.',
    specs:[
      {faK:'تعداد کانال', enK:'Channels', faV:'۸ کانال شمارش', enV:'8 counting channels'},
      {faK:'فرکانس حداکثر', enK:'Max frequency', faV:'۲۰ کیلوهرتز', enV:'20 kHz'},
      {faK:'کاربرد', enK:'Application', faV:'شمارش، اندازه‌گیری فرکانس، سرعت و دوره تناوب', enV:'Counting, frequency, speed and period measurement'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7350-2AH01-0AE0&language=en&caller=SIOS', related:['6ES7317-2EK14-0AB0']},
  {cat:'FM', series:'S7-300', subfamily:'Positioning', code:'6ES7351-1AH02-0AE0', nameFa:'FM351 — ماژول موقعیت‌دهی', nameEn:'FM351 — Positioning Module', descFa:'ماژول کنترل موقعیت برای محورهای پله‌ای (Stepper) و سروو با بازخورد انکودر.', descEn:'Positioning control module for stepper and servo axes with encoder feedback.',
    specs:[
      {faK:'نوع کنترل', enK:'Control type', faV:'موقعیت‌دهی تک‌محوره', enV:'Single-axis positioning'},
      {faK:'سازگاری', enK:'Compatibility', faV:'محرک پله‌ای و سروو با بازخورد انکودر', enV:'Stepper and servo drives with encoder feedback'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7351-1AH02-0AE0&language=en&caller=SIOS', related:['6ES7315-7TJ10-0AB0']},
  {cat:'IM', series:'S7-300', subfamily:'ET200M Interface', code:'6ES7153-1AA03-0XB0', nameFa:'IM153-1 — ماژول رابط ET200M', nameEn:'IM153-1 — ET200M Interface Module', descFa:'ماژول رابط استاندارد برای اتصال ایستگاه‌های توزیع‌شده ET200M از طریق PROFIBUS DP.', descEn:'Standard interface module for connecting ET200M distributed I/O stations via PROFIBUS DP.',
    specs:[
      {faK:'نوع رابط', enK:'Interface type', faV:'PROFIBUS DP', enV:'PROFIBUS DP'},
      {faK:'کاربرد', enK:'Application', faV:'اتصال ایستگاه توزیع‌شده ET200M', enV:'ET200M distributed I/O station connection'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7153-1AA03-0XB0&language=en&caller=SIOS', related:['6ES7315-2EH14-0AB0']},
  {cat:'IM', series:'S7-300', subfamily:'ET200M Interface', code:'6ES7153-2BA02-0XB0', nameFa:'IM153-2 HF — ماژول رابط پیشرفته ET200M', nameEn:'IM153-2 HF — Advanced ET200M Interface Module', descFa:'ماژول رابط High Feature با پشتیبانی از حداکثر ۱۲ ماژول S7-300، قابلیت‌های ردانسی و تایم‌استمپ.', descEn:'High Feature interface module supporting up to 12 S7-300 modules, with redundancy and time-stamping.',
    specs:[
      {faK:'نوع رابط', enK:'Interface type', faV:'PROFIBUS DP، تا ۱۲ مگابیت/ثانیه', enV:'PROFIBUS DP, up to 12 Mbit/s'},
      {faK:'ظرفیت', enK:'Capacity', faV:'حداکثر ۱۲ ماژول S7-300', enV:'Up to 12 S7-300 modules'},
      {faK:'قابلیت‌ها', enK:'Features', faV:'ردانسی، تایم‌استمپ، Hot Swap', enV:'Redundancy, time-stamping, hot-swap'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6ES7153-2BA02-0XB0&language=en&caller=SIOS', related:['6ES7317-2EK14-0AB0']},
  {cat:'HMI', series:'HMI', subfamily:'Basic', code:'6AV2123-2GB03-0AX0', nameFa:'KTP700 Basic — پنل لمسی ۷ اینچ', nameEn:'KTP700 Basic — 7" Touch Panel', descFa:'پنل اپراتوری لمسی پایه با پورت PROFINET، مناسب کاربردهای ساده.', descEn:'Basic touch operator panel with PROFINET, for simple applications.',
    specs:[
      {faK:'اندازه صفحه', enK:'Display size', faV:'۷ اینچ TFT، ۶۵۵۳۶ رنگ', enV:'7" TFT, 65,536 colors'},
      {faK:'رابط', enK:'Interface', faV:'PROFINET', enV:'PROFINET'},
      {faK:'نرم‌افزار پیکربندی', enK:'Configuration software', faV:'WinCC Basic (TIA Portal)', enV:'WinCC Basic (TIA Portal)'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6AV2123-2GB03-0AX0&language=en&caller=SIOS'},
  {cat:'HMI', series:'HMI', subfamily:'Comfort', code:'6AV2124-0MC01-0AX0', nameFa:'TP1200 Comfort — پنل لمسی ۱۲ اینچ', nameEn:'TP1200 Comfort — 12" Touch Panel', descFa:'پنل لمسی پیشرفته با گرافیک باکیفیت و قابلیت اسکریپت‌نویسی.', descEn:'Advanced touch panel with high-quality graphics and scripting.',
    specs:[
      {faK:'اندازه صفحه', enK:'Display size', faV:'۱۲ اینچ TFT، ۱۶ میلیون رنگ', enV:'12" TFT, 16M colors'},
      {faK:'رابط', enK:'Interface', faV:'PROFINET و MPI/PROFIBUS-DP', enV:'PROFINET and MPI/PROFIBUS-DP'},
      {faK:'حافظه پیکربندی', enK:'Configuration memory', faV:'۱۲ مگابایت', enV:'12 MB'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6AV2124-0MC01-0AX0&language=en&caller=SIOS'},
  {cat:'HMI', series:'HMI', subfamily:'Comfort', code:'6AV2124-0QC02-0AX0', nameFa:'TP1500 Comfort — پنل لمسی ۱۵ اینچ', nameEn:'TP1500 Comfort — 15" Touch Panel', descFa:'پنل بزرگ برای نمایش گرافیکی پیچیده فرآیندهای صنعتی.', descEn:'Large panel for complex industrial process visualization.',
    specs:[
      {faK:'اندازه صفحه', enK:'Display size', faV:'۱۵ اینچ TFT، ۱۶ میلیون رنگ', enV:'15" TFT, 16M colors'},
      {faK:'رابط', enK:'Interface', faV:'PROFINET و MPI/PROFIBUS-DP', enV:'PROFINET and MPI/PROFIBUS-DP'},
      {faK:'حافظه پیکربندی', enK:'Configuration memory', faV:'۲۴ مگابایت', enV:'24 MB'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6AV2124-0QC02-0AX0&language=en&caller=SIOS'},
  {cat:'HMI', series:'HMI', subfamily:'Mobile', code:'6AV2125-2JB03-0AX0', nameFa:'KTP900F Mobile — پنل لمسی سیار ۹ اینچ', nameEn:'KTP900F Mobile — 9" Mobile Touch Panel', descFa:'پنل لمسی سیار برای دسترسی ایمن اپراتور در نزدیکی ماشین‌آلات متحرک.', descEn:'Mobile touch panel for safe operator access near moving machinery.',
    specs:[
      {faK:'اندازه صفحه', enK:'Display size', faV:'۹ اینچ TFT', enV:'9" TFT'},
      {faK:'نوع', enK:'Type', faV:'سیار (Mobile) با کلید توقف اضطراری', enV:'Mobile, with emergency-stop switch'},
      {faK:'رابط', enK:'Interface', faV:'PROFINET', enV:'PROFINET'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6AV2125-2JB03-0AX0&language=en&caller=SIOS'},
  {cat:'HMI', series:'HMI', subfamily:'Panel PC', code:'6AV7884-5AB10-6BA0', nameFa:'IPC477E — پنل PC صنعتی ۱۵ اینچ', nameEn:'IPC477E — 15" Industrial Panel PC', descFa:'پنل کامپیوتر صنعتی برای کاربردهای سنگین و SCADA.', descEn:'Industrial panel PC for heavy-duty and SCADA applications.',
    specs:[
      {faK:'اندازه صفحه', enK:'Display size', faV:'۱۵ اینچ TFT لمسی', enV:'15" TFT touch'},
      {faK:'کاربرد', enK:'Application', faV:'SCADA و کنترل نظارتی سطح بالا', enV:'SCADA and high-level supervisory control'},
      {faK:'سیستم‌عامل', enK:'Operating system', faV:'Windows 10 IoT Enterprise', enV:'Windows 10 IoT Enterprise'},
    ], datasheetUrl:'https://support.industry.siemens.com/teddatasheet/?format=pdf&mlfbs=6AV7884-5AB10-6BA0&language=en&caller=SIOS'},
  {cat:'DRIVE', code:'6SL3210-5BE21-5UV0', nameFa:'SINAMICS V20 — اینورتر ۱.۵ کیلووات', nameEn:'SINAMICS V20 — 1.5kW Inverter', descFa:'اینورتر پایه و اقتصادی برای کاربردهای ساده پمپ و فن، با راه‌اندازی سریع.', descEn:'Basic, cost-effective inverter for simple pump and fan applications with fast setup.'},
  {cat:'DRIVE', code:'6SL3210-5BE23-0UV0', nameFa:'SINAMICS V20 — اینورتر ۳ کیلووات', nameEn:'SINAMICS V20 — 3kW Inverter', descFa:'اینورتر اقتصادی سری V20 برای موتورهای با توان متوسط.', descEn:'Economical V20 series inverter for mid-power motors.'},
  {cat:'DRIVE', code:'6SL3210-1KE15-8AF2', nameFa:'SINAMICS G120C — اینورتر کامپکت ۲.۲ کیلووات', nameEn:'SINAMICS G120C — 2.2kW Compact Inverter', descFa:'اینورتر کامپکت همه‌کاره با PROFINET، مناسب نوار نقاله و سیستم‌های انباری.', descEn:'All-purpose compact inverter with PROFINET, ideal for conveyors and storage systems.'},
  {cat:'DRIVE', code:'6SL3210-1KE17-5AF1', nameFa:'SINAMICS G120C — اینورتر کامپکت ۳ کیلووات', nameEn:'SINAMICS G120C — 3kW Compact Inverter', descFa:'اینورتر کامپکت با ایمنی Safe Torque Off یکپارچه و ارتباط PROFINET.', descEn:'Compact inverter with integrated Safe Torque Off and PROFINET communication.'},
  {cat:'DRIVE', code:'6SL3210-5HE11-0UF0', nameFa:'SINAMICS S210 — سروو درایو ۱ کیلووات', nameEn:'SINAMICS S210 — 1kW Servo Drive', descFa:'سروو درایو دقیق برای کنترل حرکت و موقعیت‌دهی با دقت بالا.', descEn:'Precision servo drive for high-accuracy motion control and positioning.'},
  {cat:'DRIVE', code:'6SL3210-5HE12-0UF0', nameFa:'SINAMICS S210 — سروو درایو ۲ کیلووات', nameEn:'SINAMICS S210 — 2kW Servo Drive', descFa:'سروو درایو با کابل اتصال یکپارچه (OCC) برای ماشین‌آلات صنعتی پیشرفته.', descEn:'Servo drive with One Cable Connection (OCC) for advanced industrial machinery.'},
  {cat:'POWER', code:'ACB-Series', nameFa:'کلید هوایی (ACB)', nameEn:'Air Circuit Breaker (ACB)', descFa:'کلید هوایی قابل تنظیم برای حفاظت تابلوهای برق فشار ضعیف.', descEn:'Adjustable air circuit breaker for LV switchgear protection.'},
  {cat:'POWER', code:'MCCB-Series', nameFa:'کلید کامپکت (MCCB)', nameEn:'Compact Circuit Breaker (MCCB)', descFa:'کلید کامپکت با قابلیت تنظیم جریان برای مدارهای صنعتی.', descEn:'Adjustable-trip compact breaker for industrial circuits.'},
  {cat:'POWER', code:'MCB-Series', nameFa:'کلید مینیاتوری (MCB)', nameEn:'Miniature Circuit Breaker (MCB)', descFa:'کلید حفاظتی مینیاتوری برای مدارهای روشنایی و توزیع برق.', descEn:'Miniature protective breaker for lighting and distribution circuits.'},
  {cat:'POWER', code:'6ES7307-1EA00-0AA0', nameFa:'PS307 — منبع تغذیه ۵ آمپر', nameEn:'PS307 — 5A Power Supply', descFa:'منبع تغذیه استاندارد ۲۴ ولت برای رک‌های S7-300.', descEn:'Standard 24V power supply for S7-300 racks.'},
  {cat:'INST', code:'FLOW-EH', nameFa:'سنسور اندازه‌گیری دبی', nameEn:'Flow Measurement Sensor', descFa:'ترانسمیتر دبی Endress+Hauser برای سیالات و گازهای صنعتی.', descEn:'Endress+Hauser flow transmitter for industrial fluids and gases.'},
  {cat:'INST', code:'LEVEL-EH', nameFa:'ترانسمیتر سطح', nameEn:'Level Transmitter', descFa:'اندازه‌گیری دقیق سطح مخازن با تکنولوژی رادار یا فراصوت.', descEn:'Precise tank level measurement using radar or ultrasonic technology.'},
  {cat:'INST', code:'PRESS-EH', nameFa:'ترانسمیتر فشار', nameEn:'Pressure Transmitter', descFa:'اندازه‌گیری فشار خطوط فرآیندی با دقت و پایداری بالا.', descEn:'High-accuracy, stable pressure measurement for process lines.'},
  {cat:'INST', code:'TEMP-EH', nameFa:'ترانسمیتر دما', nameEn:'Temperature Transmitter', descFa:'سنسور دما RTD/TC با خروجی استاندارد ۴-۲۰ میلی‌آمپر.', descEn:'RTD/TC temperature sensor with standard 4-20mA output.'},
  {cat:'INST', code:'FLUKE-MM', nameFa:'مولتی‌متر صنعتی Fluke', nameEn:'Fluke Industrial Multimeter', descFa:'مولتی‌متر دیجیتال دقیق برای عیب‌یابی تابلوهای برق.', descEn:'Precision digital multimeter for switchgear troubleshooting.'},
  {cat:'INST', code:'475FP1EKLGMT', nameFa:'کامیونیکاتور HART 475', nameEn:'HART 475 Field Communicator', descFa:'کامیونیکاتور دستی Emerson برای پیکربندی و عیب‌یابی دستگاه‌های HART و Foundation Fieldbus.', descEn:'Emerson handheld communicator for configuring and diagnosing HART and Foundation Fieldbus devices.'},
];
