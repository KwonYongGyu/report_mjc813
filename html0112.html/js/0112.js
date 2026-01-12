class Npc {
  #npcList = [
    {
      id: 1,
      name: "다리우스",
      cls: "W",
      sx: "남",
      hp: "1200",
      mp: "150",
      str: "85",
      int: "20",
      dex: "45",
      lux: "30",
      birthDate: "2012.05.23",
    },
    {
      id: 2,
      name: "아리",
      cls: "M",
      sx: "여",
      hp: "30",
      mp: "1,100",
      str: "15",
      int: "92",
      dex: "35",
      lux: "50",
      birthDate: "2011.12.13",
    },
    {
      id: 3,
      name: "애쉬",
      cls: "A",
      sx: "여",
      hp: "30",
      mp: "300",
      str: "40",
      int: "45",
      dex: "88",
      lux: "55",
      birthDate: "2009.02.21",
    },
    {
      id: 4,
      name: "제드",
      cls: "T",
      sx: "남",
      hp: "30",
      mp: "250",
      str: "50",
      int: "35",
      dex: "75",
      lux: "95",
      birthDate: "2012.11.13",
    },
  ];

  printList() {
    $(".listDataBlock").empty();
    this.#npcList.forEach((item) => {
      // 배열을 순환하면서 item 을 class="frame-2" 태그 안의 자식 태그로 추가한다.
      $(".listDataBlock").append(this.printRow(item));
    });
  }
  // RPG게임 캐릭터 데이터
