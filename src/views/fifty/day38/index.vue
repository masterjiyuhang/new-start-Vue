<template>
  <div class="wrapper-page">
    <div class="phone">
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
        alt="about"
        class="content"
      />
      <nav class="operate">
        <ul>
          <li class="active">
            <i class="fas fa-home"></i>
            <p>Home</p>
          </li>
          <li>
            <i class="fas fa-box"></i>
            <p>Work</p>
          </li>
          <li>
            <i class="fas fa-book-open"></i>
            <p>Blog</p>
          </li>
          <li>
            <i class="fas fa-users"></i>
            <p>About Us</p>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");

.phone {
  position: relative;
  width: 375px;
  height: 750px;
  overflow: hidden;
  border: 3px solid #eee;
  border-radius: 15px;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 60px);
    transition: opacity 0.4s ease;
    object-fit: cover;
  }

  .operate {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-top: 5px;

    ul {
      display: flex;
      height: 60px;
      margin: 0;
      padding: 0;
      list-style-type: none;
      background-color: #fff;

      li {
        flex: 1;
        padding: 10px;
        color: #777;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #8e44ad;
        }

        p {
          margin: 2px 0;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
