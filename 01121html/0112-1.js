class Npc {
  #npcList = [
    {
      id: 1,
      name: "다리우스",
      cls: "W",
      sx: "man",
      hp: "1200", // hp,mp,str,int,dex,lux 숫자인데 ""로 표시했었음
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
      sx: "woman",
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
      sx: "woman",
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
      sx: "man",
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
    $("#id").val(npc.id);
    $("#name").val(npc.name);
    $("#genre").val(npc.cls);
    $("#sex").val(npc.sx ==="남" ? "man" :  "woman");
    $("#HP").val(npc.hp);
    $("#MP").val(npc.mp);
    $("#STR").val(npc.str);
    $("#INT").val(npc.int);
    $("#DEX").val(npc.dex);
    $("#LUX").val(npc.lux);
    $("#birthDate").val(npc.birthDate);
  }

  // [기능] 물리 공격 (A가 B를 공격)
  attackStr(targetId) {
    const attackerId = $("#id").val() * 1; // 현재 선택된 NPC
    if (attackerId === targetId)
      return alert("자기 자신을 공격할 수 없습니다.");

    const attacker = this.#npcList.find((n) => n.id === attackerId);
    const target = this.#npcList.find((n) => n.id === targetId);

    if (attacker && target) {
      target.hp = Math.max(0, Number(target.hp) - Number(attacker.str));
      alert(
        `${attacker.name}의 물리 공격! ${target.name}의 남은 HP: ${target.hp}`
      );
      this.printList(); // 화면 갱신
    }
  }

  // [기능] 마법 공격
  attackInt(targetId) {
    const attackerId = $("#id").val() * 1;
    const attacker = this.#npcList.find((n) => n.id === attackerId);
    const target = this.#npcList.find((n) => n.id === targetId);

    if (attacker && target) {
      if (attacker.mp < 50) return alert("마나가 부족합니다.");

      target.hp = Math.max(0, Number(target.hp) - Number(attacker.int));
      attacker.mp = Number(attacker.mp) - 50; // 마법 사용 시 마나 감소
      alert(
        `${attacker.name}의 마법 공격! ${target.name}의 남은 HP: ${target.hp} (남은 MP: ${attacker.mp})`
      );
      this.printList();
    }
  }
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
