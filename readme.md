

### 1. element vs Component

1-1. app 이 element 일 때,
```js
  ReactDOM.render(<App />, appDOM)
const app = (
  <div>
    <Title>{counter}번째 고양이 가라사대 가라사대</Title>
    <CatForm handleFormSubmit={handleFormSubmit} />
    <MainCard img="https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript" />
    <Favorites />
  </div>
);

const appDOM = document.querySelector('#app');

ReactDOM.render(app, appDOM)
```

1-2. app 안에 useState, 함수 등을 추가하면서 Component 로 진화시켰을 때 (**Lifting State Up**), `ReactDOM.render(<App />, appDOM)` 로 변경해야 한다.

컴포넌트 형식으로 변경하지 않고 App 이라고만 쓰면, error message:

>Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.

```js
const App = () {

  const [counter, setCounter] = React.useState(100);

  function handleFormSubmit() {
    // function
  }

  return(
    <div>
      <Title>{counter}번째 고양이 가라사대 가라사대</Title>
      <CatForm handleFormSubmit={handleFormSubmit} />
      <MainCard img="https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript" />
      <Favorites />
    </div>
  )
};

const appDOM = document.querySelector('#app');

ReactDOM.render(<App />, appDOM)
```


2. Each child in a list should have a unique key prop.

> Warning: Each child in a list should have a unique "key" prop.

> Check the render method of `Favorites`. See https://reactjs.org/link/warning-keys for more information.
    at CatItem (<anonymous>:70:45)
    at Favorites
    at div
    at App (<anonymous>:99:31)


Before:
```js
  <ul className="favorites">
    {
      cats.map(cat => <CatItem img={cat} />)
    }
  </ul>
```

After:
```js
  <ul className="favorites">
    {
      cats.map(cat => <CatItem img={cat} key={cat} />)
    }
  </ul>
```

3. How to add a new item to a list that is created by useState

**Use es6 Spread Operator**

```js
function Favorites() {
  const [favorites, setFavorites] = React.useState([CAT1, CAT2])

  function handleHeartClick() {
    console.log("하트 눌렀음.");
    
    // 고양이 추가
    setFavorites([...favorites, CAT3])
  }
}
```