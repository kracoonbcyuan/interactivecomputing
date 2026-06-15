# Interactive Computing

GitHub Pages로 배포할 수 있는 정적 웹사이트 기본 프로젝트입니다.

## 파일 구성

- `index.html`: 메인 페이지
- `styles.css`: 반응형 디자인과 색상 테마
- `script.js`: 테마 전환과 연도 표시
- `404.html`: 페이지를 찾을 수 없을 때 표시되는 화면
- `.nojekyll`: GitHub Pages의 Jekyll 처리를 비활성화

## 로컬에서 확인

프로젝트 폴더에서 아래 명령을 실행한 뒤 `http://localhost:8000`으로
접속합니다.

```powershell
python -m http.server 8000
```

## GitHub에 올리기

GitHub에서 빈 저장소를 만든 다음 저장소 주소를 연결합니다.

```powershell
git remote add origin https://github.com/USERNAME/interactive_computing.git
git push -u origin main
```

## GitHub Pages 공개

1. GitHub 저장소의 `Settings`를 엽니다.
2. 왼쪽 메뉴에서 `Pages`를 선택합니다.
3. `Build and deployment`의 `Source`를 `Deploy from a branch`로 설정합니다.
4. 브랜치는 `main`, 폴더는 `/(root)`를 선택하고 저장합니다.

프로젝트 사이트 주소는 일반적으로 다음과 같습니다.

```text
https://USERNAME.github.io/interactive_computing/
```

`index.html`의 이메일 주소와 프로젝트 내용을 실제 정보로 교체해 사용하세요.
