
---
### GET /

API for checking whether server is running.



#### Response


##### Body

```javascript
"Welcome to Freshness Server."
```


---
### POST /timer

Create new timer.



#### Request


##### Body

```javascript
{
    "name": String,
    "expirationDate": String,
}
```
#### Response


##### Body

```javascript
{
    "name": String,
    "expirationDate": String,
}
```


---
### PUT /timer/:timerId

Update timer.



#### Request


##### Path

Name | Description
---- | -----------
{String} timerId | The ID of timer


##### Body

```javascript
{
    "name": String,
    "expirationDate": String,
}
```
#### Response


##### Body

```javascript
{
    "name": String,
    "expirationDate": String,
}
```


---
### DELETE /timer/:timerId

Delete timer.



#### Request


##### Path

Name | Description
---- | -----------
{String} timerId | The ID of timer

#### Response


##### Body

```javascript
{
    "name": String,
    "expirationDate": String,
}
```


---
### GET /timerList

Get timer list.



#### Response


##### Body

```javascript
[
    {
        "name": String,
        "expirationDate": String,
    },
]
```

