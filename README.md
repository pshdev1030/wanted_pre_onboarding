# 원티드 프리온보딩 프론트엔드 코스 사전과제

# 구현한 방법과 이유

## Toggle Switch

### state

```ts
const [toggleOn, setToggleOn] = useState<boolean>(false);
const onClickToggleButton = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggleOn(e.target.checked);
  },
  [toggleOn]
);
```

1. 스위치의 value를 state로 관리하였습니다.

- Toggle wsitch는 on off라는 state를 가지기 때문입니다.

### jsx

```jsx
<ToggleWrapper>
  <label>
    <input type="checkbox" onChange={onChange}></input>
    <span className="slider"></span>
  </label>
</ToggleWrapper>
```

Toggle 컴포넌트의 반환값입니다.

1. ux를 고려하여 label 아래에 input과 slider를 추가하였습니다.

- label 내부의 어떤 요소를 클릭해도 input에 클릭이벤트가 전달되어 input의 checked값으로 상태를 변경하게 되기 때문입니다.

2. input의 checked값을 기준으로 slider 내부의 가상요소의 위치를 다르게 하였습니다. 위치가 달라질 때에는 애니메이션을 주어 부드럽게 움직이도록 하였습니다.

- js로 해야할 일을 css로 하게되면 코드량도 적고 더욱 효율적이기 때문입니다.

## Modal

### state

```ts
const [onOpenModal, setOpenModal] = useState<boolean>(false);
const onClickOpenModal = useCallback(() => {
  setOpenModal(true);
}, []);
const onClickCloseModal = useCallback(() => {
  setOpenModal(false);
}, []);
```

1. 모달이 열려있을 경우 onOpenModal이 true, 닫혀있을 경우 false로 state를 관리하였습니다.

- 모달 또한 두 가지 상태를 갖기 때문입니다.

1. 모달을 열고 닫는 함수를 정의하였습니다.

- 토글로 정의해도 되나 명시적으로 작성하기 위해 열고 닫는 함수로 작성하였습니다.

### jsx

```tsx
const Modal = ({ children, isOpen, onCloseModal }: ModalComponentType) => {
  const onClickModalContent = useCallback((e: any) => {
    e.stopPropagation();
  }, []);
  return (
    <div>
      {isOpen && (
        <>
          <ModalBackground />
          <ModalContent onClick={onClickModalContent}>
            <ButtonWrapper>
              <button onClick={onCloseModal}>×</button>
            </ButtonWrapper>
            {children}
          </ModalContent>
        </>
      )}
    </div>
  );
};
```

Modal 컴포넌트의 반환값입니다.

1. isOpen값을 Modal 컴포넌트로 렌더링해주어 열려있는지에 따라 렌더링 하도록 하였습니다.

- 부모 요소가 아닌 컴포넌트에서 관리하도록 작성하였습니다.

2. 모달 뒤의 배경(ModalBackground)는 모달 컨텐츠(ModalContent)와 형제요소로 만들었습니다.

- 자식으로부터 부모로 이벤트가 전파되므로 형제요소로 두면 이벤트가 전파되지 않기 때문입니다.

3. 모달 컨텐츠(ModalContent)의 클릭 이벤트로 e.stopPropagation()을 등록하여 주었습니다.

- 마찬가지로 상위요소로의 이벤트 전파를 막기 위함입니다.
- 사용자는 x버튼을 눌러서만 닫을 수 있습니다.

## Tag

### state

```ts
const [tagValue, setTagValue] = useState<string>("");
const onChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagValue(e.target.value);
  },
  [tagValue]
);
const [tags, setTags] = useState<[] | tagsType[]>([]);
const tagIdRef = useRef<number>(0);

const addTag = useCallback(
  (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tagValue === "") return;
    const newTag = { val: tagValue, id: tagIdRef.current++ };
    const newTags = [...tags, newTag];
    setTags(newTags);
    setTagValue("");
  },
  [tags, tagValue]
);
const removeTag = useCallback(
  (id: number) => {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags);
  },
  [tags]
);
```

