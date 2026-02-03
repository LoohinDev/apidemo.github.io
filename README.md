# เริ่มต้นทำ API

อันดับแรกต้องเริ่มจากสร้าง Project

```bash

git  init

npm install express mongoose dotenv helmet cors express-rate-limit bcryptjs jsonwebtoken express-validator

npm install --save-dev nodemon
```
มีดังนี้
- [nodemon](#nodemon)
- [express](#express)
- [mongoose](#mongoose) 
- [dotenv](#dotenv) 
- [helmet](#helmet) 
- [cors](#cors) 
- [express-rate-limit](#express-rate-limit)
- [bcryptjs](#bcryptjs)
- [jsonwebtoken](#jsonwebtoken)
- [express-validator](#express-validator)


# nodemon

ไว้คอย restart reload ให้ Nodejs เวลามีไฟล์อัพเดท 
จะได้ไม่ต้อง stop และ start ตัว project ตลอด

# express

**หน้าที่หลัก**

-   เป็น web framework สำหรับ Node.js
    
-   จัดการ HTTP lifecycle: request → middleware → controller → response
    
-   ทำ routing (GET, POST, PUT, DELETE)
    
-   จัดการ middleware chain

ตัวอย่าง flow:

```text
Client → Express → Middleware → Controller → Response
```

# mongoose
**หน้าที่**

-   เชื่อมต่อ MongoDB
   
-   สร้าง Schema + Model

-   Validation ระดับ database layer

-   Query abstraction
    
-   Middleware (pre/post hooks)

# dotenv
**หน้าที่**  
- โหลด environment variables จากไฟล์ `.env`
- ป้องกัน secret หลุดเข้า git

```text
PORT=5000
MONGO_URI=xxxxx
JWT_SECRET=xxxxx
```

# helmet
**หน้าที่**  
- ตั้งค่า HTTP headers เพื่อป้องกัน attack พื้นฐาน
- ลด attack surface ฝั่ง browser

HTTP header พื้นฐาน
```text
X-Content-Type-Options
X-Frame-Options
Content-Security-Policy
```

# CORS
**หน้าที่**  
กำหนดว่าใครเรียก API เราได้บ้าง

```js
cors({
  origin: "https://myfrontend.com",
  credentials: true
})
```
# express-rate-limit
**หน้าที่**  
จำกัดจำนวน request ต่อ IP
ช่น:

-   100 requests ต่อ 15 นาที
    

**ป้องกันอะไร**

-   Brute force login
    
-   Spam
    
```js
 rateLimit({
  windowMs: 15 * 60 * 1000,// หน่วยเวลาเป็น มิลลิวินาที ในนี้คือ 15 นาที (1000 มิลลิวินาที = 1 วินาที)
  max: 100 // จำนวนการเรียกใช้สูงสุดต่อ IP Address ต่อเวลาใน windowMS
  standardHeaders: true, // คืน rate limit ไปยัง `RateLimit-*` ใน headers 
  legacyHeaders: false, // ปิด `X-RateLimit-*` ใน headers
})   
```

# bcryptjs
**หน้าที่**  
Hash password ก่อนเก็บใน DB

```text
User password → bcrypt.hash → store
Login → bcrypt.compare → verify
```

# jsonwebtoken (JWT)
**หน้าที่**  
สร้างและ verify token

Flow มาตรฐาน:

1.  User login
    
2.  Server verify password
    
3.  Server generate JWT
    
4.  Client ส่ง token ทุก request
    
5.  Middleware verify token

**ทำไมต้องใช้**

-   Stateless authentication
    
-   ไม่ต้องเก็บ session ใน server
    
-   scale horizontal ได้ง่าย

-   เราจะไม่ เก็บ secret ใน code

# express-validator
**หน้าที่**  
Validate request body / params / query

ป้องกัน:

-   Invalid data
    
-   NoSQL injection
    
-   Type mismatch
    
-   Logic bugs

ตัวอย่าง
```js
check("email").isEmail()
check("password").isLength({ min: 6 })
```

# ภาพรวม

```scss
Client
   ↓
CORS
   ↓
Helmet
   ↓
Rate Limit
   ↓
Express Router
   ↓
Validation (express-validator)
   ↓
Auth Middleware (JWT)
   ↓
Controller
   ↓
Mongoose (DB)
   ↓
Response
```

stack tool

https://stackedit.io