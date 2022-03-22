<template>
  <div>
    <vuedraggable v-model="taskArray" ghost-class="ghost" @update="reOrder">
      <transition-group type="transition" name="flip-list">
        <div v-for="(item, index) in taskArray" :key="item.id" :id="item.id">
          <div class="task" v-if="item.isImportant && !item.isCompleted">
            <div
              class="task-info"
              :class="{ important: item.isImportant }"
              :key="index"
            >
              <div class="type">
                <input
                  type="checkbox"
                  v-model="item.isCompleted"
                  @click="changeCompleted(item.id)"
                />
                <p :class="{ completed: item.isCompleted }">{{ item.title }}</p>
                <div class="task-feature">
                  <font-awesome-icon
                    icon="fa-solid fa-calendar-days"
                    v-if="item.date"
                  />
                  <font-awesome-icon
                    icon="fa-regular fa-file"
                    v-if="item.file"
                  />
                  <font-awesome-icon
                    icon="fa-regular fa-comment-dots"
                    v-if="item.comment"
                  />
                </div>
              </div>

              <div class="feature">
                <button
                  type="button"
                  @click="changeImportant(item.id)"
                  :class="{ important: item.isImportant }"
                  v-if="!item.isImportant"
                  :key="index"
                >
                  <font-awesome-icon icon="fa-regular fa-star" />
                </button>
                <button
                  type="button"
                  @click="changeImportant(item.id)"
                  :class="{ important: item.isImportant }"
                  v-else
                >
                  <font-awesome-icon icon="fa-solid fa-star" />
                </button>
                <button
                  type="button"
                  :class="{ important: item.isImportant }"
                  @click="
                    openEdit(item.id);
                    item.editTask = !item.editTask;
                  "
                >
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                </button>
                <button
                  type="button"
                  :class="{ important: item.isImportant }"
                  @click="deleteTask(item.id)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash-can" />
                </button>
              </div>
            </div>
          </div>
          <div class="body" v-else-if="item.editTask">
            <div class="edit">
              <div class="info-head">
                <div class="type">
                  <input type="checkbox" />
                  <p
                    :class="{ completed: item.isCompleted }"
                    @click="editTile = !editTile"
                    v-if="editTile"
                  >
                    {{ tempTaskData.title }}
                  </p>
                  <input
                    type="text"
                    class="title"
                    v-else-if="!editTile"
                    @blur="isEditTile"
                    v-model="tempTaskData.title"
                  />
                </div>
                <div class="feature">
                  <button type="button">
                    <font-awesome-icon icon="fa-regular fa-star" />
                  </button>
                  <button type="button">
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                  </button>
                </div>
              </div>
              <div class="info-body">
                <div class="data">
                  <div class="data-title">
                    <font-awesome-icon icon="fa-solid fa-calendar-days" />
                    <p>Deadline</p>
                  </div>
                  <div class="data-input">
                    <input
                      type="text"
                      placeholder="yyyy/mm/dd"
                      v-model="tempTaskData.date"
                    />
                    <input
                      type="text"
                      placeholder="hh:mm"
                      v-model="tempTaskData.time"
                    />
                  </div>
                </div>
                <div class="data">
                  <div class="data-title">
                    <font-awesome-icon icon="fa-regular fa-file" />

                    <p>File</p>
                  </div>
                  <div class="data-input">
                    <button type="button" @click="uploadFile">
                      <font-awesome-icon icon="fa-solid fa-square-plus" />
                    </button>
                  </div>
                </div>
                <div class="data">
                  <div class="data-title">
                    <font-awesome-icon icon="fa-regular fa-comment-dots" />
                    <p>Comment</p>
                  </div>
                  <div class="data-input">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      placeholder="Type your memo here..."
                      v-model="tempTaskData.comment"
                    >
                    </textarea>
                  </div>
                </div>
              </div>
              <div class="info-footer">
                <button
                  class="cancel"
                  @click="
                    cancelEdit(tempTaskData.id);
                    item.editTask = !item.editTask;
                  "
                >
                  <font-awesome-icon icon="fa-solid fa-xmark" />
                  <p>Cancel</p>
                </button>
                <button
                  class="plus"
                  @click="
                    item.editTask = !item.editTask;
                    saveEdit(index);
                  "
                >
                  <p>Finish</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </vuedraggable>
  </div>
