class Npc {
  #npcList = [
    {
      id: 1,
      name: "다리우스",
      cls: "W",
      sx: "남",
      hp: 1200,
      mp: 150,
      str: 85,
      int: 20,
      dex: 45,
      lux: 30,
      birthDate: "2012.05.23",
    },
    {
      id: 2,
      name: "아리",
      cls: "M",
      sx: "여",
      hp: 30,
      mp: 1100,
      str: 15,
      int: 92,
      dex: 35,
      lux: 50,
      birthDate: "2011.12.13",
    },
    {
      id: 3,
      name: "애쉬",
      cls: "A",
      sx: "여",
      hp: 30,
      mp: 300,
      str: 40,
      int: 45,
      dex: 88,
      lux: 55,
      birthDate: "2009.02.21",
    },
    {
      id: 4,
      name: "제드",
      cls: "T",
      sx: "남",
      hp: 30,
      mp: 250,
      str: 50,
      int: 35,
      dex: 75,
      lux: 95,
      birthDate: "2012.11.13",
    },
  ];

  // [출력] 전체 목록 출력 및 공격 대상 갱신
  printList() {
    $(".listDataBlock").empty();
    this.#npcList.forEach((item) => {
      $(".listDataBlock").append(this.printRow(item));
    });
    this.updateAttackerSelect(); // 공격 대상 셀렉트박스 업데이트
  }

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
      default:
        return "-";
    }
  }

  printRow(item) {
    return `
    <div class="listDataRow" style="border:1px solid #ddd; margin:5px; padding:10px; cursor:pointer;">
      <input type="hidden" class="idClass" value="${item.id}"/>
      <strong>[${this.printName(item.cls)}] ${item.name}</strong> 
      <span>(HP: ${item.hp} / STR: ${item.str})</span>
    </div>`;
  }

  // [입력창 초기화]
  clearInputBox() {
    $("#id").val(0);
    $("#name, #hp, #mp, #str, #int, #dex, #lux, #birthDate").val("");
    $("#cls").val("W");
    $("#sx").val("남");
  }

  // [데이터 세팅] 목록 클릭 시 입력창으로
  setData2InputBox(npc) {
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

  // [추가] insert
  addNpc() {
    if ($("#name").val() === "") return alert("이름을 입력하세요.");

    let maxId =
      this.#npcList.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    let newNpc = this.getInputData(maxId);

    this.#npcList.push(newNpc);
    this.printList();
    this.clearInputBox();
  }

  // [수정] update
  updateNpc() {
    let id = $("#id").val() * 1;
    if (id === 0) return alert("수정할 캐릭터를 목록에서 선택하세요.");

    let index = this.#npcList.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.#npcList[index] = this.getInputData(id);
      this.printList();
      alert("수정되었습니다.");
    }
  }

  // [삭제] delete
  deleteNpc() {
    let id = $("#id").val() * 1;
    if (id === 0) return alert("삭제할 캐릭터를 선택하세요.");

    if (confirm("정말 삭제하시겠습니까?")) {
      this.#npcList = this.#npcList.filter((n) => n.id !== id);
      this.printList();
      this.clearInputBox();
    }
  }

  // 입력창의 데이터를 객체로 반환하는 공통 함수
  getInputData(id) {
    return {
      id: id,
      name: $("#name").val(),
      cls: $("#cls").val(),
      sx: $("#sx").val(),
      hp: Number($("#hp").val()),
      mp: Number($("#mp").val()),
      str: Number($("#str").val()),
      int: Number($("#int").val()),
      dex: Number($("#dex").val()),
      lux: Number($("#lux").val()),
      birthDate: $("#birthDate").val(),
    };
  }

  // [공격] 물리
  attackStr(targetId) {
    const attackerId = $("#id").val() * 1;  // 현재 선택된 공격자 id 가져오기
    if (!attackerId || !targetId) return alert("공격자와 대상을 선택하세요.");
    if (attackerId === targetId) return alert("자신을 공격할 수 없습니다.");

    const attacker = this.#npcList.find((n) => n.id === attackerId);
    const target = this.#npcList.find((n) => n.id === targetId);

    target.hp = Math.max(0, target.hp - attacker.str);
    alert(
      `${attacker.name}의 공격! ${target.name}의 HP가 ${attacker.str} 감소했습니다.`
    );
    this.printList();
  }

  // [공격] 마법
  attackInt(targetId) {
    const attackerId = $("#id").val() * 1;
    const attacker = this.#npcList.find((n) => n.id === attackerId);
    const target = this.#npcList.find((n) => n.id === targetId);

    if (attacker.mp < 50) return alert("마나가 부족합니다 (필요 MP: 50)");

    target.hp = Math.max(0, target.hp - attacker.int);
    attacker.mp -= 50;
    alert(
      `${attacker.name}의 마법! ${target.name}의 HP가 ${attacker.int} 감소했습니다.`
    );
    this.printList();
  }

  updateAttackerSelect() {
    const $select = $("#attackerSelect");
    $select.empty().append('<option value="0">대상 선택</option>');
    this.#npcList.forEach((n) => {
      $select.append(`<option value="${n.id}">${n.name}</option>`);
    });
  }

  printOneNpc(e) {
    let selectId = $(e.currentTarget).find(".idClass").val() * 1;
    let findNpc = this.#npcList.find((item) => item.id === selectId);
    if (findNpc) this.setData2InputBox(findNpc);
  }
}

// 이벤트 연결
$(() => {
  let nint = new Npc();
  nint.printList();

  $("#btnAdd").click(() => nint.addNpc());
  $("#btnUpt").click(() => nint.updateNpc());
  $("#btnDel").click(() => nint.deleteNpc());

  $("#btnAtkStr").click(() => nint.attackStr($("#attackerSelect").val() * 1));
  $("#btnAtkInt").click(() => nint.attackInt($("#attackerSelect").val() * 1));

  $(document).on("click", ".listDataRow", (e) => nint.printOneNpc(e));
});
