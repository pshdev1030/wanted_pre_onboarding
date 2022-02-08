# 원티드 프리온보딩 프론트엔드 코스 사전과제

# 구현한 방법과 이유

## Toggle Switch

```ts
const [toggleOn, setToggleOn] = useState<boolean>(false);
const onClickToggleButton = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggleOn(e.target.checked);
  },
  [toggleOn]
);
```

스위치의 value를 state로 관리하였습니다.

```jsx
<ToggleWrapper>
  <label>
    <input type="checkbox" onChange={onChange}></input>
    <span className="slider"></span>
  </label>
</ToggleWrapper>
```

Toggle 컴포넌트의 반환값입니다.

ux를 고려하여 label 아래에 input과 slider를 추가하였습니다.

label 내부의 어떤 요소를 클릭해도 input에 클릭이벤트가 전달되어 input의 checked값으로 상태를 변경하게 됩니다.

의사 선택자와 position을 이용하여 slider 내부의 가상요소(before)의 위치가 input의 checked값에 따라 변경될 수 있도록 하였습니다.

## Modal

```ts
const [onOpenModal, setOpenModal] = useState<boolean>(false);
const onClickOpenModal = useCallback(() => {
  setOpenModal(true);
}, []);
const onClickCloseModal = useCallback(() => {
  setOpenModal(false);
}, []);
```

모달의 열고 닫힌 상태를 state로 관리하였습니다.

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

Modal 컴포넌트입니다.

자식으로부터 부모로 이벤트가 전파되므로 모달 뒤의 배경(ModalBackground)은 모달 컨텐츠(ModalContent)와 형제요소로 있도록 하였습니다.

또한 모달 컨텐츠(ModalContent)에는 부모요소로 이벤트가 전파되지 않도록 e.stopPropagation()을 호출하여 주었습니다.

사용자는 x버튼을 눌러서만 닫을 수 있습니다.

## Tag

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

Tag에는 Tag의 제일 마지막요소인 input의 값과 Tag 배열을 state로 관리하였습니다.

또한 Tag 배열의 다음 요소의 id를 useRef로 렌더링과 상관없는 값으로 관리하였습니다.

태그를 더하는 함수(addTag)는 form에 등록할 예정이므로 새로고침을 막기위해 e.preventDefault()를 해주었습니다.

또한 빈 입력에 여러번 호출되는 경우를 예방하고자 빈 입력일 경우 state를 수정하지 않도록 했습니다.

태그를 삭제하는 함수(removeTag)는 id를 기반으로 filter로 구현하였습니다.

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

태그의 요소들을 map함수를 이용해 렌더링하고 제일 아래에 input을 포함한 form을 렌더링해주었습니다.

또한 css로 TagContentWrapper에 `display:flex`와`flex-wrap:wrap`을 추가하여 요소가 줄바꿈이 되도록 하였습니다.

요소는 이 form의 앞에 쌓입니다.

또한 form 내부에 input을 추가했기 때문에 input안에서 Enter를 눌러서 submit이벤트를 호출하여 새로운 태그를 등록할 수 있습니다.

## ClickToEdit

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

이름과 나이를 state로 관리하였습니다.

또한 이름과 나이가 편집이 가능한 상태인지도 state로 관리하였습니다.

이름과 나이의 경우 input으로 편집할 예정이므로 onChange함수를 만들고 편집 가능한 상태인지를 변경하는 함수도 만들었습니다.

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

편집이 가능할 상태일 경우 input태그에, 불가능할 경우 p태그에 각각의 값을 렌더링해주었습니다.

또한 input과 p태그 모두 더블클릭으로 편집이 불가능한 상태, 편집이 가능한 상태로 바꿀 수 있도록 onDoubleClick 이벤트를 등록해주었습니다.

P태그의 경우 인라인요소로 age나 name이 빈 string 값일 경우 width를 가지지 않아 클릭이 어려워서 빈 string 값일 경우 따로 더블클릭을 통해 값을 수정하라는 문자를 렌더링 하도록 하였습니다.

## Tab

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

tab의 제목과 내용을 담은 배열을 state로 관리하였습니다.

또한 active값을 통해 현재 활성화되어있는 탭을 관리하였습니다.

배열을 useRef로 관리하며 현재 활성화된 탭의 id state로 관리하는 방법도 생각해보았으나 활성화된 탭의 active를 직접 수정해주어야 하기 때문에 배열로 관리하였습니다.

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

클릭을 통해 활성화되어있는 탭을 변경할 수 있습니다.

css로 기능을 많이 구현하였습니다.

TabHeaderWrapper엔 Tab의 size를 주고 `width:calc(100%/props.size)`를 통해 탭을 추가하더라도 너비를 자동으로 반영하도록 하였습니다.

또한 active상태인 탭의 경우 배경색을 다르게 하였습니다.

TabWrapper에 `position:relative`를 주고 TabContentWrapper의 자식 div요소에 `position:absolute`를 주어 가운데로 정렬하였습니다.

그리고 `opacity:0`을 주고 active일 경우 `opacity:1`을 주어 active요소만 보이도록 하였습니다.

## AutoComplete

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

검색어 목록은 useRef를 이용해 렌더링과 관련없는 상수로 관리하고 검색창의 value를 state로 관리하였습니다.

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
      {result.length > 0 && (
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

useMemo를 이용하여 searchValue가 바뀔 때 마다 필터링된 검색어 목록을 계산하도록 하였습니다.

CompltedDatasWrapper 에는 필터링된 검색어 목록이 렌더링됩니다.

이 컴포넌트에는 그림자효과를 주는 css가 설정되어있는데, 요소가 없을 경우에도 그림자만 보이는 현상이 있었습니다.

필터링된 검색어 목록이 1개 이상일 경우에만 CompletedDatasWrapper를 아래에 렌더링하여 이 현상을 해결하였습니다.

또한 이 CompletedDatasWrapper에 `position:absolute`를 주어 검색어 목록의 길이만큼 컴포넌트가 위로 올라가는 버그를 해결하였습니다.

X 버튼을 클릭하여서 초기화하는 기능과 클릭을 통해 해당 검색어를 searchValue로 설정하는 기능을 추가하였습니다.
