"use strict";

{
/* ----------------------------------------------
 * Todo作成用のクラス
 * ---------------------------------------------- */
  class Todo {
    constructor(content) {
      this.content = content;
      this.id = ul.childElementCount;
      this.createTodo();
    }

    /* ----------------------------------------------
     * Todo削除用のメソッド
     * createTodoメソッド内でbuttonタグのイベントに使用
     * ---------------------------------------------- */
    deleteTodo(id) {
      const ul = document.getElementById("ul");
      const todos = ul.children;
      for (let todo of todos) {
        if (Number(todo.dataset.id) === id) {
          todo.remove();
        }
      }
    }

    /* ----------------------------------------------
     * Todo作成用のメソッド
     * インスタンス生成時にコンストラクターで実行される
     * ---------------------------------------------- */
    createTodo() {
      // テキスト用のspanタグを生成
      const span = document.createElement("span");
      span.textContent = this.content;

      // 削除用のbuttonタグを生成
      const button = document.createElement("button");
      button.textContent = "削除";
      button.addEventListener("click", () => this.deleteTodo(this.id));

      // テキストとボタンを囲むliタグを生成
      const li = document.createElement("li");
      li.dataset.id = this.id;
      li.appendChild(span);
      li.appendChild(button);

      // liタグ(Todo)をulタグに追加
      ul.appendChild(li);

      // HTMLタグ生成後にinputタグに入力されている文字をクリアする
      input.value = "";
    }
  }

  // 追加ボタンを押すとTodoクラスからインスタンスが生成される
  const input = document.getElementById("input");

  const addBtn = document.getElementById("addBtn");
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    new Todo(input.value);
  });
}
