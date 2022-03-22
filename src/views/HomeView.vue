<template>
  <div>
    <div class="container">
      <div class="header">
        <ul class="navbar">
          <router-link
            to="/MyTasks"
            class="link"
            :class="{ active: isActive }"
            @click="isActive = !isActive"
          >
            My Tasks
          </router-link>
          <router-link
            to="/InProgress"
            class="link"
            :class="{ active: isActive }"
            @click="isActive = !isActive"
          >
            In Progress
          </router-link>
          <router-link
            to="/Completed"
            class="link"
            :class="{ active: isActive }"
            @click="isActive = !isActive"
          >
            Completed
          </router-link>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      isActive: true,
    };
  }
};
</script>
<style lang="scss" scope>
.container {
  width: 1024px;
  height: 1024px;
  background-color: #e1e1e1;
  margin: 0 auto;
  .header {
    height: 76px;
    background-color: #4a90e2;
    padding: 0 182px;
    .navbar {
      display: flex;
      justify-content: space-around;
      line-height: 76px;
      .link {
        font-family: Roboto-Medium;
        font-size: 24px;
        color: #ffffff;
        text-align: center;
        text-decoration: none;
      }
    }
    .active {
      position: relative;
      &::after {
        position: absolute;
        content: "";
        width: 160px;
        height: 5px;
        bottom: 0;
        left: -25%;
        background: #00408b;
      }
    }
  }
  .add-task {
    width: 620px;
    margin: 24px auto;
    input {
      width: 595px;
      height: 65px;
      font-size: 30px;
      padding-left: 20px;
    }
  }
}
</style>
