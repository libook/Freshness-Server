
---
## GET /

API for checking whether server is running.

### Response:

#### Body:

```javascript
 "Welcome to Freshness Server."
```


---
## POST /timer

Create new timer.

### Request:

#### Body:

```javascript
 {
     "name": String,
     "expirationDate": String,
 }
```

### Response:

#### Body:

```javascript
 {
     "name": String,
     "expirationDate": String,
 }
```


---
## GET /timerList

Get timer list.

### Response:

#### Body:

```javascript
 [
     {
         "name": String,
         "expirationDate": String,
     },
 ]
```