1. Tag 배열과 Tag에 새 요소를 추가하기 위한 input태그의 입력값을 state로 관리하였습니다.

2. Tag 배열의 다음 요소의 id를 useRef로 렌더링과 상관없는 값으로 저장하였습니다.

- 배열을 렌더링하는데에는 key가 필요한데, 삭제 작업이 일어나지 않는다면 배열의 index를 key로 하겠지만 삭제 작업이 있기 때문에 별도의 변수에 저장하였습니다.

- 이로 인해 삭제작업은 id를 이용한 filter함수로 쉽게 구현할 수 있습니다.

3. 태그를 더하는 함수(addTag)는 form에 등록할 예정이므로 새로고침을 막기위해 e.preventDefault()를 해주었습니다.

- submit관리를 편하게 하기위해 form에 단일 input을 등록하였습니다. 하지만 form의 submit event는 새로고침을 하여 spa에 적합하지 않기 떄문에 새로고침을 막아주었습니다.

4. 빈 입력에 여러번 호출되어 빈 태그가 등록되는 경우를 예방하기 위해 빈 입력일 경우 state를 수정하지 않도록 했습니다.

- 사용자의 입력은 예측할 수 없기 때문입니다.

### jsx

```tsx
<TagContentWrapper>
  {tags.map((tag) => (
    <TagWrapper key={tag.id}>
      {tag.val}
      <button onClick={() => removeTag(tag.id)}>×</button>
    </TagWrapper>
  ))}
  <form onSubmit={addTag}>
    <TagInput
      value={tagValue}
      onChange={onChange}
      placeholder="Press enter to add tags"
    ></TagInput>
  </form>
</TagContentWrapper>
```

Tag 컴포넌트의 반환값입니다.

1. 태그의 요소들을 map함수를 이용해 렌더링하고 제일 아래에 input을 포함한 form을 렌더링해주었습니다.

- 항상 새로운 태그를 등록하는 input이 제일 마지막 요소로 위치하게 하기 위함입니다.

2. css로 TagContentWrapper에 `display:flex`와`flex-wrap:wrap`을 추가하여 요소가 줄바꿈이 되도록 하였습니다.

3. form 내부에 input을 추가했기 때문에 input안에서 Enter를 눌러서 submit이벤트를 호출하여 새로운 태그를 등록할 수 있습니다.

- submit 이벤트를 간편하게 관리하기 위함입니다.

## ClickToEdit

### state

```ts
const [name, setName] = useState<string>("박성현");
const [isNameEditable, setisNameEditable] = useState<boolean>(false);
const changeIsNameEditable = useCallback(() => {
  setisNameEditable((prev) => !prev);
}, [isNameEditable]);
const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value);
}, []);

const [age, setAge] = useState<string>("25");
const [isAgeEditable, setisAgeEditable] = useState<boolean>(false);
const changeIsAgeEditable = useCallback(() => {
  setisAgeEditable((prev) => !prev);
}, [isAgeEditable]);
const onChangeAge = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  setAge(e.target.value);
}, []);
```

1. 이름과 나이를 state로 관리하였습니다.

2. 이름과 나이가 편집이 가능한 상태인지도 state로 관리하였습니다.

3. 편집가능한 상태를 변경하는 함수와 이름과 나이를 변경할 input의 value를 변경할 onChange 함수를 작성하였습니다.

### jsx