//   이름, 직업(전사"W",마법사"M",궁수"A",도적"T"), 성별(남자"M",여자"F"), HP, MP, STR, INT, DEX, LUX, 생일
  // name, cls, sx, hp, mp, str, int, dex, lux, birthDate

  // RPG게임 캐릭터 기능
  // 출력 print~~()하는 기능
  // 추가 insert~~(), 수정 update~~(), 삭제 delete~~() 기능
  // 공격기능 A.attackStr(B); A캐릭터 B캐릭터 STR을 이용하여 공격하면
  // B캐릭터는 HP가 감소한다.
  // 마법공격 A.attackInt(B); A캐릭터 B캐릭터 INT을 이용하여 공격하면
  // B캐릭터는 HP가 감소한다. A캐릭터는 MP가 감소한다.
  printName(cls) {
    switch (cls) {
      case "W":
        return "전사";
      case "M":
        return "마법사";
      case "A":
        return "궁수";
      case "T":
        return "도적";
    }
    return "-";
  }

  //   printGrade(grade) {
  //     switch(grade) {
  //       case "ALL":
  //         return "전체이용";
  //       case "18":
  //         return "18세이상";
  //       case "13":
  //         return "13세이상";
  //     }
  //     return "-";
  //   }

  printRow(item) {
    let html = `
<div class="listDataRow">
  <div class="listItem">
    <input type="hidden" class="idClass" value="${item.id}"/>
    <div class="itemData text-wrapper">${this.printName(item.cls)}</div>
  </div>
 
  <div class="listItem">
    <div class="itemData text-wrapper">${item.name}</div>
  </div>
</div>`;
    return html;
  }

  clearInputBox() {
    $("#id").val(0);
    $("#name").val("");
    $("#cls").val("");
    $("#sx").val("");
    $("#hp").val("");
    $("#mp").val("");
    $("#str").val("");
    $("#int").val("");
    $("#dex").val("");
    $("#lux").val("");
    $("#birthDate").val("");
  }
  //   clearInputBox() {
  //     $("#id").val(0);
  //     $("#name").val("");
  //     $("#genre").val("A");
  //     $("#grade").val("ALL");
  //     $("#price").val(0);
  //     $("#imgUrl").val("");
  //   }

  setData2InputBox(npc) {
    // $("#id").val(game.id); 이 값은 화면에 안 보이는 <input id="id" type="hidden" hidden 이 필요하다.
    // $("#name").val(game.name);
    $("#id").val(npc.id);
    $("#name").val(npc.name);
    $("#cls").val(npc.cls);
    $("#sx").val(npc.sx);
    $("#hp").val(npc.hp);
    $("#mp").val(npc.mp);
    $("#str").val(npc.str);
    $("#int").val(npc.int);
    $("#dex").val(npc.dex);
    $("#lux").val(npc.lux);
    $("#birthDate").val(npc.birthDate);
  }

  checkInputData(attack_mode) {
    // 사용자 입력데이터 검증한다.
    // 입력데이터가 올바르면 true 리턴
    // 아니면 false 리턴
    if (attack_mode === "add" && $("#id").val() != 0) {
      alert("ID 값이 유효하지 않습니다.");
      return false;
    } else if (attack_mode === "update" || mode === "delete") {
      if ($("#id").val() == 0) {
        alert("ID 값이 유효하지 않습니다.");
        return false;
      } else {
        return true;
      }
    }
    if ($("#name").val().length < 2 || $("#name").val().length > 30) {
      alert("이름은 2자~30자까지 입력 가능 합니다.");
      $("#name").focus();
      return false;
    }
    if (
      $("#price").val().length < 1 ||
      $("#price").val() * 1 <= 0 ||
      $("#price").val() * 1 > 999999
    ) {
      alert("가격은 1~999999원 까지 입력 가능 합니다.");
      $("#price").focus();
      return false;
    }
    if ($("#imgUrl").val().indexOf("http") !== 0) {
      alert("그림이미지는 http 로 시작해야 합니다.");
      $("#imgUrl").focus();
      return false;
    }
    return true;
  }

  addNpc() {
    // 사용자 입력 데이터가 유효한지 검증해야 한다. 유효하지 않으면 경고창 띄우고 리턴;
    if (!this.checkInputData("add")) {
      return;
    }
    let maxId =
      this.#npcList.reduce((result, item) => {
        return result < item.id ? item.id : result;
      }, 0) + 1;
    // 새로운 데이터는 id:고유번호 가 필요하다. 그러므로 배열 전체 원소의 id의 최대값 에 +1 한 값을 고유한번호로 가져야한다.
    // 입력데이터는 JS 객체로 만든다. let JS객체 = {id:고유번호, name:$("#name").val(), genre:"S", grade:"ALL", price:금액, imgUrl:"http://..."};
    let newNpc = {
      id: maxId,
      name: $("#name").val(),
      cls: $("#cls").val(),
      sx: $("#sx").val(),
      hp: $("#hp").val(),
      mp: $("#mp").val(),
      str: $("#str").val(),
      int: $("#int").val(),
      dex: $("#dex").val(),
      lux: $("#lux").val(),
      birthDate: $("#birthDate").val(),
    };
    // gameList 배열에 JS객체 를 추가한다. this.#gameList.push(JS객체);
    this.#npcList.push(newNpc);
    this.clearInputBox();
    // gameList 배열정보를 게임목록 화면에 출력한다. this.printList();
    this.printList();
  }

  updateNpc() {
    // 사용자 입력 데이터가 유효한지 검증해야 한다. 유효하지 않으면 경고창 띄우고 리턴;
    if (!this.checkInputData("update")) {
      return;
    }
    // 입력데이터는 JS 객체로 만든다. let JS객체 = {id:고유번호, name:$("#name").val(), genre:"S", grade:"ALL", price:금액, imgUrl:"http://..."};
    // gameList 배열에서 JS객체.id 번호랑 같은 원소를 찾는다. let 찾는객체 = this.#gameList.find(() => {});
    // JS객체를 찾는객체로 바꿔치기 한다.
    // gameList 배열정보를 게임목록 화면에 출력한다. this.printList();
  }

  deleteNpc() {
    // 사용자 입력 데이터가 유효한지 검증해야 한다. 유효하지 않으면 경고창 띄우고 리턴;
    if (!this.checkInputData("delete")) {
      return;
    }
    // gameList 배열에서 기존의 id 번호랑 같은 원소를 찾는다. let 찾는객체 = this.#gameList.find(() => {});
    // 찾는객체를 gameList 배열에서 삭제한다.
    // gameList 배열정보를 게임목록 화면에 출력한다. this.printList();
  }

  printOneNpc(e) {
    // 화면의 id 값으로 gameList배열에서 찾는다. let id값 = $("#id").val();, let 찾은원소 = this.#gameList.find(() => {});
    let selectId = $(e.currentTarget).find(".idClass").val() * 1;
    console.log(`selectId = ${selectId}`);
    let findNpc = this.#npcList.find((item) => {
      return item.id === selectId;
    });
    if (findNpc == undefined) {
      return;
    }
    // this.setData2InputBox(찾은원소);
    this.setData2InputBox(findNpc);
  }
}

$(() => {
  // jquery 실행
  let nint = new Npc();
  nint.printList();

  $("#btnAdd").click((e) => {
    nint.addNpc();
  });

  $(document).on("click", "#btnUpt", (e) => {
    nint.updateNpc();
  });

  $(document).on("click", "#btnDel", (e) => {
    nint.deleteNpc();
  });

  $(document).on("click", ".listDataRow", (e) => {
    nint.printOneNpc(e);
  });
});
