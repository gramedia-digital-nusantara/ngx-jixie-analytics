# Ngx Jixie Analytics
This package is a library for integrate jixie analytics in your angular project and inspired by [angular-tag-manager](https://www.npmjs.com/package/angular-google-tag-manager).


## Getting Started
In your Angular project run

```
npm i --save ngx-jixie-analytics
```

After installing it you need to provide your account id:

```typescript
providers: [
    ...
    {
        provide: 'jixieAccountId',  
        useValue: YOUR_ACCOUNT_ID
    }
]
```

Or use the module's `forRoot` method

```typescript
import { 
    NgxJixieAnalyticsModule 
} from 'ngx-jixie-analytics';

imports: [
    ...
    NgxJixieAnalyticsModule.forRoot({
      accountId: YOUR_ACCOUNT_ID,
    })
]
```

inject the analyticService in your controller

```typescript
constructor(
    ...
    private analyticService: JixieAnalyticService,
) { }
```

then you can start pushing events on your jixie:

```typescript
const jixieTag = {
  email: user.email ?
    this.analyticService.hash(user.email) : '',
  action: "viewitem",
  parameters:{
      itemid:"54fg4",
      price:"23.21",
      currency:"USD",
      availability: "instock"
  }
};

this.analyticService.pushTag(jixieTag);
```

if you want to receive tags without pushing events simply call the function to enable it

```typescript
this.analyticService.addJixieToDom();
```


## Authors

<table>
  <tr>
    <td align="center">
      <a href="https://agung96tm.com/">
        <img src="https://avatars.githubusercontent.com/u/1901484?v=4" width="100px;" alt=""/><br />
        <b>Agung Yuliyanto</b><br>
      </a>
      <div>💻</div>
    </td>
  </tr>
</table>
