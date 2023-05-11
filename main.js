import { Todo } from "./Todo.js";

  /* ---------------------------------------------------
   * 追加ボタンを押すとTodoクラスからインスタンスが生成される
   * --------------------------------------------------- */
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.getElementById("input");
  Todo.of(input.value);
});
