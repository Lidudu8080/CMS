<template>
  <div class="navbar">
    <Hamburg class="hamburger-container" />
    <bread-crumb 
    
    
    class="breadcrumb-container"></bread-crumb>

    <!-- <el-dropdown class="right-menu">
      <span class="el-dropdown-link">
        下拉菜单
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="right-menu-item">
        <el-dropdown-item>登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
  </div>
</template>
<script>
import Hamburg from "../Hamburg";
import BreadCrumb from "../BreadCrumb";

export default {
  name: "navbar",
  components: {
    Hamburg,
    BreadCrumb,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  left: 210px;
  display: flex;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  &.login-module {
    background: #fff;
    padding: 0 32px;
    box-shadow: 0px 2px 6px 0px rgba(39, 38, 31, 0.2);
    .right-menu {
      padding-right: 0;
      .right-menu-item {
        color: #333;
        .user-name {
          font-size: 18px;
          font-weight: 600;
        }
        .el-icon--right {
          font-size: 18px;
        }
      }
    }
  }

  .hamburger-container {
    height: 100%;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    align-items: center;
    margin-right: 10px;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    .logo {
      width: 40px;
      height: 40px;
    }
    .system-name {
      padding-left: 12px;
      color: #333;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .breadcrumb-container {
    flex: 1;
    align-self: center;
  }

  .right-menu {
    align-self: center;
    display: flex;
    align-items: center;
    padding-right: 16px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 16px;
      color: #303133;
      vertical-align: text-bottom;
      &:last-child {
        padding-right: 0;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        white-space: nowrap;

        .user-name {
          cursor: pointer;
          display: inline-block;
        }
        .el-icon--right {
          font-size: 16px;
          -webkit-transition: -webkit-transform 0.3s;
          transition: -webkit-transform 0.3s;
          transition: transform 0.3s;
          transition: transform 0.3s, -webkit-transform 0.3s;
          margin-left: 8px;
          margin-right: 0 !important;
          &.open {
            transform: rotateZ(180deg);
          }
        }

        .sa-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