</template>
<script>
export default {
  data() {
    return {
      taskData: {
        title: "",
        date: "",
        time: "",
        file: false,
        comment: "",
        isImportant: false,
        editTask: false,
        isCompleted: false,
        order: 0
      },
      tempTaskData: {},
      taskArray: JSON.parse(localStorage.getItem("localTaskData")) || [],
      newTodo: false,
      editTile: true,
      oldIndex: "",
      newIndex: "",
      taskLeft: 0
    };
  },
  methods: {
    reOrder(evt) {
      this.oldIndex = evt.oldIndex;
      this.newIndex = evt.newIndex;
      console.log(this.oldIndex);
      console.log(this.newIndex);

      this.taskArray.splice(
        this.newIndex,
        0,
        this.taskArray.splice(this.oldIndex, 1)[0]
      );
      console.log(this.taskArray);

      this.taskArray.forEach(function (item, index) {
        item.order = index;
      });
      localStorage.setItem("localTaskData", JSON.stringify(this.taskArray));
      console.log(this.taskArray);
      this.getTask();
    },
    uploadFile() {},
    openEdit(id) {
      this.taskArray.forEach((item, keys) => {
        if (item.id === id) {
          this.tempTaskData = item;
        }
      });
    },
    saveEdit() {
      localStorage.setItem("localTaskData", JSON.stringify(this.taskArray));
      this.getTask();
    },
    cancelEdit(id) {
      this.newTodo = false;
      this.taskData = {};
      this.taskArray.forEach((item, keys) => {
        if (item.id === id) {
          this.tempTaskData = item;
        }
      });
      this.getTask();
    },
    getTask() {
      this.taskArray = JSON.parse(localStorage.getItem("localTaskData")) || [];
      this.tempTaskData =
        JSON.parse(localStorage.getItem("localTaskData")) || [];
    },
    addTask() {
      const timestamp = Math.floor(new Date() / 1000);
      const localTaskData = {
        title: this.taskData.title,
        date: this.taskData.date,
        time: this.taskData.time,
        file: false,
        comment: this.taskData.comment,
        isImportant: false,
        id: timestamp,
        editTask: false,
        isCompleted: false,
        order: this.taskArray.length
      };
      console.log(localTaskData);
      this.taskArray.push(localTaskData);
      localStorage.setItem("localTaskData", JSON.stringify(this.taskArray));
      this.taskData = {};
      this.newTodo = false;

      this.getTask();
    },
    focusText() {
      this.newTodo = true;
    },
    isEditTile() {
      if (this.taskData.title.length > 0) {
        this.editTile = false;
      } else if (this.taskData.title == "") {
        this.editTile = true;
      }
    },
    deleteTask(id) {
      console.log(id);
      this.taskArray.forEach((item, keys) => {
        if (item.id === id) {
          this.taskArray.splice(keys, 1);
          localStorage.setItem("localTaskData", JSON.stringify(this.taskArray));
        }
      });
      this.getTask();
    },
    changeImportant(id) {
      this.taskArray.forEach((item, keys) => {
        if (item.id === id) {
          item.isImportant = !item.isImportant;
        }
      });
      localStorage.setItem("localTaskData", JSON.stringify(this.taskArray));
      this.getTask();
    },
    changeCompleted(id) {
      this.taskArray.forEach((item, keys) => {
        if (item.id === id) {
          item.isCompleted = !item.isCompleted;
        }
      });
      localStorage.setItem("localTaskData", JSON.stringify(this.taskArray));
      this.getTask();
    }
  }
};
</script>
<style lang="scss" scoped>
.body {
  display: flex;
  justify-content: center;
  .edit {
    background-color: #f2f2f2;
    margin-top: 24px;
    width: 620px;
    .info-head {
      height: 76px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      border-radius: 5px 5px 0 0;
      border-bottom: 1px solid #000;
      .type {
        display: flex;
        input {
          width: 24px;
          height: 24px;
        }
        p {
          font-family: Roboto-Medium;
          font-size: 24px;
          color: #000000;
          margin-left: 16px;
        }
        .title {
          margin-left: 16px;
          height: 24px;
          width: 320px;
        }
      }
      .feature {
        display: flex;
        button:first-child {
          margin-right: 24px;
        }
        button {
          border: none;
          cursor: pointer;
          width: 40px;
          height: 40px;
          font-size: 25px;
        }
      }
    }
    .info-body {
      height: 443px;
      padding-left: 72px;
      padding-right: 78px;
      margin-top: 26.6px;
      .data {
        .data-title {
          margin-top: 15px;
          svg {
            width: 14px;
          }
          p {
            display: inline-block;
            margin-left: 9px;
            font-size: 20px;
            font-family: Roboto-Medium;
          }
        }
        .data-input {
          margin-top: 10px;
          margin-left: 20px;

          button {
            width: 40px;
            height: 40px;
            font-size: 25px;
            border: none;
            cursor: pointer;
          }
          textarea {
            width: 445px;
            height: 120px;
          }
        }
      }
    }
    .info-footer {
      display: flex;
      .cancel {
        display: flex;
        border: none;
        cursor: pointer;

        justify-content: center;
        align-items: center;
        width: 310px;
        height: 60px;
        font-family: Roboto-Regular;
        font-size: 24px;
        color: #d0021b;
        text-align: center;
        svg {
          width: 15px;
        }
        p {
          margin-left: 10px;
        }
      }
      .plus {
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 310px;
        height: 60px;
        font-family: Roboto-Regular;
        font-size: 24px;
        color: #ffffff;
        text-align: center;
        background: #4a90e2;
        svg {
          color: #ffffff;

          width: 15px;
        }
        p {
          margin-left: 10px;
        }
      }
    }
  }
}
.task {
  display: flex;
  flex-direction: column;

  .task-info {
    background-color: #f2f2f2;
    margin-top: 24px;
    width: 556px;
    height: 76px;
    margin-left: 202px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px 32px 32px;
    border-radius: 5px 5px 0 0;
    position: relative;

    .type {
      display: flex;
      align-items: center;
      input {
        width: 24px;
        height: 24px;
      }
      p {
        font-family: Roboto-Medium;
        font-size: 24px;
        color: #000000;
        margin-left: 16px;
      }
      p.completed {
        text-decoration: line-through;
      }
      .title {
        margin-left: 16px;
        height: 24px;
        width: 320px;
      }
      .task-feature {
        position: absolute;
        content: "";
        width: 90px;
        height: 20px;
        bottom: 25px;
        left: 65px;
        svg {
          margin-left: 15px;
          width: 15px;
        }
      }
    }
    .feature {
      display: flex;
      button:first-child,
      button:nth-child(2) {
        margin-right: 24px;
      }
      button {
        width: 40px;
        height: 40px;
        font-size: 25px;
        border: none;
        cursor: pointer;
      }
    }
  }
  .important {
    background-color: #fff2dc;
    .fa-star {
      color: #f5a623;
    }
  }
}
.reEdit {
  .info-body {
    height: 443px;
    padding-left: 72px;
    padding-right: 78px;
    margin-top: 26.6px;
    .data {
      .data-title {
        margin-top: 15px;
        svg {
          width: 14px;
        }
        p {
          display: inline-block;
          margin-left: 9px;
          font-size: 20px;
          font-family: Roboto-Medium;
        }
      }
      .data-input {
        margin-top: 10px;
        margin-left: 20px;

        button {
          width: 40px;
          height: 40px;
          font-size: 25px;
          border: none;
          cursor: pointer;
        }
        textarea {
          width: 445px;
          height: 120px;
        }
      }
    }
  }
  .info-head {
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid #000;
    .type {
      display: flex;
      input {
        width: 24px;
        height: 24px;
      }
      p {
        font-family: Roboto-Medium;
        font-size: 24px;
        color: #000000;
        margin-left: 16px;
      }
      .title {
        margin-left: 16px;
        height: 24px;
        width: 320px;
      }
    }
    .feature {
      display: flex;
      button:first-child {
        margin-right: 24px;
      }
      button {
        border: none;
        cursor: pointer;
        width: 40px;
        height: 40px;
        font-size: 25px;
      }
    }
  }
  .info-body {
    height: 443px;
    padding-left: 72px;
    padding-right: 78px;
    margin-top: 26.6px;
    .data {
      .data-title {
        margin-top: 15px;
        svg {
          width: 14px;
        }
        p {
          display: inline-block;
          margin-left: 9px;
          font-size: 20px;
          font-family: Roboto-Medium;
        }
      }
      .data-input {
        margin-top: 10px;
        margin-left: 20px;

        button {
          width: 40px;
          height: 40px;
          font-size: 25px;
          border: none;
          cursor: pointer;
        }
        textarea {
          width: 445px;
          height: 120px;
        }
      }
    }
  }
}
</style>