```tsx
<div>
  <ClickToEditElement>
    <p className="label">이름</p>
    {isNameEditable ? (
      <form onSubmit={changeIsNameEditable}>
        <ClickToEditInput
          value={name}
          onChange={onChangeName}
          onDoubleClick={changeIsNameEditable}
        ></ClickToEditInput>
      </form>
    ) : (
      <ClickToEditP onDoubleClick={changeIsNameEditable}>
        {name === "" ? "Double click to enter the value." : name}
      </ClickToEditP>
    )}
  </ClickToEditElement>
  <ClickToEditElement>
    <p className="label">나이</p>
    {isAgeEditable ? (
      <form onSubmit={changeIsAgeEditable}>
        <ClickToEditInput
          type="number"
          value={age}
          onChange={onChangeAge}
          onDoubleClick={changeIsAgeEditable}
        ></ClickToEditInput>
      </form>
    ) : (
      <ClickToEditP onDoubleClick={changeIsAgeEditable}>
        {age === "" ? "Double click to enter the value." : age}
      </ClickToEditP>
    )}
  </ClickToEditElement>
</div>
```

ClickToEdit 컴포넌트의 반환값입니다.

1. 편집이 가능할 상태(isAgeEditable,isNameEditAble이 true)일 경우 input태그에, 불가능할 경우 p태그에 각각의 값(Age,Name)을 렌더링해주었습니다.

2. input과 p태그 모두 더블클릭으로 편집이 불가능한 상태, 편집이 가능한 상태로 바꿀 수 있도록 onDoubleClick 이벤트를 등록해주었습니다.

- 더블 클릭을 통해 수정하기 위함입니다.

3. p태그의 경우 빈 string 값일 경우 따로 더블클릭을 통해 값을 수정하라는 문자를 렌더링 하도록 하였습니다.

- p태그의 경우 인라인요소로 age나 name이 빈 string 값일 경우 width를 가지지 않아 클릭이 어렵기 때문입니다.

## Tab

### state

```ts
const [tabsArray, setTabsArray] = useState<tabsType[]>([
  { id: 1, title: "Tab1", content: "Tab menu 1", active: true },
  { id: 2, title: "Tab2", content: "Tab menu 2", active: false },
  { id: 3, title: "Tab3", content: "Tab menu 3", active: false },
]);

const onClickTabs = useCallback(
  (id) => {
    const prevIndex = tabsArray.findIndex((tab) => tab.active === true);
    const nextIndex = tabsArray.findIndex((tab) => tab.id === id);
    const newTabsArray = tabsArray.slice();
    newTabsArray[prevIndex].active = false;
    newTabsArray[nextIndex].active = true;
    setTabsArray(newTabsArray);
  },
  [tabsArray]
);
```

1. tab의 제목과 내용을 담은 배열을 state로 관리하였습니다.

2. 또한 배열 내부 요소의 active값을 통해 현재 활성화된 탭인지를 관리하였습니다.

3. 배열을 useRef로 관리하며 현재 활성화된 탭의 id state로 관리하는 방법도 생각해보았으나 활성화된 탭의 active를 직접 수정해주어야 하기 때문에 state 자체의 수정이 주기적으로 일어난다고 판단하여 배열로 관리하였습니다.

### jsx

```tsx
<TabWrapper>
  <TabHeaderWrapper size={tabsArray.length}>
    {tabsArray.map((tab) => (
      <div
        className={tab.active ? "active" : ""}
        key={tab.id}
        onClick={() => onClickTabs(tab.id)}
      >
        {tab.title}
      </div>
    ))}
  </TabHeaderWrapper>
  <TabContentWrapper>
    {tabsArray.map((tab) => (
      <div className={tab.active ? "active" : ""} key={tab.id}>
        {tab.content}
      </div>
    ))}
  </TabContentWrapper>
</TabWrapper>
```

Tab 컴포넌트의 반환값입니다.

1. 클릭을 통해 활성화되어있는 탭을 변경할 수 있습니다.

2. TabHeaderWrapper엔 Tab의 size를 props로 주고 css에 `width:calc(100%/props.size)`를 작성하여 탭을 추가하더라도 너비를 자동으로 반영하도록 하였습니다.
   이 부분은 테스트 또한 마친 상태입니다.

- TabsArray이라는 상태를 컴포넌트가 반영해야하기 때문입니다.

