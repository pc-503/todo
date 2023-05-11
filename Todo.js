/* ----------------------------------------------
 * Todo作成用のクラス
 * ---------------------------------------------- */
export class Todo {
  constructor(content, id) {
    this.content = content;
    this.id = id;
    this.createTodo();
  }

  /* ----------------------------------------------
   * Todo削除用のメソッド
   * createTodoメソッド内でbuttonタグのイベントに使用
   * ---------------------------------------------- */
  deleteTodo(id) {
    const target = this.getTarget(id);
    target.remove();
  }

  /* ----------------------------------------------
   * Todo編集開始用のメソッド
   * createTodoメソッド内でbuttonタグのイベントに使用
   * ---------------------------------------------- */
  editStart(id) {
    const target = this.getTarget(id);

    // 既に開始ボタンが押されてたら何もしない
    if (target.querySelector("div")) {
      return;
    }

    // 編集用のinputタグを生成
    const editInput = document.createElement("input");

    // 完了用のbuttonタグを生成
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "完了";
    completeBtn.addEventListener("click", () =>
      this.editComplete(this.id, editInput.value)
    );

    const div = document.createElement("div");

    div.appendChild(editInput);
    div.appendChild(completeBtn);
    target.appendChild(div);
  }
  /* ----------------------------------------------
   * Todo編集完了用のメソッド
   * createTodoメソッド内でbuttonタグのイベントに使用
   * ---------------------------------------------- */
  editComplete(id, content) {
    const target = this.getTarget(id);

    // テキストが入力されていなかったら何もしない
    if (content === "") return;

    // 新しく入力したテキストをspanタグへ挿入
    const span = target.querySelector("span");
    span.textContent = content;

    // 編集用のinputタグとbuttonタグを囲っているdivタグごと削除
    const div = target.querySelector("div");
    div.remove();
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
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.addEventListener("click", () => this.deleteTodo(this.id));

    // 編集用のbuttonタグを生成
    const editBtn = document.createElement("button");
    editBtn.textContent = "編集";
    editBtn.addEventListener("click", () => this.editStart(this.id));

    // テキストとボタンを囲むliタグを生成
    const li = document.createElement("li");
    li.dataset.id = this.id;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    // liタグ(Todo)をulタグに追加
    ul.appendChild(li);

    // HTMLタグ生成後にinputタグに入力されている文字をクリアする
    const input = document.getElementById("input");
    input.value = "";
  }
  /* ----------------------------------------------
   * インスタンス生成用のファクトリーメソッド
   * ---------------------------------------------- */
  static of(content) {
    // テキストが入力されていなかったら何もしない
    if (content === "") {
      return;
    }

    // 現在のTodo(liタグ)の数をidとして使用
    const ul = document.getElementById("ul");
    const id = ul.childElementCount;

    // 既存のIDを配列として取得
    const dataId = [];
    for (let data of ul.children) {
      dataId.push(Number(data.dataset.id));
    }

    // idがdataIdに存在していたら、dataId内の最大値をインクリメントしてidとして使用
    if (dataId.includes(id)) {
      const nextId = Math.max(...dataId) + 1;
      new Todo(content, nextId);
    } else {
      new Todo(content, id);
    }
  }

  /* ----------------------------------------------
   * ulタグ内のliタグ取得用のメソッド
   * ---------------------------------------------- */
  getTarget(id) {
    const ul = document.getElementById("ul");
    const todos = ul.children;
    for (let todo of todos) {
      if (Number(todo.dataset.id) === id) {
        return todo;
      }
    }
  }
}
