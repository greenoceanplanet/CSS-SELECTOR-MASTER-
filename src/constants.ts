export interface SelectorInfo {
  symbol: string;
  name: string;
  example: string;
  meaning: string;
  description: string;
  category: 'basic' | 'at-rule' | 'advanced' | 'combinator';
}

export const SELECTORS: SelectorInfo[] = [
  {
    symbol: '태그',
    name: '태그 선택자',
    example: 'div, p, h1',
    meaning: '모든 해당 태그 선택',
    description: 'HTML 태그 이름 그 자체를 가리킵니다. 페이지의 모든 해당 태그에 스타일을 적용할 때 사용합니다.',
    category: 'basic'
  },
  {
    symbol: '.',
    name: '클래스(Class)',
    example: '.item',
    meaning: '특정 클래스 속성을 가진 요소',
    description: 'class="item"인 여러 개의 요소를 지시합니다. 가장 범용적으로 사용됩니다.',
    category: 'basic'
  },
  {
    symbol: '#',
    name: '아이디(ID)',
    example: '#header',
    meaning: '특정 ID 속성을 가진 단 하나',
    description: 'id="header"인 단 하나의 요소를 지시합니다. 중복 사용이 불가능합니다.',
    category: 'basic'
  },
  {
    symbol: '*',
    name: '전체',
    example: '*',
    meaning: '모든 요소 선택',
    description: '페이지 내의 모든 요소를 다 선택합니다. 보통 여백 초기화 등 전체 설정 시 사용합니다.',
    category: 'basic'
  },
  {
    symbol: '@',
    name: '앳 규칙(At-rules)',
    example: '@media, @keyframes',
    meaning: '특수 조건이나 설정',
    description: '일반적인 스타일링이 아니라 반응형 설정(@media)이나 애니메이션(@keyframes) 등 특수 명령을 내릴 때 씁니다.',
    category: 'at-rule'
  },
  {
    symbol: '[]',
    name: '속성',
    example: '[type="text"]',
    meaning: '특정 속성을 가진 요소',
    description: '특정 속성(Attribute)을 가진 요소를 선택합니다. 예: [class*="mini--"]',
    category: 'advanced'
  },
  {
    symbol: ':',
    name: '가상 클래스',
    example: ':hover, :nth-child',
    meaning: '특수한 상태 지시',
    description: '마우스를 올렸을 때(:hover) 등 요소의 특수한 상태를 지시합니다.',
    category: 'advanced'
  },
  {
    symbol: '::',
    name: '가상 요소',
    example: '::before, ::after',
    meaning: '가짜 콘텐츠 삽입',
    description: '요소의 앞/뒤에 실제 HTML에는 없는 가짜 콘텐츠를 넣을 때 사용합니다.',
    category: 'advanced'
  },
  {
    symbol: '>',
    name: '자식 선택자',
    example: 'div > p',
    meaning: '직계 자식만 선택',
    description: '부모 요소 바로 밑에 있는 자식 요소만 선택합니다.',
    category: 'combinator'
  },
  {
    symbol: '+',
    name: '인접 형제',
    example: 'h1 + p',
    meaning: '바로 뒤의 형제 하나',
    description: '특정 요소 바로 뒤에 오는 형제 요소 하나만 선택합니다.',
    category: 'combinator'
  }
];

export interface MockElement {
  id: string;
  tag: string;
  classes?: string[];
  attr?: { [key: string]: string };
  children?: MockElement[];
  text?: string;
}

export const MOCK_HTML: MockElement[] = [
  {
    id: 'header',
    tag: 'header',
    classes: ['main-header'],
    text: 'Header Section (#header)',
    children: [
      { id: 'nav', tag: 'nav', classes: ['nav-bar'], children: [
        { id: 'link1', tag: 'a', classes: ['link', 'active'], text: 'Home' },
        { id: 'link2', tag: 'a', classes: ['link'], text: 'About' }
      ]}
    ]
  },
  {
    id: 'container',
    tag: 'main',
    classes: ['container'],
    children: [
      { id: 'title', tag: 'h1', text: 'CSS Selector Playground' },
      { id: 'p1', tag: 'p', classes: ['intro'], text: '이곳에서 지시자를 연습해보세요.' },
      { id: 'list', tag: 'ul', classes: ['item-list'], children: [
        { id: 'li1', tag: 'li', classes: ['item'], text: '첫 번째 아이템' },
        { id: 'li2', tag: 'li', classes: ['item', 'special'], text: '두 번째 아이템 (special)' },
        { id: 'li3', tag: 'li', classes: ['item'], text: '세 번째 아이템' }
      ]},
      { id: 'input-group', tag: 'div', classes: ['form-group'], children: [
        { id: 'input1', tag: 'input', attr: { type: 'text', placeholder: '이름을 입력하세요' } },
        { id: 'btn1', tag: 'button', classes: ['btn', 'primary'], text: '제출하기' }
      ]}
    ]
  },
  {
    id: 'footer',
    tag: 'footer',
    text: 'Footer Section'
  }
];