3. active 상태인 탭의 경우 TabHeader의 배경색을 다르게 하였습니다.

- 한 눈에 알아볼 수 있도록 하기 위함입니다.

4. TabWrapper에 `position:relative`를 주고 TabContentWrapper의 자식 div요소에 `position:absolute`를 주어 가운데로 정렬하였습니다.
   그리고 `opacity:0`을 주고 active일 경우 `opacity:1`을 주어 active요소만 보이도록 하였습니다.

- 현재 활성화된 탭만 보일 수 있도록 하기 위함입니다.

## AutoComplete

### state

```ts
const autoCompleteDatas = useRef<string[]>([
  "A급중고",
  "B급중고",
  "antique",
  "Vintage",
  "Refresh",
  "React",
  "Frontend",
  "Backend",
  "nestjs",
  "express",
  "styled component",
]);
const [searchValue, setSearchValue] = useState<string>("");
const onChangeSearchValue = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  },
  []
);
```

1. 검색어 목록은 useRef를 이용해 렌더링과 관련없는 상수로 관리하였습니다.

2. 검색창의 input의 value를 state로 관리하였습니다.

### jsx

```tsx
const AutoComplete = ({
  autoCompleteDatas,
  searchValue,
  onChange,
  setSearchValue,
}: AutoCompleteComponentType) => {
  const result = useMemo(() => {
    if (searchValue.trim() === "") return [];
    else
      return autoCompleteDatas.filter(
        (data) => data.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1
      );
  }, [searchValue]);
  return (
    <AutoCompleteWrapper>
      <InputWrapper>
        <input value={searchValue} onChange={onChange}></input>
        <button onClick={() => setSearchValue("")}>×</button>
      </InputWrapper>
      {result.length > 1 && (
        <CompletedDatasWrapper>
          {result.map((data, index) => (
            <CompletedData key={index} onClick={() => setSearchValue(data)}>
              {data}
            </CompletedData>
          ))}
        </CompletedDatasWrapper>
      )}
    </AutoCompleteWrapper>
  );
};
```

AutoComplete 컴포넌트의 반환값입니다.

1. useMemo를 이용하여 searchValue가 바뀔 때, 필터링된 검색어 목록을 계산하도록 하였습니다.

- CompltedDatasWrapper 에는 필터링된 검색어 목록이 렌더링하기 위함입니다.

2. searchValue가 공백으로만 이루어져 있을 경우 빈 배열을 반환하도록 하였습니다.

- 빈 입력일 때 모든 검색어들을 렌더링하지 않기 위함입니다.

3. CompletedDatasWrapper 에는 그림자효과를 주는 css가 설정되어있는데, 요소가 없을 경우에도 그림자만 보이는 현상이 있었습니다.

- 필터링된 검색어 목록이 2개 이상일 경우에만 CompletedDatasWrapper를 아래에 렌더링하여 이 현상을 해결하였습니다

4. CompletedDatasWrapper에 `position:absolute`를 주어 검색어 목록의 길이만큼 컴포넌트 전체가 위로 올라가는 버그를 해결하였습니다.

5. CompletedDatasWrapper에 `max-height`와 `overflow-y:scroll`을 주고 스크롤을 보이지 않도록 하였습니다.

- 많은 검색어 목록이 있더라도 스크롤을 통해 페이지 레이아웃에 영향을 주지 않고 확인할 수 있습니다.

6. X 버튼을 클릭하여서 초기화하는 기능과 클릭을 통해 해당 검색어를 searchValue로 설정하는 기능을 추가하였습니다.

# 실행 방법

CRA를 사용하여 만들었습니다.

로컬환경에서 실행시

```
npm run start
```

## 배포

github-pages를 이용하여 배포하였습니다.

[원티드 프론트엔드 프리온보딩 사전과제](https://pshdev1030.github.io/wanted_pre_onboarding/)

## 마무리

감사합니다!
